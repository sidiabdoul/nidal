import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ManifestationForm from './components/ManifestationForm';
import Statistics from './components/Statistics';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { Container, Box, ToggleButtonGroup, ToggleButton, styled, Typography, Paper } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { keyframes } from '@mui/material/styles';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Votes from './pages/Votes';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100px',
  height: '100px',
  background: 'rgba(211, 47, 47, 0.1)',
  borderRadius: '50%',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(211, 47, 47, 0.2)',
  animation: `${float} 6s ease-in-out infinite`,
  pointerEvents: 'none',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    background: 'rgba(211, 47, 47, 0.2)',
    borderRadius: '50%',
    animation: `${pulse} 4s ease-in-out infinite`,
  },
}));

const FloatingStar = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '20px',
  height: '20px',
  background: 'rgba(255, 255, 255, 0.8)',
  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
  animation: `${pulse} 3s ease-in-out infinite`,
  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  pointerEvents: 'none',
  zIndex: 0,
}));

const FloatingCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: 'rgba(211, 47, 47, 0.15)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(211, 47, 47, 0.3)',
  animation: `${float} 8s ease-in-out infinite`,
  pointerEvents: 'none',
  zIndex: 0,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    background: 'rgba(211, 47, 47, 0.2)',
    borderRadius: '50%',
    animation: `${pulse} 5s ease-in-out infinite`,
  },
}));

const FloatingSquare = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '30px',
  height: '30px',
  background: 'rgba(26, 35, 126, 0.15)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(26, 35, 126, 0.3)',
  transform: 'rotate(45deg)',
  animation: `${rotate} 20s linear infinite`,
  pointerEvents: 'none',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    background: 'rgba(26, 35, 126, 0.2)',
    borderRadius: '50%',
  },
}));

const FloatingHeart = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '25px',
  height: '25px',
  background: 'rgba(211, 47, 47, 0.2)',
  transform: 'rotate(45deg)',
  animation: `${float} 7s ease-in-out infinite`,
  pointerEvents: 'none',
  zIndex: 0,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    width: '25px',
    height: '25px',
    background: 'rgba(211, 47, 47, 0.2)',
    borderRadius: '50%',
  },
  '&::before': {
    top: '-12.5px',
    left: 0,
  },
  '&::after': {
    top: 0,
    left: '-12.5px',
  },
}));

const FloatingText = styled(Typography)(({ theme }) => ({
  position: 'fixed',
  bottom: '140px',
  right: '20px',
  zIndex: 1000,
  textAlign: 'center',
  width: '200px',
  animation: `${float} 6s ease-in-out infinite`,
  animationDelay: '0.5s',
  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    bottom: '120px',
    right: '10px',
  },
}));

const StyledBanner = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'rgba(211, 47, 47, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: 24,
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.9) 0%, rgba(183, 28, 28, 0.9) 100%)',
    zIndex: 0,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    right: '-50%',
    bottom: '-50%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)',
    animation: `${pulse} 10s infinite`,
    zIndex: 0,
  },
}));

// Language toggle button styling
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  right: 20,
  zIndex: 1000,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(8px)',
  borderRadius: 30,
  padding: 2,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: 25,
    padding: '8px 20px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&.Mui-selected': {
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      color: '#fff',
      boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(211, 47, 47, 0.4)',
      },
    },
    '&:hover': {
      background: 'rgba(211, 47, 47, 0.04)',
    },
  },
}));

const FloatingIllustration = styled('img')(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '200px',
  height: 'auto',
  zIndex: 1000,
  animation: `${float} 6s ease-in-out infinite`,
  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    bottom: '10px',
    right: '10px',
  },
}));

