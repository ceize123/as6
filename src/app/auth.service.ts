import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import jwt_decode from "jwt-decode";

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }
    
    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    public setToken(token: string): void{
        localStorage.setItem('access_token', token);
    }

    readToken(): User | null {
        const token = localStorage.getItem('access_token');

        if (token) {
        return jwt_decode(token);
        } else {
        return null;
        }
    }

    isAuthenticated(): Boolean {
        const token = localStorage.getItem('access_token');

        // Note: We can also use helper.isTokenExpired(token) 
        // to see if the token is expired

        if (token) {
            console.log('token exists');
        return true;
        } else {
            console.log('no token');
        return false;
        }
    }

    login(user: User): Observable<any> {
        // Attempt to login
        let api = environment.userAPIBase + "/login";
        return this.http.post<any>(api, user);
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    register(registerUser: RegisterUser): Observable<any> {
        // Attempt to register
        let api = environment.userAPIBase + "/register";
        return this.http.post<any>(api, registerUser);
    }
}