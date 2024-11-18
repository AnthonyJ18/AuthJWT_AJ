import { Component } from '@angular/core';
import { EmpleadoService } from '../../service/empleado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar-id',
  templateUrl: './buscar-id.component.html',
  styleUrl: './buscar-id.component.css'
})
export class BuscarIDComponent {
  employeeId: number | null = null; // ID del empleado a buscar
  employee: any = null; // Datos del empleado

  constructor(private employeeService: EmpleadoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Si la URL incluye un parámetro :id, buscar automáticamente
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = parseInt(id, 10);
      this.searchEmployee();
    }
  }

  searchEmployee(): void {
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (data) => {
          this.employee = data;
          console.log('Empleado encontrado:', data);
        },
        error: (error) => {
          console.error('Error al buscar empleado:', error.message);
          alert('Empleado no encontrado');
        }
      });
    }
  }

  updateEmployee(): void {
    if (this.employee && this.employee.employee_id) {
      this.employeeService.updateEmployee(this.employee.employee_id, this.employee).subscribe({
        next: (data) => {
          alert('Empleado actualizado correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar empleado:', error.message);
        }
      });
    } else {
      alert('ID del empleado no válido. No se puede actualizar.');
    }
  }

  deleteEmployee(): void {
    if (this.employee && this.employee.employee_id) {
      if (confirm('¿Estás seguro de eliminar este empleado?')) {
        this.employeeService.deleteEmployee(this.employee.employee_id).subscribe({
          next: () => {
            alert('Empleado eliminado correctamente');
            this.employee = null; // Limpia los datos del empleado después de eliminar
          },
          error: (error) => {
            console.error('Error al eliminar empleado:', error.message);
            alert('Ocurrió un error al eliminar el empleado.');
          }
        });
      }
    } else {
      alert('No se puede eliminar: el ID del empleado no es válido.');
    }
  }
}
