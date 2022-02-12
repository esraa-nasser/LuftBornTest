import { Component } from "@angular/core";
import { AuthService } from "src/app/user/auth.service";
import { EventService } from "..";
@Component({
    selector:'nav-bar',
    templateUrl:'./nav-bar.component.html',
    styles:[`
    .nav.navbar-nav {font-size: 15px}
    #searchForm {margin-right: 100px}
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active {color:#F97924}
    `]
})
export class NavBarComponent{
    searchTerm : string= "";
    foundedSessions !: any[];
    constructor(public authService : AuthService, private eventService : EventService){}
    searchSessions(value : string){

        this.eventService.searchSessions(value).subscribe(sessions=>{
            this.foundedSessions=sessions
        });
    }
}