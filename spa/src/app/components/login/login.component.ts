import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Token recibido:', response.token);
        this.authService.saveToken(response.token); // Guarda el token
        this.router.navigate(['/empleados']); // Redirige a empleados
      },
      (error) => {
        console.error('Error en inicio de sesión:', error);
        alert('Credenciales incorrectas');
      }
    );
  }
}
