import { Component } from '@angular/core';
import { StudentsListComponent } from './students-list/students-list'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentsListComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'E-Daara';
}