const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticateToken = require('../middleware/auth');

router.get('/empleados', authenticateToken,employeeController.getAllEmployees);
// Buscar empleado por ID
router.get('/empleados/:id', authenticateToken, employeeController.getEmployeeById);

// Modificar empleado
router.put('/empleados/:id', authenticateToken, employeeController.updateEmployee);

// Eliminar empleado
router.delete('/empleados/:id', async (req, res) => {
    const { id } = req.params;
  
    console.log(`ID recibido para eliminación: ${id}`); // Verifica el ID recibido
  
    if (!id) {
      console.error('ID del empleado no proporcionado');
      return res.status(400).json({ message: 'ID del empleado es obligatorio.' });
    }
  
    try {
      // Intenta eliminar el empleado
      const result = await pool.query('DELETE FROM employees WHERE employee_id = $1', [id]);
  
      console.log(`Resultado de la eliminación:`, result);
  
      if (result.rowCount === 0) {
        console.warn(`Empleado con ID ${id} no encontrado`);
        return res.status(404).json({ message: 'Empleado no encontrado.' });
      }
  
      res.json({ message: 'Empleado eliminado correctamente.' });
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  });
  
module.exports = router;
