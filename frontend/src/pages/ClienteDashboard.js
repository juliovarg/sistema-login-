import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Container
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './ClienteDashboard.css';

export default function ClienteDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('http://localhost:8080/products?limit=20')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []));
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f6f2 0%, #f3e7db 100%)' }}>
      {/* Hero Banner */}
      <AppBar position="static" sx={{ bgcolor: '#fff8f1', color: '#b97a56', boxShadow: 2 }} elevation={2}>
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 2, color: '#b97a56', fontSize: 32 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
            Aroma Sense
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 'bold' }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%', bgcolor: '#f3e7db', py: 5, mb: 4, boxShadow: 1 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#b97a56', mb: 2 }}>
                Descubra o aroma perfeito para cada momento
              </Typography>
              <Typography variant="h6" sx={{ color: '#7c5a3a', mb: 2 }}>
                Catálogo premium de perfumes importados e nacionais. Experimente sensações únicas com a Aroma Sense.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80" alt="Banner" style={{ borderRadius: 16, width: '100%', maxWidth: 340, boxShadow: '0 8px 32px #b97a5633' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Busca de produtos */}
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Buscar por nome ou marca..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              maxWidth: 420,
              padding: '12px 18px',
              borderRadius: 24,
              border: '1px solid #e0cfc0',
              fontSize: 18,
              outline: 'none',
              marginBottom: 8,
              boxShadow: '0 2px 8px #b97a5611',
              background: '#fff8f1',
              color: '#7c5a3a',
            }}
          />
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {filteredProducts.map(p => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <Card
                sx={{
                  maxWidth: 320,
                  m: 'auto',
                  cursor: 'pointer',
                  boxShadow: 4,
                  borderRadius: 4,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: 8,
                  },
                  bgcolor: '#fff8f1',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={p.image_url || 'https://via.placeholder.com/200'}
                  alt={p.name}
                  sx={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                  onClick={() => setSelected(p)}
                />
                <CardContent onClick={() => setSelected(p)}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: '#b97a56' }}>{p.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Marca: {p.brand}</Typography>
                  {/* Badge de estoque */}
                  {p.stock_quantity === 0 ? (
                    <Typography variant="caption" sx={{ color: 'red', fontWeight: 700 }}>Esgotado</Typography>
                  ) : p.stock_quantity < 5 ? (
                    <Typography variant="caption" sx={{ color: '#b97a56', fontWeight: 700 }}>Poucas unidades</Typography>
                  ) : null}
                  <Typography variant="body1" color="primary" sx={{ fontWeight: 'bold', mt: 1, fontSize: 20 }}>
                    R$ {p.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', pb: 2 }}>
                  <Button size="small" variant="contained" sx={{ bgcolor: '#b97a56', color: '#fff', borderRadius: 2, fontWeight: 600, '&:hover': { bgcolor: '#a06a4a' } }} onClick={() => setSelected(p)}>
                    Ver detalhes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, bgcolor: '#fff8f1' } }}>
        {selected && (
          <>
            <DialogTitle sx={{ fontWeight: 700, color: '#b97a56', textAlign: 'center' }}>{selected.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={selected.image_url || 'https://via.placeholder.com/180'}
                  alt={selected.name}
                  sx={{ borderRadius: 3, boxShadow: 2, maxWidth: 220 }}
                />
              </Box>
              <DialogContentText sx={{ mb: 1 }}><b>Marca:</b> {selected.brand}</DialogContentText>
              <DialogContentText sx={{ mb: 1 }}><b>Categoria:</b> {selected.category}</DialogContentText>
              <DialogContentText sx={{ mb: 1 }}><b>Notas:</b> {selected.notes}</DialogContentText>
              <DialogContentText sx={{ mb: 1 }}><b>Descrição:</b> {selected.description}</DialogContentText>
              <DialogContentText sx={{ mb: 1 }}><b>Peso:</b> {selected.weight}g</DialogContentText>
              <DialogContentText sx={{ mb: 1, fontWeight: 700, color: '#b97a56', fontSize: 18 }}><b>Preço:</b> R$ {selected.price}</DialogContentText>
              <DialogContentText sx={{ mb: 1 }}><b>Estoque:</b> {selected.stock_quantity}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button onClick={() => setSelected(null)} variant="contained" sx={{ bgcolor: '#b97a56', color: '#fff', borderRadius: 2, fontWeight: 600, '&:hover': { bgcolor: '#a06a4a' } }}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
