import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ISession, restrictedWords } from "..";

@Component({
    selector:'create-session',
    templateUrl: './create-session.component.html',
    styles: [`
  em { float: right; color: #E05C65; padding-left:10px}
  .error input, .error select, .error textarea {background-color: #E3C3C5;}
  .error ::-webkit-input-placeholder {color: #999}
  .error ::-moz-placeholder {color: #999}
  .error ::-moz-placeholder {color: #999}
  .error :ms-input-placeholder {color: #999}
  `]
})
export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession = new EventEmitter()
    @Output() cancelAddSession=new EventEmitter()
    name!: FormControl
    presenter!: FormControl
    duration!: FormControl
    level!: FormControl
    abstract!: FormControl
    newSessionForm!: FormGroup
    ngOnInit(): void {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);
        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract,
        })
    }
    saveSession(formValues: any) {
        let session: ISession = {
            abstract: formValues.abstract,
            duration: formValues.duration,
            id: 0,
            level: formValues.level,
            name: formValues.name,
            presenter: formValues.presenter,
            voters: []
        }
        this.saveNewSession.emit(session)
        console.log(session)
    }
    cancel(){
        this.cancelAddSession.emit()
    }
}