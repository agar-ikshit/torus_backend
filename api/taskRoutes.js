import express from 'express';
import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/authMiddleware';
import Task from '../models/Task';
import User from '../models/User';

const router = Router();

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').notEmpty(),
      check('dueDate', 'Due Date is required').notEmpty(),
    ],
  ],
  async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, dueDate, status, assignedUser, priority } = req.body;
      const user = await User.findOne({ username: assignedUser });
      const userId = user._id;

      // Create new task
      const task = new Task({ 
        title,
        description,
        dueDate,
        status,
        assignedUser: userId,
        priority,
        createdBy: req.user._id,
      });
      console.log("user creating task: " , req.user._id);

      await task.save();
      res.json(task);
    } catch (err) {
      console.error('Error creating task:', err.message);
      res.status(500).send('Server error');
    }
  }
);



router.get('/user', auth, async (req, res) => {
  const { email } = req.query; // Expecting the email to be sent as a query parameter

  if (!email) {
    return res.status(400).json({ msg: 'Email is required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    let tasks;

    if (user.isAdmin) {
      // If the user is an admin, fetch all tasks assigned to them and created by them
      tasks = await Task.find({
        $or: [
          { assignedUser: user._id },   
          { createdBy: user._id }        
        ]
      })
      .populate('assignedUser', 'email')  
      .populate('createdBy', 'email');     
    } else {
      // If the user is not an admin, only fetch tasks created by them
      tasks = await Task.find({ createdBy: user._id })
        .populate('assignedUser', 'email')
        .populate('createdBy', 'email');
    }

    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks by user email:', err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, dueDate, status, assignedUser, priority } = req.body;
  let assignedUserId = null;
  if (assignedUser) {
    const user = await User.findOne({ username: assignedUser }); // Change this based on how you want to search (e.g., by email)
    if (!user) {
      return res.status(404).json({ msg: 'Assigned user not found' });
    }
    assignedUserId = user._id; // Get the ObjectId
  }

  const taskFields = { title, description, dueDate, status, assignedUser, priority };
  if (assignedUserId) {
    taskFields.assignedUser = assignedUserId; // Only add if assignedUser was found
  }
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check user authorization
    if (task.createdBy.toString() !== req.user._id && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update the task
    task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });
    
    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err.message);
    res.status(500).send('Server error');
  }
});



// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.createdBy.toString() !== req.user._id && !req.user.isAdmin) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error('Error deleting task:', err.message);
    res.status(500).send('Server error');
  }
});

  
router.get('/', auth, async (req, res) => {
  const { page = 1, limit = 10, status, priority, assignedUser } = req.query;

  // Build query object
  let query = {
    $or: [{ assignedUser: req.user._id }, { createdBy: req.user._id }],
  };

  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedUser) query.assignedUser = assignedUser;

  try {
    const tasks = await Task.find(query)
      .populate('assignedUser', 'name email')
      .sort({ dueDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Task.countDocuments(query);

    res.json({
      tasks,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('Error fetching tasks:', err.message);
    res.status(500).send('Server error');
  }
});


export default router;