// Custom theme with advanced styling
const getTheme = (language) => createTheme({
  direction: language === 'ar' ? 'rtl' : 'ltr',
  palette: {
    mode: 'light',
    primary: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#b71c1c',
    },
    secondary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
  },
  typography: {
    fontFamily: language === 'ar' 
      ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
      : '"Montserrat", "Roboto", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: language === 'ar' ? '0' : '-0.02em',
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: language === 'ar' ? '0' : '-0.01em',
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: language === 'ar' ? '0' : '-0.01em',
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
      lineHeight: language === 'ar' ? 1.5 : 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: language === 'ar' ? '2.4rem' : '2.125rem',
      letterSpacing: language === 'ar' ? '0' : '-0.01em',
      lineHeight: language === 'ar' ? 1.5 : 1.3,
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: language === 'ar' ? '0' : '-0.01em',
      lineHeight: language === 'ar' ? 1.6 : 1.2,
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: language === 'ar' ? '0' : '0',
      lineHeight: language === 'ar' ? 1.6 : 1.2,
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
    },
    body1: {
      fontWeight: 400,
      letterSpacing: language === 'ar' ? '0' : '0.00938em',
      lineHeight: language === 'ar' ? 1.8 : 1.5,
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
    },
    button: {
      fontWeight: 600,
      letterSpacing: language === 'ar' ? '0' : '0.02em',
      fontFamily: language === 'ar' 
        ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
        : '"Montserrat", "Roboto", sans-serif',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(211, 47, 47, 0.3)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, #ef5350 0%, #c62828 100%)`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: 'none',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 20px rgba(211, 47, 47, 0.15)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 20px rgba(211, 47, 47, 0.15)',
            },
          },
        },
      },
    },
  },
});

