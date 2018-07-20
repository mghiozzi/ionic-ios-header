import { ElementRef, Output, Directive, EventEmitter, Renderer2, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Content, Platform } from 'ionic-angular'

@Directive({
  selector: '[transition]' // Attribute selector
})
export class TransitionDirective {

  @Output() appear: EventEmitter<boolean>;
  @Input() nav: any;
  @Input() searchbar: any;
  @Input() toolbar: any;
  @Input() contentbox: any;
  @Input() fade: any;
  @Input() forceIOS: boolean = false;
  ios: boolean = false;
  subscriptionScroll: Subscription;
  state: boolean = false;

  private changes: MutationObserver;
  @Output()
  public domChange = new EventEmitter();

  constructor(private element: ElementRef, private renderer: Renderer2, private content: Content,private platform: Platform) {

  }

  ngAfterViewInit(){
    this.platform.ready().then(() => {
      this.ios = this.platform.is('ios') || this.forceIOS;
      if (this.ios) this.initIOS();
      else this.initAndroid();
    });
  }

  initIOS(){
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      if (this.contentbox.clientHeight < this.content.contentHeight) this.transitionToBody();
    });
    this.changes.observe(this.contentbox, {
      attributes: true,
      childList: true,
      characterData: true
    });
    this.renderer.setStyle(this.element.nativeElement, 'transition', 'opacity 1s linear');
    this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
    this.appear = new EventEmitter<boolean>();
    let height = this.toolbar.clientHeight + 10;
    let styleheight = height + 'px';
    this.renderer.setStyle(this.toolbar, 'min-height', styleheight)
    this.renderer.setStyle(this.fade, 'opacity', '0');
    this.renderer.setStyle(this.fade, 'transition', 'opacity 0.155s linear');
    this.subscribe();
  }

  initAndroid(){
    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.fade, 'opacity', '1');
    if (this.searchbar) this.renderer.appendChild(this.nav, this.searchbar._elementRef.nativeElement)
  }

  subscribe(){
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

  transitionToHeader(){
    this.renderer.setStyle(this.fade, 'opacity', '1');
    if (this.searchbar) this.renderer.appendChild(this.nav, this.searchbar._elementRef.nativeElement)
  }

  transitionToBody(){
    if (this.searchbar) this.renderer.appendChild(this.toolbar, this.searchbar._elementRef.nativeElement)
    this.renderer.setStyle(this.fade, 'opacity', '0');
  }

  unsubscribe(){
    if(this.subscriptionScroll){
      this.subscriptionScroll.unsubscribe();
    }
    if (this.changes){
      this.changes.disconnect();
    }
  }

  debug(){
    console.log('element:', this.element.nativeElement);
    console.log('toolbar:', this.toolbar);
    console.log('fade:', this.fade);
    console.log('searchbar', this.searchbar);
  }

  ngOnDestroy(){
    this.unsubscribe();
  }

}
