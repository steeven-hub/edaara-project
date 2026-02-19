import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row g-3 mb-4 text-center text-white">
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-primary p-3">
          <small class="fw-bold opacity-75">EFFECTIF</small>
          <h2 class="mb-0 fw-bold">{{ students.length }}</h2>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-success p-3">
          <small class="fw-bold opacity-75">MOYENNE ÉCOLE</small>
          <h2 class="mb-0 fw-bold">{{ getGlobalAverage() }}</h2>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-info p-3">
          <small class="fw-bold opacity-75">RÉUSSITE</small>
          <h2 class="mb-0 fw-bold">{{ getSuccessRate() }}%</h2>
        </div>
      </div>
      <div class="col-md-3">
        <button (click)="exportToExcel()" class="btn btn-warning w-100 h-100 fw-bold shadow-sm text-dark">
          📥 EXPORTER EXCEL
        </button>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4 border-start border-primary border-4">
      <div class="card-body">
        <h6 class="fw-bold text-primary mb-3">NOUVELLE INSCRIPTION</h6>
        <div class="row g-2 align-items-end">
          <div class="col-md-3">
            <input type="text" [(ngModel)]="newFirstname" class="form-control" placeholder="Prénom">
          </div>
          <div class="col-md-3">
            <input type="text" [(ngModel)]="newLastname" class="form-control" placeholder="Nom">
          </div>
          <div class="col-md-3">
            <select [(ngModel)]="newLevel" class="form-select">
              <option>Niveau 1</option><option>Niveau 2</option><option>Coran</option>
            </select>
          </div>
          <div class="col-md-3">
            <button (click)="addStudent()" class="btn btn-primary w-100 fw-bold" [disabled]="!newFirstname || !newLastname">
              AJOUTER À LA LISTE
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <input type="text" [(ngModel)]="searchTerm" class="form-control shadow-sm p-3" 
             placeholder="🔍 Rechercher un étudiant parmi les {{ students.length }} inscrits...">
    </div>

    <div class="card border-0 shadow-sm">
      <div class="table-responsive" style="max-height: 550px; overflow-y: auto;">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-dark sticky-top">
            <tr class="small text-center">
              <th class="text-start">PRÉNOM (Modifier)</th>
              <th class="text-start">NOM (Modifier)</th>
              <th>NIVEAU</th>
              <th style="width: 80px">CORAN</th>
              <th style="width: 80px">ARABE</th>
              <th style="width: 80px">TAWHID</th>
              <th class="bg-secondary">MOYENNE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of filteredStudents">
              <td>
                <input type="text" [(ngModel)]="s.firstname" (ngModelChange)="save()" 
                       class="form-control form-control-sm border-0 bg-transparent">
              </td>
              <td>
                <input type="text" [(ngModel)]="s.lastname" (ngModelChange)="save()" 
                       class="form-control form-control-sm border-0 bg-transparent fw-bold text-uppercase">
              </td>
              <td>
                <select [(ngModel)]="s.level" (ngModelChange)="save()" class="form-select form-select-sm border-0">
                  <option>Niveau 1</option><option>Niveau 2</option><option>Coran</option>
                </select>
              </td>
              <td><input type="number" [(ngModel)]="s.note1" (ngModelChange)="save()" class="form-control form-control-sm text-center"></td>
              <td><input type="number" [(ngModel)]="s.note2" (ngModelChange)="save()" class="form-control form-control-sm text-center"></td>
              <td><input type="number" [(ngModel)]="s.note3" (ngModelChange)="save()" class="form-control form-control-sm text-center"></td>
              <td class="text-center bg-light">
                <span class="fw-bold" [ngClass]="getAverage(s) >= 10 ? 'text-success' : 'text-danger'">
                  {{ getAverage(s) }}
                </span>
              </td>
              <td class="text-center">
                <button (click)="delete(s.id)" class="btn btn-sm text-danger border-0">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StudentsListComponent implements OnInit {
  newFirstname = ''; newLastname = ''; newLevel = 'Niveau 1';
  searchTerm = ''; students: any[] = [];

  ngOnInit() {
    const saved = localStorage.getItem('edaara_final_full_150');
    if (saved && JSON.parse(saved).length > 0) {
      this.students = JSON.parse(saved);
    } else {
      // SI VIDE : ON GÉNÈRE LES 150 ÉTUDIANTS PAR DÉFAUT
      this.generateFullList(150);
    }
  }

  generateFullList(count: number) {
    const prenoms = ['Moussa', 'Aïcha', 'Omar', 'Fatou', 'Ibrahim', 'Mariam', 'Ousmane', 'Khadidiatou', 'Amadou', 'Safiétou'];
    const noms = ['DIOP', 'FALL', 'SOW', 'GUEYE', 'NDIAYE', 'SY', 'CISSE', 'BA', 'TOURÉ', 'BALDÉ'];
    const niveaux = ['Niveau 1', 'Niveau 2', 'Coran'];

    for (let i = 1; i <= count; i++) {
      this.students.push({
        id: Date.now() + i,
        firstname: prenoms[Math.floor(Math.random() * prenoms.length)],
        lastname: noms[Math.floor(Math.random() * noms.length)] + " (" + i + ")",
        level: niveaux[Math.floor(Math.random() * niveaux.length)],
        note1: Math.floor(Math.random() * 15) + 5, // Notes aléatoires pour le test
        note2: Math.floor(Math.random() * 15) + 5,
        note3: Math.floor(Math.random() * 15) + 5
      });
    }
    this.save();
  }

  getAverage(s: any): number {
    const n = [Number(s.note1) || 0, Number(s.note2) || 0, Number(s.note3) || 0];
    return parseFloat((n.reduce((a, b) => a + b) / 3).toFixed(2));
  }

  getGlobalAverage(): string {
    if (!this.students.length) return '0';
    const total = this.students.reduce((acc, s) => acc + this.getAverage(s), 0);
    return (total / this.students.length).toFixed(2);
  }

  getSuccessRate(): string {
    if (!this.students.length) return '0';
    const ok = this.students.filter(s => this.getAverage(s) >= 10).length;
    return ((ok / this.students.length) * 100).toFixed(0);
  }

  addStudent() {
    this.students.unshift({ 
      id: Date.now(), firstname: this.newFirstname, lastname: this.newLastname, 
      level: this.newLevel, note1: 0, note2: 0, note3: 0 
    });
    this.newFirstname = ''; this.newLastname = ''; this.save();
  }

  delete(id: number) { this.students = this.students.filter(s => s.id !== id); this.save(); }
  save() { localStorage.setItem('edaara_final_full_150', JSON.stringify(this.students)); }

  get filteredStudents() {
    return this.students.filter(s => 
      (s.firstname + ' ' + s.lastname + ' ' + s.level).toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  exportToExcel() {
    let csv = "Prenom,Nom,Niveau,Coran,Arabe,Tawhid,Moyenne\n";
    this.students.forEach(s => csv += `${s.firstname},${s.lastname},${s.level},${s.note1},${s.note2},${s.note3},${this.getAverage(s)}\n`);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'Liste_Complete_E_Daara.csv'; a.click();
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StudentsListComponent],
  template: `
    <nav class="navbar navbar-dark bg-primary shadow-sm mb-4">
      <div class="container d-flex justify-content-between">
        <span class="navbar-brand fw-bold">E-DAARA MANAGER <small class="fw-light ms-2">Full Edition</small></span>
      </div>
    </nav>
    <div class="container-fluid px-4"><app-students-list></app-students-list></div>
  `
})
export class AppComponent {}