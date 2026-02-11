// Components/Dashboard.jsx
// Dashboard simple pour tester l'authentification

import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Paper,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/Sign-in');
  };

  return (
    <>
      {/* Barre de navigation */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mon Application
          </Typography>

          <Typography variant="body1" sx={{ mr: 2 }}>
            Bonjour, {user?.name}
          </Typography>

          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenu principal */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bienvenue sur votre Dashboard !
          </Typography>

          <Typography variant="body1" paragraph>
            Vous êtes connecté avec succès.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Informations de votre compte :
            </Typography>
            <Typography variant="body1">
              <strong>ID :</strong> {user?._id}
            </Typography>
            <Typography variant="body1">
              <strong>Nom :</strong> {user?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Email :</strong> {user?.email}
            </Typography>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              🎉 La connexion entre votre frontend et backend fonctionne parfaitement !
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Dashboard;
