import { Directive, ElementRef, Inject, Input, OnInit } from "@angular/core";
import { JQ_TOKEN } from ".";

@Directive({
    selector:'[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit{
    el:HTMLElement | undefined;
    @Input('modal-trigger') modalId:string='';
    constructor(ref:ElementRef,@Inject(JQ_TOKEN) private $:any){
        this.el = ref.nativeElement;
    }
    ngOnInit(): void {
        this.el?.addEventListener('click',e=>{
            this.$(`#${this.modalId}`).modal({})
        })
    }
}