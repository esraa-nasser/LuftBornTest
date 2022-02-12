import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ISession } from "..";

@Component({
    selector:'session-list',
    templateUrl:'./session-list.component.html'
})
export class SessionListComponent implements OnChanges{
    @Input() sessions:ISession[]|undefined
    @Input() filterBy:string='all'
    @Input() sortBy:string='votes'
    visibleSessions:ISession[]=[]
    ngOnChanges(changes: SimpleChanges): void {
        if(this.sessions){
            this.filterSessions(this.filterBy)
            this.sortBy === 'name'?
                this.visibleSessions.sort(sortByNameAsc):
                this.visibleSessions.sort(sortByVotesDec)
        }
    }
    filterSessions(filter:string){
        if(filter === 'all'){
            this.visibleSessions = this.sessions!.slice(0);
        }
        else{
            this.visibleSessions = this.sessions!.filter(session=>{
                return session.level.toLowerCase() === filter
            })
        }
    }
}
function sortByNameAsc(s1: ISession, s2: ISession) {
    if (s1.name > s2.name) return 1;
    if (s1.name === s2.name) return 0;
    else return -1;
}
function sortByVotesDec(s1: ISession, s2: ISession) {
    return s2.voters.length - s1.voters.length;
}