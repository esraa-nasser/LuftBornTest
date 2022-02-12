import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IEvent } from ".";
import { EventService } from "./shared/event.service";
@Component({
    template:
    `<div>
        <h1>Upcoming Angular Events</h1>
        <hr>
        <div class="row">
            <event-thumbnail class = "col-md-5" *ngFor="let event of events" [event]="event"></event-thumbnail>
        </div>
    </div>`
    //templateUrl: './events-list.compnent.html'
})

// @Component({
//     selector:'events-list',
//     template:`<div>
//         <h1>Upcoming Angular Events</h1>
//         <hr>
//         <event-thumbnail [event]="eventOne"></event-thumbnail>
//         //<event-thumbnail #thumbnail [event]="eventOne"></event-thumbnail>
//         // <button class = "btn btn-primary" (click)=thumbnail.logFoo()>Log me some foo</button>
//         // <hr>
//         //  <h3>{{thumbnail.someProperty}}</h3>
//     </div>`
//     //templateUrl: './events-list.compnent.html'
// })
export class EventListComponent implements OnInit{
    events!: IEvent[];
    
    constructor(private eventService:EventService, private route: ActivatedRoute){    
    }
    ngOnInit(){
        this.events = this.route.snapshot.data['events'];
        //this.eventService.getEvents().subscribe(events=>{this.events = events})
    }
   
}