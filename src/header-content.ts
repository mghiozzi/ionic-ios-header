import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
const HTML_TEMPLATE = `
<ion-header class="statusbar" #nav>
  <ion-navbar >
    <ion-title><span #fade>{{title}}</span></ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div #toolbar>
    <h1 transition [forceIOS]="forceIOS" [contentbox]="content" [nav]="nav" [fade]="fade" [toolbar]="toolbar" [searchbar]="searchbar" class="bold-header">{{title}}</h1>
    <ion-toolbar [hidden]="!search" #searchbar>
        <ion-searchbar
        [(ngModel)]="query"
        (ionInput)="queryChange.emit(query)">
      </ion-searchbar>
    </ion-toolbar>
  </div>
  <div #content>
    <ng-content></ng-content>
  </div>
</ion-content>
`;

@Component({
  selector: 'header-content',
  template: HTML_TEMPLATE,
  styles: [ '.bold-header { padding-top: 0px;margin: 0;padding-left: 15px;padding-bottom: 0px;font-size: 2.7em;font-weight: bolder;color: #111}',
            '.statusbar{padding-top: calc(20px + 4px);padding-top: calc(constant(safe-area-inset-top) + 4px);padding-top: calc(env(safe-area-inset-top) + 4px);min-height: calc(44px + 20px);min-height: calc(44px + constant(safe-area-inset-top));min-height: calc(44px + env(safe-area-inset-top)); }']
})
export class HeaderContentComponent {

  @Input() title: string;
  @Input() search: boolean = false;
  @Input() forceIOS: boolean = false;
  @Input() query: string;
  @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

}
