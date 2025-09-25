import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, Button, Fade } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const perfumeSVG = (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="40" rx="18" ry="16" fill="#f3e7db" stroke="#b97a56" strokeWidth="2" />
    <rect x="24" y="10" width="12" height="18" rx="6" fill="#b97a56" />
    <rect x="27" y="4" width="6" height="8" rx="3" fill="#e0cfc0" />
  </svg>
);
const floralBg = 'https://www.transparenttextures.com/patterns/cream-dust.png';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', background: `url(${floralBg}), linear-gradient(135deg, #f8f6f2 0%, #f3e7db 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <Fade in={true} timeout={1200}>
        <Box sx={{ position: 'absolute', top: 40, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
          {perfumeSVG}
        </Box>
      </Fade>
      <Paper elevation={6} sx={{ p: 6, borderRadius: 5, minWidth: 340, maxWidth: 420, width: '100%', bgcolor: '#fff8f1', textAlign: 'center', zIndex: 2, boxShadow: '0 8px 32px #b97a5633' }}>
        <ShoppingCartIcon sx={{ fontSize: 60, color: '#b97a56', mb: 1 }} />
        <Typography variant="h2" sx={{ color: '#b97a56', fontWeight: 900, mb: 1, letterSpacing: 1 }}>
          Aroma Sense
        </Typography>
        <Typography variant="h5" sx={{ color: '#7c5a3a', mb: 4, fontWeight: 400 }}>
          Tela Inicial
        </Typography>
        <Button component={Link} to="/login" variant="contained" size="large" sx={{ bgcolor: '#b97a56', color: '#fff', fontWeight: 700, borderRadius: 3, mb: 2, width: '100%', fontSize: 18, '&:hover': { bgcolor: '#a06a4a' } }}>
          Login
        </Button>
        <Button component={Link} to="/register" variant="outlined" size="large" sx={{ color: '#b97a56', borderColor: '#b97a56', fontWeight: 700, borderRadius: 3, width: '100%', fontSize: 18, '&:hover': { bgcolor: '#f3e7db' } }}>
          Registrar
        </Button>
      </Paper>
    </Box>
  );
}
