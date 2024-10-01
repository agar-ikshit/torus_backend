const Task = require('../models/Task');
const { Parser } = require('json2csv');

exports.generateReport = async (req, res) => {
  // Retrieve task IDs from query parameters
  const taskIds = req.query.ids ? req.query.ids.split(',') : [];

  try {
    const query = {};

    // Check if task IDs are provided
    if (taskIds.length > 0) {
      query._id = { $in: taskIds }; // Find tasks with these IDs
    }

    const tasks = await Task.find(query).populate('assignedUser', 'email');

    // Check if any tasks were found
    if (tasks.length === 0) {
      return res.status(404).json({ msg: 'No tasks found for the provided IDs' });
    }

    // Format the tasks for a summary report
    const tasksData = tasks.map(task => ({
      title: task.title,
      status: task.status,
      assignedUser: task.assignedUser ? task.assignedUser.email : 'Not assigned',
      dueDate: task.dueDate,
      createdBy: task.createdBy, // Assuming you want to include the creator as well
    }));

    // Convert to CSV if needed
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(tasksData);

    // Return as JSON or CSV based on query parameter
    if (req.query.format === 'csv') {
      res.header('Content-Type', 'text/csv');
      res.attachment('task_summary_report.csv');
      return res.send(csv);
    }

    res.json(tasksData);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
