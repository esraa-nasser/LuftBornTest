import { Component, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { IEvent, ISession } from "..";
import { EventService } from "../shared/event.service";

@Injectable()
@Component({
    selector:'event-details',
    templateUrl:'./event-details.component.html',
    styles:[`
    .container{padding-left:20px; padding-right:20px}
    .event-image{height: 100px}
    a {cursor:pointer}
    `]
})
export class EventDetailsComponent implements OnInit{
    event!:IEvent;
    addMode!: boolean;
    filterBy: string='all';
    sortBy: string='votes';
    constructor(private eventService:EventService, private route: ActivatedRoute){}
    ngOnInit(): void {
        //this resets component status and value to the new event clicked
        this.route.params.forEach((params:Params)=>{
            this.event = this.eventService.getEventById(+params['id']);
            this.addMode=false;
        })
        //using this line of code, 
        //when we search for session and navigate between them, 
        //url updated with the selected eventid but component values does not change
        //this.event=this.eventService.getEventById(+this.route.snapshot.params['id']);
    }
    addSession(){
        this.addMode = true;
    }
    saveNewSession(session:ISession){
        const nextId =Math.max.apply(null,this.event.sessions.map(s=>s.id))
        session.id = nextId+1
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false;
    }
    cancelAddSession(){
        this.addMode=false;
    }

}