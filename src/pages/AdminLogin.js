import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Fade,
  Zoom,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96c93d)',
    backgroundSize: '400% 400%',
    animation: `${gradientAnimation} 15s ease infinite`,
    opacity: 0.1,
    zIndex: -1,
  },
}));

const AnimatedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(211, 47, 47, 0.15)',
    },
    '&.Mui-focused': {
      boxShadow: '0 8px 25px rgba(211, 47, 47, 0.2)',
      transform: 'translateY(-2px)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(211, 47, 47, 0.2)',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 30px rgba(211, 47, 47, 0.3)',
  },
  '&:disabled': {
    background: 'rgba(211, 47, 47, 0.5)',
    transform: 'none',
    boxShadow: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px',
    fontSize: '1rem',
  },
}));

const API_URL = 'https://nidalb.onrender.com';

const AdminLogin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      toast.success('Login successful!', {
        style: {
          background: '#4caf50',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
          fontFamily: 'Poppins, sans-serif',
        },
      });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Login failed', {
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(244, 67, 54, 0.2)',
          fontFamily: 'Poppins, sans-serif',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: isMobile ? 2 : 3,
        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
      }}
    >
      <Fade in timeout={1000}>
        <StyledPaper elevation={3}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #d32f2f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                mb: 4,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 100,
                  height: 4,
                  background: 'linear-gradient(90deg, transparent 0%, #1a1a1a 50%, transparent 100%)',
                  borderRadius: 2,
                },
              }}
            >
              Admin Login
            </Typography>

            {error && (
              <Fade in timeout={500}>
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </Fade>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Zoom in timeout={800}>
                <AnimatedTextField
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Zoom>

              <Zoom in timeout={1000}>
                <AnimatedTextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Zoom>

              <Zoom in timeout={1200}>
                <AnimatedButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? 'Logging in...' : 'Login'}
                </AnimatedButton>
              </Zoom>
            </Box>
          </Box>
        </StyledPaper>
      </Fade>
    </Box>
  );
};

export default AdminLogin; 