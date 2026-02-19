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
          <div class="small fw-bold opacity-75">ÉLÈVES</div>
          <h2 class="mb-0 fw-bold">{{ students.length }}</h2>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-success p-3">
          <div class="small fw-bold opacity-75">MOYENNE</div>
          <h2 class="mb-0 fw-bold">{{ getGlobalAverage() }}</h2>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm bg-info p-3">
          <div class="small fw-bold opacity-75">RÉUSSITE</div>
          <h2 class="mb-0 fw-bold">{{ getSuccessRate() }}%</h2>
        </div>
      </div>
      <div class="col-md-3">
        <button (click)="exportToExcel()" class="btn btn-warning w-100 h-100 fw-bold shadow-sm d-flex flex-column align-items-center justify-content-center">
          <span class="fs-4">📥</span>
          <span>EXPORTER EXCEL</span>
        </button>
      </div>
    </div>

    <div class="card border-0 shadow-sm mb-4 bg-white p-3 border-start border-primary border-4">
      <h6 class="fw-bold mb-3 text-primary small">NOUVELLE INSCRIPTION</h6>
      <div class="row g-2">
        <div class="col-md-4"><input type="text" [(ngModel)]="newFirstname" class="form-control" placeholder="Prénom"></div>
        <div class="col-md-4"><input type="text" [(ngModel)]="newLastname" class="form-control" placeholder="Nom"></div>
        <div class="col-md-4">
          <button (click)="addStudent()" class="btn btn-primary w-100 fw-bold" [disabled]="!newFirstname || !newLastname">INSCRIRE</button>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white py-3">
        <input type="text" [(ngModel)]="searchTerm" class="form-control border-0 bg-light" placeholder="🔍 Rechercher un élève...">
      </div>
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light text-secondary small text-center">
            <tr>
              <th class="text-start">PRÉNOM</th>
              <th class="text-start">NOM</th>
              <th>CORAN</th>
              <th>ARABE</th>
              <th>TAWHID</th>
              <th class="bg-light">MOYENNE</th>
              <th class="text-end">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of filteredStudents">
              <td><input type="text" [(ngModel)]="s.firstname" (ngModelChange)="save()" class="form-control form-control-sm border-0 bg-transparent"></td>
              <td><input type="text" [(ngModel)]="s.lastname" (ngModelChange)="save()" class="form-control form-control-sm border-0 bg-transparent fw-bold text-uppercase"></td>
              <td><input type="number" [(ngModel)]="s.note1" (ngModelChange)="save()" class="form-control form-control-sm mx-auto text-center" style="width: 60px"></td>
              <td><input type="number" [(ngModel)]="s.note2" (ngModelChange)="save()" class="form-control form-control-sm mx-auto text-center" style="width: 60px"></td>
              <td><input type="number" [(ngModel)]="s.note3" (ngModelChange)="save()" class="form-control form-control-sm mx-auto text-center" style="width: 60px"></td>
              <td class="text-center bg-light">
                <span class="fw-bold fs-5" [ngClass]="getAverage(s) >= 10 ? 'text-success' : 'text-danger'">{{ getAverage(s) }}</span>
              </td>
              <td class="text-end">
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
  newFirstname = ''; newLastname = ''; searchTerm = ''; students: any[] = [];

  ngOnInit() {
    const saved = localStorage.getItem('edaara_v7');
    if (saved) this.students = JSON.parse(saved);
  }

  getAverage(s: any): number {
    const n = [Number(s.note1) || 0, Number(s.note2) || 0, Number(s.note3) || 0];
    return parseFloat((n.reduce((a, b) => a + b) / 3).toFixed(2));
  }

  getGlobalAverage(): string {
    if (!this.students.length) return '0';
    return (this.students.reduce((acc, s) => acc + this.getAverage(s), 0) / this.students.length).toFixed(2);
  }

  getSuccessRate(): string {
    if (!this.students.length) return '0';
    const ok = this.students.filter(s => this.getAverage(s) >= 10).length;
    return ((ok / this.students.length) * 100).toFixed(0);
  }

  addStudent() {
    this.students.unshift({ id: Date.now(), firstname: this.newFirstname, lastname: this.newLastname, note1: 0, note2: 0, note3: 0 });
    this.newFirstname = ''; this.newLastname = ''; this.save();
  }

  save() { localStorage.setItem('edaara_v7', JSON.stringify(this.students)); }
  delete(id: number) { if(confirm('Supprimer ?')) { this.students = this.students.filter(s => s.id !== id); this.save(); } }

  get filteredStudents() {
    return this.students.filter(s => (s.firstname + ' ' + s.lastname).toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  // LOGIQUE D'EXPORTATION CSV
  exportToExcel() {
    if (this.students.length === 0) return;
    
    // En-tête du fichier
    let csvContent = "Prenom,Nom,Coran,Arabe,Tawhid,Moyenne\n";
    
    // Lignes pour chaque élève
    this.students.forEach(s => {
      const row = `${s.firstname},${s.lastname},${s.note1},${s.note2},${s.note3},${this.getAverage(s)}\n`;
      csvContent += row;
    });

    // Création du fichier et téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Liste_Eleves_E_Daara_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StudentsListComponent],
  template: `
    <nav class="navbar navbar-dark bg-primary shadow-sm mb-5"><div class="container"><span class="navbar-brand fw-bold fs-3">E-DAARA MANAGER</span></div></nav>
    <div class="container" style="margin-top: -30px;"><app-students-list></app-students-list></div>
  `
})
export class AppComponent {}