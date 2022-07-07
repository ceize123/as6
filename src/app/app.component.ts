/********************************************************************************* 
* 
* WEB422 – Assignment 06 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students. 
* 
* Name: ____Yi-Tso Kuo________ Student ID: __166577197________ Date: __Mar. 31, 2022______
*
* Angular App (Deployed) Link: __https://web-422-as6.vercel.app/__________
*
* User API (Heroku) Link: __https://fast-badlands-75912.herokuapp.com/________ 
* 
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public title = 'web422-a4';
    public searchString: string = "";
    public token: any;

    constructor(private as : AuthService, private router: Router) { }
    
    ngOnInit(): void {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
            this.token = this.as.readToken();
            }
        });
    }

    handleSearch() {
        this.router.navigate(["/search"], { queryParams: { q: this.searchString } });
        this.searchString = ""; // set value to empty
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
