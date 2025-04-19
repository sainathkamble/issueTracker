import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import Projects from './pages/Projects';
import Teams from './pages/Teams';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 