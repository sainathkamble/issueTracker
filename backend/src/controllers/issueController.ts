import { Request, Response } from 'express';
import { Issue } from '../models/Issue';
import { Project } from '../models/Project';

export const createIssue = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      priority,
      project: projectId,
      assignee,
      labels,
    } = req.body;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Create new issue
    const issue = new Issue({
      title,
      description,
      priority,
      project: projectId,
      assignee,
      reporter: req.user._id,
      labels,
    });

    await issue.save();

    // Add issue to project
    project.issues.push(issue._id);
    await project.save();

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Error creating issue' });
  }
};

export const getIssues = async (req: Request, res: Response) => {
  try {
    const { project, status, priority, assignee } = req.query;
    const filter: any = {};

    if (project) filter.project = project;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;

    const issues = await Issue.find(filter)
      .populate('project', 'name')
      .populate('assignee', 'firstName lastName')
      .populate('reporter', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues' });
  }
};

export const getIssue = async (req: Request, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignee', 'firstName lastName')
      .populate('reporter', 'firstName lastName')
      .populate('comments.user', 'firstName lastName');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issue' });
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      assignee,
      labels,
    } = req.body;

    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Update fields
    if (title) issue.title = title;
    if (description) issue.description = description;
    if (status) issue.status = status;
    if (priority) issue.priority = priority;
    if (assignee) issue.assignee = assignee;
    if (labels) issue.labels = labels;

    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Error updating issue' });
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Remove issue from project
    const project = await Project.findById(issue.project);
    if (project) {
      project.issues = project.issues.filter(
        (id: any) => id.toString() !== issue._id.toString()
      );
      await project.save();
    }

    await issue.remove();
    res.json({ message: 'Issue deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue' });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.comments.push({
      user: req.user._id,
      content,
      createdAt: new Date(),
    });

    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
}; 