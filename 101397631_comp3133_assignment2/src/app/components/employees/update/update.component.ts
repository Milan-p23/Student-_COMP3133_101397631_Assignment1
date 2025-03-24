import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatError
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  previewImage: string | null = null;
  errorMessage = '';
  id!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (res: any) => {
        const emp = res.data.getEmployeebyID;
        this.previewImage = emp.employee_photo;
        this.employeeForm = this.fb.group({
          first_name: [emp.first_name, Validators.required],
          last_name: [emp.last_name, Validators.required],
          email: [emp.email, [Validators.required, Validators.email]],
          gender: [emp.gender, Validators.required],
          designation: [emp.designation, Validators.required],
          salary: [emp.salary, [Validators.required, Validators.min(1000)]],
          date_of_joining: [emp.date_of_joining, Validators.required],
          department: [emp.department, Validators.required],
          employee_photo: [emp.employee_photo]
        });
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load employee.';
      }
    });
  }

  onImageURLChange(): void {
    const url = this.employeeForm.get('employee_photo')?.value;
    this.previewImage = url || null;
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    this.employeeService.updateEmployee(this.id, this.employeeForm.value).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.errorMessage = err.message || 'Update failed.';
      }
    });
  }
}
