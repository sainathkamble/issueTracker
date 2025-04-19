import express from 'express';
import { body, query } from 'express-validator';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectStats,
} from '../controllers/projectController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Validation middleware
const projectValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('team').notEmpty().withMessage('Team is required'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
];

const updateProjectValidation = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('status').optional().isIn(['active', 'completed', 'on_hold']).withMessage('Invalid status'),
  body('team').optional().notEmpty().withMessage('Team cannot be empty'),
  body('startDate').optional().isISO8601().withMessage('Invalid start date'),
  body('endDate').optional().isISO8601().withMessage('Invalid end date'),
];

// All routes require authentication
router.use(auth);

// Project routes
router.post('/', projectValidation, createProject);
router.get('/', getProjects);
router.get('/:id', getProject);
router.get('/:id/stats', getProjectStats);
router.put('/:id', updateProjectValidation, updateProject);
router.delete('/:id', deleteProject);

export default router; 