import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public user: User = { userName: "", password: "", _id: "" };
    public warning:string = "";
    public loading: boolean = false;

    constructor(private as:AuthService, private router:Router) { }

    ngOnInit(): void {
    }

    onSubmit(f: NgForm): void {
        if (this.user.userName !== "" && this.user.password !== "") {
            this.loading = true;
            this.as.login(this.user).subscribe(
                (success) => {
                    this.loading = false;
                    // store the returned token 
                    this.as.setToken(success.token);
                    // redirect to the "newReleases" route
                    this.router.navigate(['/newReleases']);
                },
                (err) => {
                    this.warning = err.error.message;
                    this.loading = false;
                });
        }


    }

}
