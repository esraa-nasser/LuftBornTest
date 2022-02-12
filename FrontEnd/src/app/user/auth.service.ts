import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthService{
    currentUser:IUser | undefined;
    constructor(
        private http: HttpClient
    ) {}
    loginUser(email:string, password:string){
        return this.http.post(`${environment.apiUrl}/login`, { email, password })
            .pipe(map(user => {
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
                let u = <IUser>JSON.parse(JSON.stringify(user));
                this.currentUser={
                    firstName: u.firstName,
                    id: u.id,
                    lastName:u.lastName,
                    userName:u.userName,
                    token:u.token
                }
            }));
        
    }
    isAuthenticated(){
        return !!this.currentUser;
    }
    updateCurrentUser(firstName:string, lastName: string){
        if(this.currentUser){
            this.currentUser!.firstName = firstName;
            this.currentUser!.lastName = lastName;  
            
        }
             
        
    }
}