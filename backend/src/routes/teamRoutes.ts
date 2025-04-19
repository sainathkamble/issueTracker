import express from 'express';
import { body } from 'express-validator';
import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
} from '../controllers/teamController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Validation middleware
const teamValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('leader').notEmpty().withMessage('Team leader is required'),
  body('members').isArray().withMessage('Members must be an array'),
];

const updateTeamValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('leader').optional().notEmpty().withMessage('Team leader cannot be empty'),
  body('members').optional().isArray().withMessage('Members must be an array'),
];

const memberValidation = [
  body('userId').notEmpty().withMessage('User ID is required'),
];

// All routes require authentication
router.use(auth);

// Team routes
router.post('/', teamValidation, createTeam);
router.get('/', getTeams);
router.get('/:id', getTeam);
router.put('/:id', updateTeamValidation, updateTeam);
router.delete('/:id', deleteTeam);

// Team member routes
router.post('/:id/members', memberValidation, addMember);
router.delete('/:id/members', memberValidation, removeMember);

export default router; 