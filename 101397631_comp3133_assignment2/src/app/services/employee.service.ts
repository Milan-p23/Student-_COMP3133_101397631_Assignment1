import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  // Get all employees
  getAllEmployees() {
    return this.apollo.query({
      query: gql`
        query {
          getAllemployees {
            id
            first_name
            last_name
            email
            gender
            department
            designation
            salary
            date_of_joining
            employee_photo
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
  }

  // Add employee
  addEmployee(emp: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee(
          $first_name: String!
          $last_name: String!
          $email: String!
          $gender: String!
          $designation: String!
          $salary: Float!
          $date_of_joining: String!
          $department: String!
          $employee_photo: String
        ) {
          AddEmployee(
            first_name: $first_name
            last_name: $last_name
            email: $email
            gender: $gender
            designation: $designation
            salary: $salary
            date_of_joining: $date_of_joining
            department: $department
            employee_photo: $employee_photo
          ) {
            id
          }
        }
      `,
      variables: emp,
    });
  }

  // Get employee by ID
  getEmployeeById(id: string) {
    return this.apollo.query({
      query: gql`
        query($id: String!) {
          getEmployeebyID(id: $id) {
            id
            first_name
            last_name
            email
            gender
            department
            designation
            salary
            date_of_joining
            employee_photo
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
  }

  // Update employee
  updateEmployee(id: string, emp: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee(
          $id: String!
          $first_name: String
          $last_name: String
          $email: String
          $gender: String
          $designation: String
          $salary: Float
          $date_of_joining: String
          $department: String
          $employee_photo: String
        ) {
          UpdateEmployee(
            id: $id
            first_name: $first_name
            last_name: $last_name
            email: $email
            gender: $gender
            designation: $designation
            salary: $salary
            date_of_joining: $date_of_joining
            department: $department
            employee_photo: $employee_photo
          ) {
            id
          }
        }
      `,
      variables: { id, ...emp },
    });
  }

  // Delete employee
  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($id: String!) {
          DeleteEmployee(id: $id) {
            id
          }
        }
      `,
      variables: { id },
    });
  }

  // Search employee
  searchEmployees(filter: { designation?: string; department?: string }) {
    return this.apollo.query({
      query: gql`
        query($designation: String, $department: String) {
          SearchEmployee(designation: $designation, department: $department) {
            id
            first_name
            last_name
            email
            designation
            department
          }
        }
      `,
      variables: filter,
      fetchPolicy: 'no-cache',
    });
  }
}
