import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  LinearProgress,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';

interface Project {
  id: number;
  name: string;
  description: string;
  progress: number;
  status: 'active' | 'completed' | 'on_hold';
  teamSize: number;
  dueDate: string;
}

const Projects = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'on_hold':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Example Project Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FolderIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Project Name
                </Typography>
              </Box>
              <Typography color="textSecondary" gutterBottom>
                Project description goes here. This is a brief overview of what the project is about.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Progress
                </Typography>
                <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  75% Complete
                </Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label="Active"
                  color="success"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="textSecondary" component="span">
                  Team Size: 5
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">View Details</Button>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ textAlign: 'center', mt: 4 }}
      >
        Create a new project to get started.
      </Typography>
    </Container>
  );
};

export default Projects; 