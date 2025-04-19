import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ISSUE TRACKER
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button
              component={RouterLink}
              to="/issues"
              color="inherit"
              startIcon={<BugReportIcon />}
            >
              Issues
            </Button>
            <Button
              component={RouterLink}
              to="/projects"
              color="inherit"
              startIcon={<FolderIcon />}
            >
              Projects
            </Button>
            <Button
              component={RouterLink}
              to="/teams"
              color="inherit"
              startIcon={<GroupIcon />}
            >
              Teams
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 