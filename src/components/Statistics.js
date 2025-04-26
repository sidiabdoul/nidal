import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Fade,
  Zoom,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 6,
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
  },
}));

const AnimatedCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 24,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(211, 47, 47, 0.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: `linear-gradient(120deg, ${theme.palette.primary.main}10, ${theme.palette.primary.light}05)`,
    opacity: 0.5,
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

const FloatingCard = styled(AnimatedCard)({
  animation: `${float} 6s ease-in-out infinite`,
});

const GlowingDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(6, 0),
  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}40, transparent)`,
  height: '2px',
  border: 'none',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  p: 6,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: `linear-gradient(120deg, rgba(211, 47, 47, 0.05), rgba(211, 47, 47, 0.02))`,
    opacity: 0.5,
  },
}));

const API_URL = 'https://nidalb.onrender.com';

const Statistics = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const t = translations[selectedLanguage];
  const [stats, setStats] = useState({ total: 0, stats: {}, latestVotes: [] });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const forPercentage = parseFloat(stats.stats?.for?.percentage || 0);
  const againstPercentage = parseFloat(stats.stats?.against?.percentage || 0);

  return (
    <Fade in timeout={1000}>
      <StyledPaper>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
              background: 'linear-gradient(45deg, #d32f2f, #1a237e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.currentResults}
          </Typography>

          <Box sx={{ 
            mb: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Grid container spacing={4} sx={{ mb: 4, maxWidth: '800px', margin: '0 auto' }}>
              <Grid item xs={12} md={6}>
                <Zoom in timeout={500}>
                  <FloatingCard>
                    <CardContent sx={{ position: 'relative', zIndex: 1, p: 4 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: '1.5rem',
                        }}
                      >
                        {t.for}
                      </Typography>
                      <Typography 
                        variant="h3" 
                        gutterBottom
                        sx={{
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {forPercentage}%
                      </Typography>
                      <StyledLinearProgress
                        variant="determinate"
                        value={forPercentage}
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: 2, 
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      >
                        {stats.stats?.for?.count || 0} {t.votes}
                      </Typography>
                    </CardContent>
                  </FloatingCard>
                </Zoom>
              </Grid>
              <Grid item xs={12} md={6}>
                <Zoom in timeout={700}>
                  <FloatingCard>
                    <CardContent sx={{ position: 'relative', zIndex: 1, p: 4 }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          color: 'primary.main',
                          fontWeight: 600,
                          fontSize: '1.5rem',
                        }}
                      >
                        {t.against}
                      </Typography>
                      <Typography 
                        variant="h3" 
                        gutterBottom
                        sx={{
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #C62828 0%, #D32F2F 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {againstPercentage}%
                      </Typography>
                      <StyledLinearProgress
                        variant="determinate"
                        value={againstPercentage}
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mt: 2, 
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      >
                        {stats.stats?.against?.count || 0} {t.votes}
                      </Typography>
                    </CardContent>
                  </FloatingCard>
                </Zoom>
              </Grid>
            </Grid>
          </Box>

          <GlowingDivider />

          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
            }}
          >
            {t.recentOpinions}
          </Typography>

          <Grid container spacing={3}>
            {stats.latestVotes?.slice(0, 5).map((vote, index) => (
              <Grid item xs={12} key={vote._id}>
                <Zoom in timeout={300 + index * 100}>
                  <AnimatedCard>
                    <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 2 
                      }}>
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              background: `linear-gradient(135deg, ${selectedLanguage === 'ar' ? '#000' : '#1a1a1a'} 0%, #d32f2f 100%)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            {vote.name || t.anonymous}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'text.secondary',
                              fontWeight: 500,
                              mt: 0.5,
                            }}
                          >
                            {t.matricule}: {vote.matricule}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 500,
                          }}
                        >
                          {new Date(vote.timestamp).toLocaleDateString(selectedLanguage === 'ar' ? 'ar-SA' : 'fr-FR')}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          color: vote.choice === 'for' ? 'success.main' : 'error.main',
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        {vote.choice === 'for' ? t.for : t.against}
                      </Typography>
                      {vote.opinion && (
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontStyle: 'italic',
                            color: 'text.primary',
                            textAlign: selectedLanguage === 'ar' ? 'right' : 'left',
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(5px)',
                            borderRadius: 2,
                            p: 2,
                            border: '1px solid rgba(211, 47, 47, 0.1)',
                          }}
                        >
                          "{vote.opinion}"
                        </Typography>
                      )}
                    </CardContent>
                  </AnimatedCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          <Typography
            variant="h6"
            sx={{ 
              textAlign: 'center', 
              color: 'text.secondary',
              mt: 6,
              mb: 4,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${selectedLanguage === 'ar' ? '#000' : '#1a1a1a'} 0%, #d32f2f 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t.totalVotes}: {stats.total}
          </Typography>

          <Box sx={{ mt: 4, mb: 6, textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/votes')}
              sx={{
                background: 'linear-gradient(45deg, #d32f2f, #1a237e)',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1a237e, #d32f2f)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {t.viewAllVotes}
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Fade>
  );
};

export default Statistics; 