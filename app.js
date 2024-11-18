const express = require('express');
const cors = require('cors');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Procesa datos JSON en las solicitudes

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api', employeeRoutes); // Rutas para empleados

// Ruta base para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

module.exports = app;
