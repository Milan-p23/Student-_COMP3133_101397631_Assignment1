import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res: any) => {
        this.employee = res.data.getEmployeebyID;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error loading employee.';
        this.isLoading = false;
      },
    });
  }
}
