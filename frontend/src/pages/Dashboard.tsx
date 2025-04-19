import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <BugReportIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Issues</Typography>
              </Box>
              <Typography variant="h4">24</Typography>
              <Typography color="textSecondary">4 new this week</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FolderIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Active Projects</Typography>
              </Box>
              <Typography variant="h4">8</Typography>
              <Typography color="textSecondary">2 completed this month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GroupIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Team Members</Typography>
              </Box>
              <Typography variant="h4">12</Typography>
              <Typography color="textSecondary">3 new this quarter</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Resolution Rate</Typography>
              </Box>
              <Typography variant="h4">85%</Typography>
              <Typography color="textSecondary">+5% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Issues */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <CardHeader title="Recent Issues" />
            <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
              No recent issues to display.
            </Typography>
          </Paper>
        </Grid>

        {/* Project Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <CardHeader title="Project Status" />
            <Typography variant="body1" color="textSecondary" sx={{ p: 2 }}>
              No active projects to display.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 