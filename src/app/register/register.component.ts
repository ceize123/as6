import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    authSubscription: Subscription | undefined;
    constructor(private as : AuthService) { }

    ngOnInit(): void {
    }

    public registerUser: RegisterUser = { userName: "", password: "", password2: "" };
    public warning: string = "";
    public success: boolean = false;
    public loading: boolean = false;

    onSubmit(): void {
        if (this.registerUser.userName !== "" && this.registerUser.password !== "" && this.registerUser.password2 !== "") {
            this.loading = true;

            this.authSubscription = this.as.register(this.registerUser).subscribe(
                (success) => {
                    this.success = true;
                    this.loading = false;
                    this.warning = "";
                },
                (err) => {
                    this.success = false;
                    this.warning = err.error.message;
                    this.loading = false;
                });
        }
    }

    ngOnDestroy(): void { // clean up
        this.authSubscription?.unsubscribe();
    }
}
