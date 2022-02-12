import { Routes } from "@angular/router";
import { Error404Component } from "./app/errors/404.component";
import{CreateEventComponent, EventDetailsComponent, EventRouteActivator, 
    EventListResolver, EventListComponent, CreateSessionComponent}
  from './app/events/index'
export const appRoutes:Routes=[
    {path:'events/new', component: CreateEventComponent, canDeactivate:["canDeactivateCreateEvent"]},
    {path:'events', component: EventListComponent, resolve:{events:EventListResolver}},
    {path:'events/:id', component:EventDetailsComponent, canActivate: [EventRouteActivator]},
    {path:'events/session/new', component:CreateSessionComponent},
    {path:'404', component:Error404Component},
    {path:'', redirectTo:'/events', pathMatch:'full'},
    {path:'user', loadChildren:()=>import('./app/user/user.module').then(c=>c.UserModule)},
    
]