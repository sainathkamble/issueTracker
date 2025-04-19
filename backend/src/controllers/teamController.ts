import { Request, Response } from 'express';
import { Team } from '../models/Team';
import { User } from '../models/User';

export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, leader, members } = req.body;

    // Check if leader exists
    const leaderUser = await User.findById(leader);
    if (!leaderUser) {
      return res.status(404).json({ message: 'Team leader not found' });
    }

    // Create new team
    const team = new Team({
      name,
      description,
      leader,
      members: [leader, ...members],
    });

    await team.save();

    // Update users' teams
    await User.updateMany(
      { _id: { $in: team.members } },
      { $push: { teams: team._id } }
    );

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team' });
  }
};

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'firstName lastName')
      .populate('members', 'firstName lastName')
      .populate('projects', 'name status')
      .sort({ createdAt: -1 });

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams' });
  }
};

export const getTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'firstName lastName email')
      .populate('members', 'firstName lastName email')
      .populate('projects', 'name status progress');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team' });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { name, description, leader, members } = req.body;

    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Update fields
    if (name) team.name = name;
    if (description) team.description = description;
    if (leader) team.leader = leader;
    if (members) {
      // Remove team from old members' teams array
      await User.updateMany(
        { _id: { $in: team.members } },
        { $pull: { teams: team._id } }
      );

      // Update team members
      team.members = [leader || team.leader, ...members];

      // Add team to new members' teams array
      await User.updateMany(
        { _id: { $in: team.members } },
        { $addToSet: { teams: team._id } }
      );
    }

    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error updating team' });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Remove team from all members' teams array
    await User.updateMany(
      { _id: { $in: team.members } },
      { $pull: { teams: team._id } }
    );

    await team.remove();
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team' });
  }
};

export const addMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add member to team
    await team.addMember(userId);

    // Add team to user's teams
    user.teams.push(team._id);
    await user.save();

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error adding team member' });
  }
};

export const removeMember = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is team leader
    if (team.leader.toString() === userId) {
      return res.status(400).json({ message: 'Cannot remove team leader' });
    }

    // Remove member from team
    await team.removeMember(userId);

    // Remove team from user's teams
    user.teams = user.teams.filter(
      (teamId: any) => teamId.toString() !== team._id.toString()
    );
    await user.save();

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error removing team member' });
  }
}; 