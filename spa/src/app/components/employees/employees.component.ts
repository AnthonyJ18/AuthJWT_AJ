import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = []; // Asegúrate de que sea un array

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Realiza la solicitud HTTP
    this.http.get<any[]>('http://localhost:3000/api/empleados').subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Verifica los datos en la consola
        this.employees = data; // Asigna los datos a la variable
      },
      error: (error) => {
        console.error('Error al obtener empleados:', error.message);
      }
    });
  }
}
