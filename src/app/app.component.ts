
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
