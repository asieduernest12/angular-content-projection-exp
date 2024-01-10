import { ComponentDecoratorHandler } from '@angular/compiler-cli/src/ngtsc/annotations';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `<button (click)='onClick($event)'>clickMe</button>`,
})
export class Button implements AfterViewInit {
  @Input('onClick') onClick: (any) => any;

  ngAfterViewInit() {
    const def = () => console.log('def function');
    // this.onClick = this.onClick;
    console.log({ onClick: this.onClick });
  }
}

@Component({
  selector: 'my-app',
  template: `
    <h1>Bathroom</h1>
    <shower [compRef]='theButton' [compInputs]='btnInputs'>
      <!-- project using named ng-content (ng-content[select=[showerHead]] is a frame/anchor point, which will display showerHead) -->
      <span showerHead>ceramic</span>
      <span class='regulator' regulator>dial</span>

      <!-- using templateRefExample with ng-template and ng-container with ngTemplateOutlet with ContentChild('childRef/tubRef') -->
      <ng-template #tubRef>glass tubs</ng-template>
      <ng-template #contentTemplateRef>Right on time</ng-template>
    </shower>
  `,
})
export class AppComponent {
  theButton = Button;

  onClickHandler = ($event) => {
    console.log('clickeed');
  };
  btnInputs = { onClick: this.onClickHandler };
}

@Component({
  selector: 'shower',
  template: `

  <h1>Shower</h1>
    <div>
      head: <ng-content select='[showerHead]'></ng-content>
    </div>
    
    <div>
      regulator: 
      <ng-container>
        <ng-content select='[regulator]'></ng-content>
        <div *ngIf='!regulatorRef'>default regulator</div>
    </ng-container>
    </div>

    <div>Tub: 
      <ng-template [ngTemplateOutlet]='tubRef'>what</ng-template>
       <ng-container *ngIf='!tubRef'>steel</ng-container>
    </div>
    <br/>

    <content [templateRef]="contentTemplateRef"><h2>no item</h2></content>

    <ng-container  class="childComponentMountPoint" *ngComponentOutlet="compRef;inputs: compInputs;outputs:null"></ng-container>
  
  `,
})
export class AppShower implements AfterViewInit {
  @ContentChild('tubRef') tubRef: TemplateRef<unknown>;
  @ContentChild('.regulator', { read: 'span' }) regulatorRef: ElementRef;
  @ContentChild('contentTemplateRef') contentTemplateRef: TemplateRef<unknown>;
  @Input('compInputs') compInputs: any;
  @Input() compRef: any;

  ngAfterViewInit() {
    console.log('view ready', {
      regulatorRef: this.regulatorRef,
      compInputs: this.compInputs,
    });
  }
}

@Component({
  selector: 'content',
  template: `
    <ng-content *ngIf="!templateRef" class='fallback'></ng-content>
    <ng-container *ngTemplateOutlet='templateRef'></ng-container>
  `,
})
export class Content {
  @Input() templateRef: TemplateRef<unknown>;
}
