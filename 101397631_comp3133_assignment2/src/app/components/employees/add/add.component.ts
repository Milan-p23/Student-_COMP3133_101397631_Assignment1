import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatError,
  ],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  errorMessage: string = '';
  previewImage: string | null = null;
  imageLoadError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required],
      employee_photo: ['', [this.validateImageUrl]]
    });

    // Listen to changes in the employee_photo field
    this.employeeForm.get('employee_photo')?.valueChanges.subscribe(
      (url) => this.onImageURLChange(url)
    );
  }

  // Custom validator for image URL
  validateImageUrl(control: any) {
    if (!control.value) return null;
    
    // Basic URL validation
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
    return urlPattern.test(control.value) ? null : { invalidImageUrl: true };
  }

  onImageURLChange(url: string): void {
    // Reset previous state
    this.previewImage = null;
    this.imageLoadError = false;

    // If URL is empty or invalid, return
    if (!url) return;

    // Validate URL format
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/i;
    if (!urlPattern.test(url)) {
      this.imageLoadError = true;
      return;
    }

    // Attempt to load the image
    const img = new Image();
    img.onload = () => {
      this.previewImage = url;
      this.imageLoadError = false;
    };
    img.onerror = () => {
      this.previewImage = null;
      this.imageLoadError = true;
    };
    img.src = url;
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.employeeForm.controls).forEach(field => {
        const control = this.employeeForm.get(field);
        control?.markAsTouched();
      });
      return;
    }

    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        this.errorMessage = err.message || 'Add employee failed.';
      },
    });
  }
}