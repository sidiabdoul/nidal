import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Fade,
  Zoom,
  FormControl as MuiFormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { translations } from '../translations';
import 'react-toastify/dist/ReactToastify.css';

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

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: `linear-gradient(120deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}10)`,
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

const StyledRadioGroup = styled(RadioGroup)(({ theme, language }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: language === 'ar' ? 'row-reverse' : 'row',
  '& .MuiFormControlLabel-root': {
    margin: 0,
    flex: 1,
  },
  '& .MuiRadio-root': {
    display: 'none',
  },
  '& .MuiFormControlLabel-label': {
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 12,
    textAlign: 'center',
    border: '1px solid rgba(211, 47, 47, 0.2)',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(211, 47, 47, 0.15)',
    },
  },
  '& .Mui-checked + .MuiFormControlLabel-label': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: '#fff',
    borderColor: 'transparent',
    boxShadow: '0 8px 25px rgba(211, 47, 47, 0.25)',
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  padding: '12px 24px',
  fontSize: '1.1rem',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '200%',
    height: '100%',
    background: `linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)`,
    animation: `${shimmer} 3s infinite linear`,
  },
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 30px rgba(211, 47, 47, 0.3)',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(211, 47, 47, 0.2)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
  },
  '& .MuiSelect-select': {
    padding: '16px 14px',
  },
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
}));

const ManifestationForm = ({ language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    matricule: '',
    name: '',
    choice: 'for',
    opinion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Reset opinion when choice changes to 'for'
      ...(name === 'choice' && value === 'for' ? { opinion: '' } : {}),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.matricule || !formData.name || !formData.choice) {
      toast.error(translations[language].allFieldsRequired, {
        style: {
          background: '#ff0000',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center',
          borderRadius: '8px',
          padding: '16px'
        }
      });
      return;
    }

    // Validate matricule
    const matriculeNum = parseInt(formData.matricule);
    if (isNaN(matriculeNum) || matriculeNum < 22001 || matriculeNum > 23119) {
      toast.error(translations[language].matriculeError, {
        style: {
          background: '#ff0000',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center',
          borderRadius: '8px',
          padding: '16px'
        }
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If the response is not JSON (like HTML error page)
        if (response.status === 409) {
          throw new Error(`${t.alreadyVoted} (${formData.matricule})`);
        } else if (response.status === 400) {
          throw new Error(t.invalidMatricule);
        } else {
          throw new Error(t.error);
        }
      }

      if (!response.ok) {
        // Handle specific error cases
        if (data.message === 'User has already voted') {
          throw new Error(`${t.alreadyVoted} (${formData.matricule})`);
        } else if (data.message === 'Invalid matricule format') {
          throw new Error(t.invalidMatricule);
        } else if (data.message === 'Matricule is required') {
          throw new Error(t.matriculeRequired);
        } else if (data.message === 'Name is required') {
          throw new Error(t.nameRequired);
        } else {
          throw new Error(t.error);
        }
      }

      setFormData({
        name: '',
        matricule: '',
        choice: 'for',
        opinion: '',
      });
      toast.success(t.success, {
        style: {
          background: '#4caf50',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
          fontFamily: language === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif',
          direction: language === 'ar' ? 'rtl' : 'ltr',
        },
      });
    } catch (err) {
      setError(err.message);
      toast.error(err.message, {
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(244, 67, 54, 0.2)',
          fontFamily: language === 'ar' ? 'Cairo, sans-serif' : 'Poppins, sans-serif',
          direction: language === 'ar' ? 'rtl' : 'ltr',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fade in timeout={1000}>
      <StyledPaper elevation={3}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${language === 'ar' ? '#000' : '#1a1a1a'} 0%, #d32f2f 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              mb: 5,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                background: `linear-gradient(90deg, transparent 0%, ${language === 'ar' ? '#d32f2f' : '#1a1a1a'} 50%, transparent 100%)`,
                borderRadius: 2,
              },
            }}
          >
            {t.title}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <Zoom in timeout={800}>
              <AnimatedTextField
                required
                fullWidth
                label={t.matricule}
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                variant="outlined"
                inputProps={{
                  dir: language === 'ar' ? 'rtl' : 'ltr',
                }}
              />
            </Zoom>

            <Zoom in timeout={1000}>
              <AnimatedTextField
                required
                fullWidth
                label={t.name}
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                inputProps={{
                  dir: language === 'ar' ? 'rtl' : 'ltr',
                }}
              />
            </Zoom>

            <Zoom in timeout={1200}>
              <FormControl component="fieldset" required>
                <FormLabel 
                  component="legend" 
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '1.1rem',
                    textAlign: language === 'ar' ? 'right' : 'left',
                  }}
                >
                  {t.position}
                </FormLabel>
                <StyledRadioGroup
                  row
                  name="choice"
                  value={formData.choice}
                  onChange={handleChange}
                  language={language}
                >
                  <FormControlLabel
                    value="for"
                    control={<Radio />}
                    label={t.for}
                  />
                  <FormControlLabel
                    value="against"
                    control={<Radio />}
                    label={t.against}
                  />
                </StyledRadioGroup>
              </FormControl>
            </Zoom>

            {formData.choice === 'against' && (
              <Zoom in timeout={1400}>
                <FormControl fullWidth>
                  <InputLabel id="opinion-select-label">{t.opinion}</InputLabel>
                  <StyledSelect
                    labelId="opinion-select-label"
                    id="opinion-select"
                    name="opinion"
                    value={formData.opinion}
                    onChange={handleChange}
                    label={t.opinion}
                  >
                    <MenuItem value="english_exam">{t.englishExamIssue}</MenuItem>
                    <MenuItem value="pv_issue">{t.pvIssue}</MenuItem>
                  </StyledSelect>
                </FormControl>
              </Zoom>
            )}

            <Zoom in timeout={1600}>
              <AnimatedButton
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  t.submit
                )}
              </AnimatedButton>
            </Zoom>
          </Box>
        </Box>
      </StyledPaper>
    </Fade>
  );
};

export default ManifestationForm; 