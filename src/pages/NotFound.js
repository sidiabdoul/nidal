import React from 'react';
import { Box, Typography, Button, Container, useTheme, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(211, 47, 47, 0.5),
                 0 0 20px rgba(211, 47, 47, 0.3),
                 0 0 30px rgba(211, 47, 47, 0.2);
  }
  50% {
    text-shadow: 0 0 20px rgba(211, 47, 47, 0.8),
                 0 0 30px rgba(211, 47, 47, 0.6),
                 0 0 40px rgba(211, 47, 47, 0.4);
  }
  100% {
    text-shadow: 0 0 10px rgba(211, 47, 47, 0.5),
                 0 0 20px rgba(211, 47, 47, 0.3),
                 0 0 30px rgba(211, 47, 47, 0.2);
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(211, 47, 47, 0.1) 0%, transparent 70%)',
    animation: `${float} 6s ease-in-out infinite`,
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  padding: theme.spacing(4),
  maxWidth: '600px',
  width: '100%',
  animation: `${float} 6s ease-in-out infinite`,
  animationDelay: '0.5s',
}));

const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(8rem, 20vw, 15rem)',
  fontWeight: 800,
  background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${glow} 3s ease-in-out infinite`,
  textAlign: 'center',
  lineHeight: 1,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(6rem, 15vw, 10rem)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
  color: '#fff',
  padding: '12px 32px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(211, 47, 47, 0.4)',
    background: 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 24px',
    fontSize: '1rem',
  },
}));

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedLanguage } = useLanguage();
  const t = translations[selectedLanguage];

  return (
    <StyledContainer>
      <ContentWrapper>
        <ErrorCode>404</ErrorCode>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          component="h1" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          {t.pageNotFound}
        </Typography>
        <Typography 
          variant={isMobile ? "body1" : "h6"} 
          sx={{ 
            textAlign: 'center',
            color: 'text.secondary',
            mb: 4
          }}
        >
          {t.pageNotFoundDesc}
        </Typography>
        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          onClick={() => navigate('/')}
          sx={{
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            color: 'white',
            padding: isMobile ? '8px 24px' : '12px 32px',
            borderRadius: '30px',
            textTransform: 'none',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF8787, #6EE7E7)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
            },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {t.backToHome}
        </Button>
      </ContentWrapper>
    </StyledContainer>
  );
};

export default NotFound; 