import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';


import { EmployeeListComponent } from './components/employees/list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { AddEmployeeComponent } from './components/employees/add/add.component';
import { ViewEmployeeComponent } from './components/employees/view/view.component';
import { UpdateEmployeeComponent } from './components/employees/update/update.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/add',
    component: AddEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees/view/:id',
    component: ViewEmployeeComponent,
    canActivate: [AuthGuard]
    // ⛔ removed renderMode
  },
  {
    path: 'employees/update/:id',
    component: UpdateEmployeeComponent,
    canActivate: [AuthGuard]
    // ⛔ removed renderMode
  }
];


