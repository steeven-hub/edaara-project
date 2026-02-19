import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students-list.html',
  styleUrl: './students-list.css'
})
export class StudentsListComponent {
  students = [
    { id: 1, name: 'Moussa Diop', class: 'Niveau 1', status: 'Payé', progress: '85%' },
    { id: 2, name: 'Aïcha Fall', class: 'Niveau 2', status: 'En attente', progress: '40%' },
    { id: 3, name: 'Abdou Rahman', class: 'Niveau 1', status: 'Payé', progress: '95%' },
    { id: 4, name: 'Fatou Sow', class: 'Niveau 3', status: 'Retard', progress: '60%' }
  ];
}