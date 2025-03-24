import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apollo: Apollo,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string) {
    const LOGIN_QUERY = gql`
      query Login($email: String!, $password: String!) {
        Login(email: $email, password: $password) {
          token
          username
          email
        }
      }
    `;

    return this.apollo.query({
      query: LOGIN_QUERY,
      variables: { email, password },
      fetchPolicy: 'no-cache'
    });
  }

  signup(username: string, email: string, password: string) {
    const SIGNUP_MUTATION = gql`
      mutation Signup($username: String!, $email: String!, $password: String!) {
        Signup(username: $username, email: $email, password: $password) {
          token
          username
          email
        }
      }
    `;

    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: { username, email, password }
    });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
