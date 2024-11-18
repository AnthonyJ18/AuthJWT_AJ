import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spa';
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      this.isAuthenticated = !!token;

      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
    } else {
      console.warn('localStorage no está disponible.');
      this.router.navigate(['/login']);
    }
  }
}
