import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Fade,
  Zoom,
  Alert,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    fontSize: '0.875rem',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  [theme.breakpoints.down('sm')]: {
    '& td': {
      padding: theme.spacing(1),
      fontSize: '0.875rem',
    },
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor: status === 'for' ? '#4caf50' : '#f44336',
  color: 'white',
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    height: '24px',
    '& .MuiChip-label': {
      padding: '0 8px',
      fontSize: '0.75rem',
    },
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
}));

const API_URL = 'https://nidalb.onrender.com';

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const [editForm, setEditForm] = useState({
    choice: '',
    opinion: '',
  });

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch(`${API_URL}/api/votes`, {
        headers: {
          'x-admin-token': token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch votes');
      }

      const data = await response.json();
      setVotes(data);
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
          fontFamily: 'Poppins, sans-serif',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (vote) => {
    setSelectedVote(vote);
    setEditForm({
      choice: vote.choice,
      opinion: vote.opinion || '',
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (vote) => {
    setSelectedVote(vote);
    setDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/votes/${selectedVote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update vote');
      }

      toast.success('Vote updated successfully', {
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
      setEditDialogOpen(false);
      fetchVotes();
    } catch (err) {
      toast.error(err.message, {
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
    }
  };

  const handleDelete = async () => {
    console.log('Selected Vote:', selectedVote);
    console.log('Selected Vote ID:', selectedVote?._id);
    
    if (!selectedVote || !selectedVote._id) {
      console.error('Invalid vote data:', { selectedVote, id: selectedVote?._id });
      toast.error(t.deleteError || 'Invalid vote ID');
      return;
    }

    try {
      console.log('Attempting to delete vote with ID:', selectedVote._id);
      const response = await fetch(`${API_URL}/api/votes/${selectedVote._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete error response:', errorData);
        throw new Error(errorData.message || 'Failed to delete vote');
      }

      // Remove the deleted vote from the state
      setVotes(prevVotes => prevVotes.filter(vote => vote._id !== selectedVote._id));
      toast.success(t.deleteSuccess || 'Vote deleted successfully');
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || t.deleteError || 'Failed to delete vote');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 2 : 3, minHeight: '100vh', background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)' }}>
      <Fade in timeout={1000}>
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 'bold' }}>
              Admin Dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{
                background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #b71c1c 0%, #d32f2f 100%)',
                },
              }}
            >
              Logout
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Student Name</StyledTableCell>
                  <StyledTableCell>Matricule</StyledTableCell>
                  <StyledTableCell>Choice</StyledTableCell>
                  {!isMobile && <StyledTableCell>Opinion</StyledTableCell>}
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {votes.map((vote) => (
                  <StyledTableRow key={vote._id}>
                    <TableCell>{vote.name || '-'}</TableCell>
                    <TableCell>{vote.matricule}</TableCell>
                    <TableCell>
                      <StatusChip
                        label={vote.choice === 'for' ? 'For' : 'Against'}
                        status={vote.choice}
                      />
                    </TableCell>
                    {!isMobile && <TableCell>{vote.opinion || '-'}</TableCell>}
                    <TableCell>{new Date(vote.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <ActionButton
                        color="primary"
                        onClick={() => handleEditClick(vote)}
                      >
                        <EditIcon />
                      </ActionButton>
                      <ActionButton
                        color="error"
                        onClick={() => handleDeleteClick(vote)}
                      >
                        <DeleteIcon />
                      </ActionButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
              },
            }}
          >
            Back to Home
          </Button>
        </StyledPaper>
      </Fade>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Vote</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Choice</InputLabel>
              <Select
                value={editForm.choice}
                label="Choice"
                onChange={(e) => setEditForm({ ...editForm, choice: e.target.value })}
              >
                <MenuItem value="for">For</MenuItem>
                <MenuItem value="against">Against</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Opinion"
              value={editForm.opinion}
              onChange={(e) => setEditForm({ ...editForm, opinion: e.target.value })}
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{t.confirmDelete || 'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <Typography>
            {t.deleteConfirmation || 'Are you sure you want to delete this vote? This action cannot be undone.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            {t.cancel || 'Cancel'}
          </Button>
          <Button 
            onClick={() => {
              console.log('Delete button clicked');
              console.log('Current selectedVote:', selectedVote);
              handleDelete();
            }} 
            variant="contained" 
            color="error"
          >
            {t.delete || 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard; 