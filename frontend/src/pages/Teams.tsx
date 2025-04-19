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
  Avatar,
  AvatarGroup,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
  projectCount: number;
  activeIssues: number;
}

const Teams = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Teams
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create New Team
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Example Team Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="div">
                  Development Team
                </Typography>
              </Box>
              <Typography color="textSecondary" gutterBottom>
                Core development team responsible for implementing new features and maintaining the codebase.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Team Members
                </Typography>
                <AvatarGroup max={4} sx={{ mb: 2 }}>
                  <Avatar alt="John Doe" src="/static/images/avatar/1.jpg" />
                  <Avatar alt="Jane Smith" src="/static/images/avatar/2.jpg" />
                  <Avatar alt="Mike Johnson" src="/static/images/avatar/3.jpg" />
                  <Avatar alt="Sarah Wilson" src="/static/images/avatar/4.jpg" />
                </AvatarGroup>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label="5 Projects"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label="12 Active Issues"
                  size="small"
                  color="warning"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">View Details</Button>
              <Button size="small">Edit Team</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ textAlign: 'center', mt: 4 }}
      >
        Create a new team to get started.
      </Typography>
    </Container>
  );
};

export default Teams; 