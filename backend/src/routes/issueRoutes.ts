import express from 'express';
import { body, query } from 'express-validator';
import {
  createIssue,
  getIssues,
  getIssue,
  updateIssue,
  deleteIssue,
  addComment,
} from '../controllers/issueController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Validation middleware
const issueValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('project').notEmpty().withMessage('Project is required'),
  body('assignee').notEmpty().withMessage('Assignee is required'),
  body('labels').optional().isArray().withMessage('Labels must be an array'),
];

const updateIssueValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
  body('status').optional().isIn(['open', 'in_progress', 'resolved']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('assignee').optional().notEmpty().withMessage('Assignee cannot be empty'),
  body('labels').optional().isArray().withMessage('Labels must be an array'),
];

const commentValidation = [
  body('content').notEmpty().withMessage('Comment content is required'),
];

// All routes require authentication
router.use(auth);

// Issue routes
router.post('/', issueValidation, createIssue);
router.get('/', getIssues);
router.get('/:id', getIssue);
router.put('/:id', updateIssueValidation, updateIssue);
router.delete('/:id', deleteIssue);

// Comment routes
router.post('/:id/comments', commentValidation, addComment);

export default router; 