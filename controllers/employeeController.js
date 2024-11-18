const pool = require('../config/db');
// Obtener todos los empleados
exports.getAllEmployees = async (req, res) => {
try {
const result = await pool.query('SELECT * FROM employees');
res.json(result.rows);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

exports.getEmployeeById = async (req, res) => {
    const { id } = req.params; // Obtiene el ID desde la URL
    try {
      const result = await pool.query('SELECT * FROM employees WHERE employee_id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al obtener empleado:', error.message);
      res.status(500).json({ message: 'Error al obtener empleado' });
    }
  };
  
  exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, job_id, salary, department_id } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE employees
         SET first_name = $1, last_name = $2, email = $3, phone_number = $4,
             job_id = $5, salary = $6, department_id = $7
         WHERE employee_id = $8 RETURNING *`,
        [first_name, last_name, email, phone_number, job_id, salary, department_id, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error al actualizar empleado:', error.message);
      res.status(500).json({ message: 'Error al actualizar empleado' });
    }
  };
  

  exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM employees WHERE employee_id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar empleado:', error.message);
      res.status(500).json({ message: 'Error al eliminar empleado' });
    }
  };
  