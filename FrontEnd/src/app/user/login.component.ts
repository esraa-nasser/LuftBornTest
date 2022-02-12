import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
    selector:'user-login',
    templateUrl:'./login.component.html',
    styles:[`
    em{float: right; color:#E05C65;padding-left:10px}`]
})
export class LoginComponent{
    constructor(private authService:AuthService, private router:Router){}
    userName:string | undefined;
    password:string | undefined;
    mouseoverLogin: boolean | undefined;
    login(formsValue:any){       
        this.authService.loginUser(formsValue.userName, formsValue.password)
            .pipe()
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    this.router.navigate(['events']);
                },
                error:() => {
                    this.router.navigate(['events']);
                }
            });
    }
    cancel(){
        this.router.navigate(['events'])
    }
}