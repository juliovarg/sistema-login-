import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, Alert, Box, Avatar, Tooltip } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const perfumeBanner = 'https://cdn.pixabay.com/photo/2017/01/06/19/15/perfume-1959350_1280.jpg'; // imagem elegante de perfume
const perfumeSVG = (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="40" rx="18" ry="16" fill="#f3e7db" stroke="#b97a56" strokeWidth="2" />
    <rect x="24" y="10" width="12" height="18" rx="6" fill="#b97a56" />
    <rect x="27" y="4" width="6" height="8" rx="3" fill="#e0cfc0" />
  </svg>
);

export default function AdminDashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', brand: '', weight: '', description: '', price: '', category: '', notes: '', stock_quantity: '', image: null });
  const [snack, setSnack] = useState({ open: false, type: 'success', text: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/products?limit=20');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch { setSnack({ open: true, type: 'error', text: 'Erro ao buscar produtos.' }); }
  };

  const handleInput = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => v && formData.append(k, v));
    try {
      const res = await fetch('http://localhost:8080/admin/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.status === 201) {
        setSnack({ open: true, type: 'success', text: 'Produto cadastrado!' });
        setForm({ name: '', brand: '', weight: '', description: '', price: '', category: '', notes: '', stock_quantity: '', image: null });
        fetchProducts();
      } else setSnack({ open: true, type: 'error', text: data.error || 'Erro ao cadastrar.' });
    } catch { setSnack({ open: true, type: 'error', text: 'Erro de conexão.' }); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Deseja deletar este produto?')) return;
    try {
      const res = await fetch(`http://localhost:8080/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { fetchProducts(); setSnack({ open: true, type: 'success', text: 'Produto deletado!' }); }
      else setSnack({ open: true, type: 'error', text: 'Erro ao deletar.' });
    } catch { setSnack({ open: true, type: 'error', text: 'Erro de conexão.' }); }
  };

  const handleEdit = p => {
    setEditing(p.id);
    setForm({ ...p, notes: p.notes, image: null });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/admin/products/${editing}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: form.name,
          brand: form.brand,
          weight: parseFloat(form.weight),
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          notes: form.notes,
          stock_quantity: parseInt(form.stock_quantity)
        })
      });
      if (res.ok) {
        setSnack({ open: true, type: 'success', text: 'Produto atualizado!' });
        setEditing(null);
        setForm({ name: '', brand: '', weight: '', description: '', price: '', category: '', notes: '', stock_quantity: '', image: null });
        fetchProducts();
      } else setSnack({ open: true, type: 'error', text: 'Erro ao atualizar.' });
    } catch { setSnack({ open: true, type: 'error', text: 'Erro de conexão.' }); }
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <Box sx={{ minHeight: '100vh', background: 'url(https://www.transparenttextures.com/patterns/cream-dust.png), linear-gradient(135deg, #f8f6f2 0%, #f3e7db 100%)', pb: 6 }}>
      {/* Banner Temático */}
      <Box sx={{ width: '100%', position: 'relative', mb: 2 }}>
        <img src={perfumeBanner} alt="Banner Perfume" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', filter: 'brightness(0.85) blur(0.5px)' }} />
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {perfumeSVG}
          <Typography variant="h3" sx={{ color: '#b97a56', fontWeight: 900, textShadow: '0 2px 12px #fff8f1', letterSpacing: 2, mt: 1 }}>
            Aroma Sense Admin
          </Typography>
        </Box>
      </Box>
      <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: '#fff8f1', mb: 3 }}>
        <Toolbar>
          <InventoryIcon sx={{ mr: 2, color: '#b97a56' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#b97a56', fontWeight: 'bold', letterSpacing: 1 }}>
            Tela de Admin
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 'bold' }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 1000, m: '40px auto', p: 2 }}>
        <Paper sx={{ p: 3, mb: 4, borderRadius: 4, boxShadow: 4, background: 'rgba(255,248,241,0.98)' }} elevation={3}>
          <Typography variant="h5" sx={{ mb: 2, color: '#b97a56', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalFloristIcon sx={{ color: '#b97a56' }} /> {editing ? 'Editar Produto' : 'Cadastrar Produto'}
          </Typography>
          <form onSubmit={editing ? handleUpdate : handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <TextField name="name" label="Nome" value={form.name} onChange={handleInput} required sx={{ flex: '1 1 180px' }} />
            <TextField name="brand" label="Marca" value={form.brand} onChange={handleInput} required sx={{ flex: '1 1 180px' }} />
            <TextField name="weight" label="Peso" type="number" value={form.weight} onChange={handleInput} required sx={{ flex: '1 1 120px' }} />
            <TextField name="description" label="Descrição" value={form.description} onChange={handleInput} sx={{ flex: '1 1 220px' }} />
            <TextField name="price" label="Preço" type="number" value={form.price} onChange={handleInput} required sx={{ flex: '1 1 120px' }} />
            <TextField name="category" label="Categoria" value={form.category} onChange={handleInput} required sx={{ flex: '1 1 120px' }} />
            <TextField name="notes" label="Notas (separadas por vírgula)" value={form.notes} onChange={handleInput} required sx={{ flex: '1 1 220px' }} />
            <TextField name="stock_quantity" label="Estoque" type="number" value={form.stock_quantity} onChange={handleInput} required sx={{ flex: '1 1 120px' }} />
            {!editing && <Button variant="contained" component="label" sx={{ flex: '1 1 220px', bgcolor: '#b97a56', color: '#fff' }}>
              Imagem
              <input name="image" type="file" accept="image/*" onChange={handleInput} hidden required />
            </Button>}
            <Button type="submit" variant="contained" color="primary" startIcon={editing ? <EditIcon /> : <AddBoxIcon />} sx={{ flex: '1 1 180px', bgcolor: '#b97a56', color: '#fff' }}>
              {editing ? 'Salvar Alterações' : 'Cadastrar Produto'}
            </Button>
            {editing && <Button type="button" variant="outlined" color="secondary" onClick={() => { setEditing(null); setForm({ name: '', brand: '', weight: '', description: '', price: '', category: '', notes: '', stock_quantity: '', image: null }); }} sx={{ flex: '1 1 120px' }}>Cancelar</Button>}
          </form>
        </Paper>
        <Typography variant="h6" sx={{ mb: 2, color: '#b97a56', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalFloristIcon sx={{ color: '#b97a56' }} /> Produtos Cadastrados
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 3, background: 'rgba(255,248,241,0.98)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#f3e7db' }}>
                <TableCell sx={{ color: '#b97a56', fontWeight: 700 }}>Nome</TableCell>
                <TableCell sx={{ color: '#b97a56', fontWeight: 700 }}>Marca</TableCell>
                <TableCell sx={{ color: '#b97a56', fontWeight: 700 }}>Preço</TableCell>
                <TableCell sx={{ color: '#b97a56', fontWeight: 700 }}>Estoque</TableCell>
                <TableCell sx={{ color: '#b97a56', fontWeight: 700 }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(p => (
                <TableRow key={p.id} hover sx={{ transition: 'background 0.2s', '&:hover': { background: '#f3e7db' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {p.image_url && <Avatar src={p.image_url} alt={p.name} sx={{ width: 32, height: 32, mr: 1 }} />}
                      <span>{p.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell>{p.brand}</TableCell>
                  <TableCell>R$ {p.price}</TableCell>
                  <TableCell>
                    <Tooltip title={p.stock_quantity === 0 ? 'Esgotado' : p.stock_quantity < 5 ? 'Poucas unidades' : 'Em estoque'}>
                      <span style={{ color: p.stock_quantity === 0 ? 'red' : p.stock_quantity < 5 ? '#b97a56' : '#7c5a3a', fontWeight: 700 }}>
                        {p.stock_quantity}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(p)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(p.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.type} sx={{ width: '100%' }}>
          {snack.text}
        </Alert>
      </Snackbar>
    </Box>
  );
}
