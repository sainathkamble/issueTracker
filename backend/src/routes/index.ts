import express from 'express';
import userRoutes from './userRoutes';
import issueRoutes from './issueRoutes';
import projectRoutes from './projectRoutes';
import teamRoutes from './teamRoutes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/issues', issueRoutes);
router.use('/projects', projectRoutes);
router.use('/teams', teamRoutes);

export default router; 