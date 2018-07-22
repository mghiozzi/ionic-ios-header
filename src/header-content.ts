import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Platform, Content, Toolbar } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

const HTML_TEMPLATE = `
<ion-header class="statusbar" #nav>
  <ion-navbar>
    <ng-container *ngTemplateOutlet="navbarStart"></ng-container>
    <ion-title><span #fade>{{title}}</span></ion-title>
    <ng-container *ngTemplateOutlet="navbarEnd"></ng-container>
  </ion-navbar>
  <ng-container *ngTemplateOutlet="headerEnd"></ng-container>
</ion-header>

<ion-content fullscreen no-bounce>
  <div #toolbar>
    <h1 #header class="bold-header">{{title}}</h1>
    <ion-toolbar [hidden]="!search" #searchbar>
        <ion-searchbar
        [(ngModel)]="query"
        (ionInput)="queryChange.emit(query)">
      </ion-searchbar>
    </ion-toolbar>
  </div>
  <ng-content></ng-content>
</ion-content>
`;

@Component({
  selector: 'header-content',
  template: HTML_TEMPLATE,
  styles: [ '.bold-header { padding-top: 0px;margin: 0;padding-left: 15px;padding-bottom: 0px;font-size: 2.7em;font-weight: bolder;color: #111}',
            '.statusbar{padding-top: calc(20px);padding-top: calc(constant(safe-area-inset-top) + 4px);padding-top: calc(env(safe-area-inset-top));min-height: calc(44px + 20px);min-height: calc(44px + constant(safe-area-inset-top));min-height: calc(44px + env(safe-area-inset-top)); }']
})
export class HeaderContentComponent {

  //Settings
  @Input() title: string;
  @Input() search: boolean = false;
  @Input() forceIOS: boolean = false;
  @Input() contentbox: any;

  //Searchbar
  @Input() query: string;
  @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

  //Templates
  @Input() navbarStart: TemplateRef<void>;
  @Input() navbarEnd: TemplateRef<void>;
  @Input() headerEnd: TemplateRef<void>;

  //Elements
  @ViewChild('searchbar') searchbar: Toolbar;
  @ViewChild('toolbar') toolbar: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  @ViewChild('fade') fade: ElementRef;
  @ViewChild('header') element: ElementRef;
  @ViewChild(Content) content: Content;

  //Events
  private subscriptionScroll: Subscription;
  private changes: MutationObserver;
  @Output() public domChange = new EventEmitter();
  @Output() appear: EventEmitter<boolean>;

  //Utils
  private ios: boolean = false;
  private state: boolean = false;



  constructor(private renderer: Renderer2, private platform: Platform) {

  }

  //Life cycle
  ngAfterViewInit(){
    this.platform.ready().then(() => {
      this.ios = this.platform.is('ios') || this.forceIOS;
      if (this.ios) this.initIOS();
      else this.initAndroid();
    });
  }

  ngOnDestroy(){
    this.unsubscribe();
  }

  //Sub Management
  unsubscribe(){
    if(this.subscriptionScroll) this.subscriptionScroll.unsubscribe();
    if (this.changes) this.changes.disconnect();
  }

  subscribe(){
    this.contentChange();
    this.subscriptionScroll =  this.content.ionScroll
      .subscribe((data) => {
        if (!this.state && data.scrollTop >= this.element.nativeElement.offsetHeight-5){
          this.state = true;
          this.transitionToHeader()
        }
        if (this.state && data.scrollTop < this.element.nativeElement.offsetHeight){
          this.state = false;
          this.transitionToBody()
        }
      });
  }


  //Subscription logic
  contentChange(){
    if (this.contentbox){
      this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        if (this.contentbox.clientHeight < this.content.contentHeight) this.transitionToBody();
      });
      this.changes.observe(this.contentbox, {
        attributes: true,
        childList: true,
        characterData: true
      });
    }
  }

  initIOS(){
    this.contentChange();
    this.renderer.setStyle(this.element.nativeElement, 'transition', 'opacity 1s linear');
    this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
    this.appear = new EventEmitter<boolean>();
    let height = this.toolbar.nativeElement.clientHeight; //USE RULER
    let styleheight = height + 'px';
    this.renderer.setStyle(this.toolbar.nativeElement, 'min-height', styleheight)
    this.renderer.setStyle(this.fade.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.fade.nativeElement, 'transition', 'opacity 0.155s linear');
    this.subscribe();
  }

  initAndroid(){
    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.fade.nativeElement, 'opacity', '1');
    if (this.searchbar) this.renderer.appendChild(this.nav.nativeElement, this.searchbar._elementRef.nativeElement)
  }

  transitionToHeader(){
    this.renderer.setStyle(this.fade.nativeElement, 'opacity', '1');
    if (this.searchbar) this.renderer.appendChild(this.nav.nativeElement, this.searchbar._elementRef.nativeElement)
  }

  transitionToBody(){
    if (this.searchbar) this.renderer.appendChild(this.toolbar.nativeElement, this.searchbar._elementRef.nativeElement)
    this.renderer.setStyle(this.fade.nativeElement, 'opacity', '0');
  }

  //Extra

  debug(){
    console.log('content', JSON.stringify(this.contentbox))
    console.log('element:', this.element);
    console.log('toolbar:', this.toolbar);
    console.log('fade:', this.fade);
    console.log('searchbar', this.searchbar);
    console.log('nav', this.nav);
  }

}