function AppContent() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const theme = getTheme(selectedLanguage);

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      setSelectedLanguage(newLanguage);
    }
  };

  const mainContent = (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.05) 0%, rgba(211, 47, 47, 0.1) 100%)',
        backgroundImage: `
          radial-gradient(at 100% 0%, rgba(211, 47, 47, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(26, 35, 126, 0.1) 0px, transparent 50%)
        `,
        py: 6,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d32f2f" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Floating Elements */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 0 }}>
        <FloatingElement sx={{ top: '10%', left: '5%', animationDelay: '0s' }} />
        <FloatingElement sx={{ top: '20%', right: '10%', animationDelay: '1s' }} />
        <FloatingElement sx={{ bottom: '30%', left: '15%', animationDelay: '2s' }} />
        <FloatingElement sx={{ bottom: '20%', right: '15%', animationDelay: '3s' }} />
        <FloatingElement sx={{ top: '50%', left: '50%', animationDelay: '4s' }} />
        
        <FloatingStar sx={{ top: '15%', left: '20%', animationDelay: '0.5s' }} />
        <FloatingStar sx={{ top: '25%', right: '15%', animationDelay: '1.5s' }} />
        <FloatingStar sx={{ bottom: '35%', left: '25%', animationDelay: '2.5s' }} />
        <FloatingStar sx={{ bottom: '25%', right: '25%', animationDelay: '3.5s' }} />
        <FloatingStar sx={{ top: '60%', left: '60%', animationDelay: '4.5s' }} />
        
        <FloatingCircle sx={{ top: '5%', left: '30%', animationDelay: '0.7s' }} />
        <FloatingCircle sx={{ top: '35%', right: '5%', animationDelay: '1.7s' }} />
        <FloatingCircle sx={{ bottom: '40%', left: '10%', animationDelay: '2.7s' }} />
        <FloatingCircle sx={{ bottom: '10%', right: '30%', animationDelay: '3.7s' }} />
        
        <FloatingSquare sx={{ top: '40%', left: '40%', animationDelay: '0.3s' }} />
        <FloatingSquare sx={{ top: '10%', right: '40%', animationDelay: '1.3s' }} />
        <FloatingSquare sx={{ bottom: '45%', left: '45%', animationDelay: '2.3s' }} />
        <FloatingSquare sx={{ bottom: '15%', right: '45%', animationDelay: '3.3s' }} />
        
        <FloatingHeart sx={{ top: '30%', left: '25%', animationDelay: '0.9s' }} />
        <FloatingHeart sx={{ top: '45%', right: '20%', animationDelay: '1.9s' }} />
        <FloatingHeart sx={{ bottom: '50%', left: '35%', animationDelay: '2.9s' }} />
        <FloatingHeart sx={{ bottom: '30%', right: '35%', animationDelay: '3.9s' }} />
      </Box>

      <StyledToggleButtonGroup
        value={selectedLanguage}
        exclusive
        onChange={handleLanguageChange}
        aria-label="language"
      >
        <ToggleButton value="fr" aria-label="french">
          FR
        </ToggleButton>
        <ToggleButton value="ar" aria-label="arabic">
          ع
        </ToggleButton>
      </StyledToggleButtonGroup>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            animation: 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            '@keyframes fadeIn': {
              '0%': {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              '100%': {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          <StyledBanner>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#fff',
                  fontWeight: 800,
                  textAlign: 'center',
                  mb: 2,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  fontFamily: selectedLanguage === 'ar' 
                    ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
                    : '"Montserrat", "Roboto", sans-serif',
                  fontSize: selectedLanguage === 'ar' ? '2.8rem' : '3rem',
                  lineHeight: selectedLanguage === 'ar' ? 1.5 : 1.2,
                }}
              >
                {selectedLanguage === 'ar' ? 'طلاب المعهد العالي للرقمنة' : 'Étudiants SUPNUM'}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  textAlign: 'center',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: selectedLanguage === 'ar' ? 1.8 : 1.6,
                  fontFamily: selectedLanguage === 'ar' 
                    ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
                    : '"Montserrat", "Roboto", sans-serif',
                  fontSize: selectedLanguage === 'ar' ? '1.5rem' : '1.5rem',
                }}
              >
                {selectedLanguage === 'ar' 
                  ? 'نحن طلاب المعهد العالي للرقمنة، وهذه هي أصواتنا وأفكارنا. معاً نقف متحدين للتعبير عن مشاعرنا ومطالبنا.'
                  : 'Nous, étudiants de SUPNUM, exprimons ici nos sentiments et nos revendications. Ensemble, nous faisons entendre notre voix.'}
              </Typography>
            </Box>
          </StyledBanner>

          <Statistics language={selectedLanguage} />
          <ManifestationForm language={selectedLanguage} />
        </Box>
      </Container>

      <FloatingIllustration 
        src="/m (2).png" 
        alt="Manifestation Illustration"
        sx={{
          transform: selectedLanguage === 'ar' ? 'scaleX(-1)' : 'none',
        }}
      />
      <FloatingText
        variant="h6"
        sx={{
          color: 'primary.main',
          fontWeight: 700,
          fontFamily: selectedLanguage === 'ar' 
            ? '"Almarai", "El Messiri", "Changa", "Reem Kufi", sans-serif'
            : '"Montserrat", "Roboto", sans-serif',
          fontSize: selectedLanguage === 'ar' ? '1.2rem' : '1.1rem',
          lineHeight: 1.4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '8px 16px',
          borderRadius: '12px',
          border: '1px solid rgba(211, 47, 47, 0.2)',
          boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)',
        }}
      >
        {selectedLanguage === 'ar' 
          ? 'معاً نقف... معاً نتحرك... معاً نغير'
          : 'Ensemble... nous nous levons... nous agissons... nous changeons'}
      </FloatingText>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {selectedLanguage === 'ar' ? (
          <CacheProvider value={cacheRtl}>
            <Routes>
              <Route path="/" element={mainContent} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  localStorage.getItem('adminToken') ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to="/admin" replace />
                  )
                } 
              />
              <Route path="/votes" element={<Votes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CacheProvider>
        ) : (
          <Routes>
            <Route path="/" element={mainContent} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                localStorage.getItem('adminToken') ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/admin" replace />
                )
              } 
            />
            <Route path="/votes" element={<Votes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
      <ToastContainer 
        position={selectedLanguage === 'ar' ? "bottom-left" : "bottom-right"} 
        theme="colored"
        toastStyle={{
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      />
    </ThemeProvider>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
