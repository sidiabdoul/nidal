import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Chip, 
  useTheme, 
  useMediaQuery,
  CircularProgress,
  Alert,
  Fade,
  Zoom
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  animation: `${float} 6s ease-in-out infinite`,
}));

const VoteCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(211, 47, 47, 0.1), rgba(26, 35, 126, 0.1))',
    zIndex: 0,
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  background: status === 'for' 
    ? 'linear-gradient(45deg, #4CAF50, #45a049)'
    : 'linear-gradient(45deg, #f44336, #d32f2f)',
  color: 'white',
  fontWeight: 'bold',
  padding: '4px 12px',
  borderRadius: '20px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

const API_URL = 'https://nidalb.onrender.com';

const Votes = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { selectedLanguage } = useLanguage();
  const t = translations[selectedLanguage];
  
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://nidalb.onrender.com/api/public/votes', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch votes');
        }
        
        const data = await response.json();
        setVotes(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error('Error fetching votes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        background: 'linear-gradient(135deg, rgba(211, 47, 47, 0.05) 0%, rgba(211, 47, 47, 0.1) 100%)',
        backgroundImage: `
          radial-gradient(at 100% 0%, rgba(211, 47, 47, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(26, 35, 126, 0.1) 0px, transparent 50%)
        `,
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(45deg, #d32f2f, #1a237e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              {t.allVotes}
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{ color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}
            >
              {t.allVotesDesc}
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3}>
          {votes.map((vote, index) => (
            <Grid item xs={12} sm={6} md={4} key={vote.matricule || index}>
              <Zoom in timeout={500 + index * 100}>
                <StyledPaper>
                  <VoteCard>
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {vote.name}
                        </Typography>
                        <StatusChip
                          label={vote.choice === 'for' ? t.for : t.against}
                          status={vote.choice}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        {t.matricule}: {vote.matricule}
                      </Typography>
                      {vote.opinion && (
                        <Typography
                          variant="body1"
                          sx={{
                            mt: 2,
                            p: 2,
                            background: 'rgba(0, 0, 0, 0.03)',
                            borderRadius: 2,
                            fontStyle: 'italic',
                          }}
                        >
                          {t.opinion}: {t[vote.opinion] || vote.opinion}
                        </Typography>
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 2,
                          color: 'text.secondary',
                          textAlign: 'right',
                        }}
                      >
                        {new Date(vote.createdAt).toLocaleDateString(selectedLanguage === 'ar' ? 'ar-SA' : 'fr-FR')}
                      </Typography>
                    </Box>
                  </VoteCard>
                </StyledPaper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Votes; 