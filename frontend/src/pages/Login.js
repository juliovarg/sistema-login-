import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Box, Paper, Typography, TextField, Button, Alert, InputAdornment, Fade } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';

const perfumeSVG = (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="40" rx="18" ry="16" fill="#f3e7db" stroke="#b97a56" strokeWidth="2" />
    <rect x="24" y="10" width="12" height="18" rx="6" fill="#b97a56" />
    <rect x="27" y="4" width="6" height="8" rx="3" fill="#e0cfc0" />
  </svg>
);
const floralBg = 'https://www.transparenttextures.com/patterns/cream-dust.png';
const perfumeGif = 'https://media.giphy.com/media/3o7TKy5WvQKQ1p5l7K/giphy.gif';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showGif, setShowGif] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowGif(true);
    setTimeout(() => setShowGif(false), 1800);
    try {
      const res = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.status === 200 && data.token) {
        login(data.token, data.user.role, data.user.email);
        if (data.user.role === 'admin') navigate('/admin');
        else navigate('/cliente');
      } else {
        setError(data.error || 'Credenciais inválidas.');
      }
    } catch {
      setError('Erro de conexão.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: `url(${floralBg}), linear-gradient(135deg, #f8f6f2 0%, #f3e7db 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* SVG e GIF temático */}
      <Fade in={true} timeout={1200}>
        <Box sx={{ position: 'absolute', top: 40, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1 }}>
          {perfumeSVG}
        </Box>
      </Fade>
      <Fade in={showGif} timeout={500} unmountOnExit>
        <Box sx={{ position: 'absolute', top: 120, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 2 }}>
          <img src={perfumeGif} alt="Perfume animado" style={{ width: 80, opacity: 0.7 }} />
        </Box>
      </Fade>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 5, minWidth: 340, maxWidth: 400, width: '100%', bgcolor: '#fff8f1', zIndex: 3, boxShadow: '0 8px 32px #b97a5633' }}>
        <Typography variant="h3" sx={{ mb: 1, color: '#b97a56', fontWeight: 900, textAlign: 'center', letterSpacing: 2 }}>
          Aroma Sense
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: '#7c5a3a', textAlign: 'center', fontWeight: 400 }}>
          Login na sua experiência olfativa
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: '#b97a56' }} /></InputAdornment> }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: '#b97a56' }} /></InputAdornment> }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#b97a56', color: '#fff', fontWeight: 700, borderRadius: 3, fontSize: 18, '&:hover': { bgcolor: '#a06a4a' } }}>
            Entrar
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Não tem conta? <Link to="/register" style={{ color: '#b97a56', fontWeight: 700, textDecoration: 'none' }}>Registre-se</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
