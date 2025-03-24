// Updated Employee List Component with Toggleable Search Bar UI and Styled Layout

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { CapitalizePipe } from '../../../shared/capitalize.pipe';

import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    CapitalizePipe
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  isLoading = true;
  errorMessage = '';
  showSearch = false;

  searchCriteria = {
    department: '',
    designation: ''
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  fetchEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (res: any) => {
        this.employees = res.data.getAllemployees;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = err.message || 'Error fetching employees';
        this.isLoading = false;
      },
    });
  }

  searchEmployees(): void {
    this.employeeService.searchEmployees(this.searchCriteria).subscribe({
      next: (res: any) => {
        this.employees = res.data.SearchEmployee;
      },
      error: (err: any) => {
        this.errorMessage = err.message || 'Search failed';
      }
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.fetchEmployees(),
        error: (err) => alert(err.message || 'Delete failed'),
      });
    }
  }

  view(id: string): void {
    this.router.navigate(['/employees', 'view', id]);
  }

  update(id: string): void {
    this.router.navigate(['/employees', 'update', id]);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  resetSearch(): void {
    this.searchCriteria = { department: '', designation: '' };
    this.fetchEmployees();
  }
}
