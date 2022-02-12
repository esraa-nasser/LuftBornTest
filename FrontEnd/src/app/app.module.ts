import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';

import { AppRoutingModule } from './app-routing.module';
import {TOASTR_TOKEN, CollapsibleWellComponent , JQ_TOKEN, SimpleModalComponent, ModalTriggerDirective} from './common/index'
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import{CreateEventComponent, EventDetailsComponent, EventRouteActivator, 
  EventListResolver, EventThumbnailComponent, EventListComponent, EventService, CreateSessionComponent, SessionListComponent, DurationPipe}
from './events/index'
//import { CreateEventComponent } from './events/create-event.component';
//import { EventDetailsComponent } from './events/event-details/event-details.component';
//import { EventRouteActivator } from './events/event-details/event-route-activator.component';
//import { EventListResolver } from './events/event-list-resolver';
//import { EventThumbnailComponent } from './events/event-thumbnail.component';
//import { EventListComponent } from './events/events-list.component' ;
import { NavBarComponent } from './events/nav/navbar.component';
import { AuthService } from './user/auth.service';
//import { EventService } from './events/shared/event.service';

let toastr: any=window['toastr' as any];
let jQuery: any=window['$' as any];
@NgModule({
  declarations: [
    EventsAppComponent, EventListComponent, EventThumbnailComponent, 
    NavBarComponent, EventDetailsComponent, CreateEventComponent,
    Error404Component, CreateSessionComponent, SessionListComponent,
    CollapsibleWellComponent, DurationPipe, SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    HttpClientModule, BrowserModule,
    AppRoutingModule, FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HttpClientModule,
    EventService, {provide:TOASTR_TOKEN, useValue:toastr}, EventRouteActivator,
    AuthService, {provide:'canDeactivateCreateEvent', useValue:checkDirtyState},
    EventListResolver, {provide:JQ_TOKEN, useValue:jQuery}
  ],
  bootstrap: [
    EventsAppComponent
  ]
})
export class AppModule { }
export function checkDirtyState(component: CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have not saved this event, are you sure you want to leave?')
  
    return true
}