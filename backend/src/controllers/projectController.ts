import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { Team } from '../models/Team';

export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      team: teamId,
      startDate,
      endDate,
    } = req.body;

    // Check if team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Create new project
    const project = new Project({
      name,
      description,
      team: teamId,
      startDate,
      endDate,
    });

    await project.save();

    // Add project to team
    team.projects.push(project._id);
    await team.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { status, team } = req.query;
    const filter: any = {};

    if (status) filter.status = status;
    if (team) filter.team = team;

    const projects = await Project.find(filter)
      .populate('team', 'name')
      .populate('issues', 'title status priority')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('team', 'name members')
      .populate('issues', 'title status priority assignee');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      status,
      team,
      startDate,
      endDate,
    } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update fields
    if (name) project.name = name;
    if (description) project.description = description;
    if (status) project.status = status;
    if (team) project.team = team;
    if (startDate) project.startDate = startDate;
    if (endDate) project.endDate = endDate;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove project from team
    const team = await Team.findById(project.team);
    if (team) {
      team.projects = team.projects.filter(
        (id: any) => id.toString() !== project._id.toString()
      );
      await team.save();
    }

    await project.remove();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project' });
  }
};

export const getProjectStats = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('issues', 'status priority');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const stats = {
      totalIssues: project.issues.length,
      openIssues: project.issues.filter((issue: any) => issue.status === 'open').length,
      inProgressIssues: project.issues.filter((issue: any) => issue.status === 'in_progress').length,
      resolvedIssues: project.issues.filter((issue: any) => issue.status === 'resolved').length,
      highPriorityIssues: project.issues.filter((issue: any) => issue.priority === 'high').length,
      progress: project.progress,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project stats' });
  }
}; 