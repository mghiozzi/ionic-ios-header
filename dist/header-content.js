import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Platform, Content, Toolbar } from 'ionic-angular';
var HTML_TEMPLATE = "\n<ion-header class=\"statusbar\" #nav>\n  <ion-navbar>\n    <ng-container *ngTemplateOutlet=\"navbarStart\"></ng-container>\n    <ion-title><span #fade>{{title}}</span></ion-title>\n    <ng-container *ngTemplateOutlet=\"navbarEnd\"></ng-container>\n  </ion-navbar>\n  <ng-container *ngTemplateOutlet=\"headerEnd\"></ng-container>\n</ion-header>\n\n<ion-content fullscreen no-bounce>\n  <div #toolbar>\n    <h1 #header class=\"bold-header\">{{title}}</h1>\n    <ion-toolbar [hidden]=\"!search\" #searchbar>\n        <ion-searchbar\n        [(ngModel)]=\"query\"\n        (ionInput)=\"queryChange.emit(query)\">\n      </ion-searchbar>\n    </ion-toolbar>\n  </div>\n  <ng-content></ng-content>\n</ion-content>\n";
var HeaderContentComponent = (function () {
    function HeaderContentComponent(renderer, platform) {
        this.renderer = renderer;
        this.platform = platform;
        this.search = false;
        this.forceIOS = false;
        this.queryChange = new EventEmitter();
        this.domChange = new EventEmitter();
        //Utils
        this.ios = false;
        this.state = false;
    }
    //Life cycle
    //Life cycle
    HeaderContentComponent.prototype.ngAfterViewInit = 
    //Life cycle
    function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ios = _this.platform.is('ios') || _this.forceIOS;
            if (_this.ios)
                _this.initIOS();
            else
                _this.initAndroid();
        });
    };
    HeaderContentComponent.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    //Sub Management
    //Sub Management
    HeaderContentComponent.prototype.unsubscribe = 
    //Sub Management
    function () {
        if (this.subscriptionScroll)
            this.subscriptionScroll.unsubscribe();
        if (this.changes)
            this.changes.disconnect();
    };
    HeaderContentComponent.prototype.subscribe = function () {
        var _this = this;
        this.contentChange();
        this.subscriptionScroll = this.content.ionScroll
            .subscribe(function (data) {
            if (!_this.state && data.scrollTop >= _this.element.nativeElement.offsetHeight - 5) {
                _this.state = true;
                _this.transitionToHeader();
            }
            if (_this.state && data.scrollTop < _this.element.nativeElement.offsetHeight) {
                _this.state = false;
                _this.transitionToBody();
            }
        });
    };
    //Subscription logic
    //Subscription logic
    HeaderContentComponent.prototype.contentChange = 
    //Subscription logic
    function () {
        var _this = this;
        if (this.contentbox) {
            this.changes = new MutationObserver(function (mutations) {
                if (_this.contentbox.clientHeight < _this.content.contentHeight)
                    _this.transitionToBody();
            });
            this.changes.observe(this.contentbox, {
                attributes: true,
                childList: true,
                characterData: true
            });
        }
    };
    HeaderContentComponent.prototype.initIOS = function () {
        this.contentChange();
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'opacity 1s linear');
        this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
        this.appear = new EventEmitter();
        var height = this.toolbar.nativeElement.clientHeight; //USE RULER
        var styleheight = height + 'px';
        this.renderer.setStyle(this.toolbar.nativeElement, 'min-height', styleheight);
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '0');
        this.renderer.setStyle(this.fade.nativeElement, 'transition', 'opacity 0.155s linear');
        this.subscribe();
    };
    HeaderContentComponent.prototype.initAndroid = function () {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '1');
        if (this.searchbar)
            this.renderer.appendChild(this.nav.nativeElement, this.searchbar._elementRef.nativeElement);
    };
    HeaderContentComponent.prototype.transitionToHeader = function () {
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '1');
        if (this.searchbar)
            this.renderer.appendChild(this.nav.nativeElement, this.searchbar._elementRef.nativeElement);
    };
    HeaderContentComponent.prototype.transitionToBody = function () {
        if (this.searchbar)
            this.renderer.appendChild(this.toolbar.nativeElement, this.searchbar._elementRef.nativeElement);
        this.renderer.setStyle(this.fade.nativeElement, 'opacity', '0');
    };
    //Extra
    //Extra
    HeaderContentComponent.prototype.debug = 
    //Extra
    function () {
        console.log('content', JSON.stringify(this.contentbox));
        console.log('element:', this.element);
        console.log('toolbar:', this.toolbar);
        console.log('fade:', this.fade);
        console.log('searchbar', this.searchbar);
        console.log('nav', this.nav);
    };
    HeaderContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'header-content',
                    template: HTML_TEMPLATE,
                    styles: ['.bold-header { padding-top: 0px;margin: 0;padding-left: 15px;padding-bottom: 0px;font-size: 2.7em;font-weight: bolder;color: #111}',
                        '.statusbar{padding-top: calc(20px);padding-top: calc(constant(safe-area-inset-top) + 4px);padding-top: calc(env(safe-area-inset-top));min-height: calc(44px + 20px);min-height: calc(44px + constant(safe-area-inset-top));min-height: calc(44px + env(safe-area-inset-top)); }']
                },] },
    ];
    /** @nocollapse */
    HeaderContentComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: Platform, },
    ]; };
    HeaderContentComponent.propDecorators = {
        "title": [{ type: Input },],
        "search": [{ type: Input },],
        "forceIOS": [{ type: Input },],
        "contentbox": [{ type: Input },],
        "query": [{ type: Input },],
        "queryChange": [{ type: Output },],
        "navbarStart": [{ type: Input },],
        "navbarEnd": [{ type: Input },],
        "headerEnd": [{ type: Input },],
        "searchbar": [{ type: ViewChild, args: ['searchbar',] },],
        "toolbar": [{ type: ViewChild, args: ['toolbar',] },],
        "nav": [{ type: ViewChild, args: ['nav',] },],
        "fade": [{ type: ViewChild, args: ['fade',] },],
        "element": [{ type: ViewChild, args: ['header',] },],
        "content": [{ type: ViewChild, args: [Content,] },],
        "domChange": [{ type: Output },],
        "appear": [{ type: Output },],
    };
    return HeaderContentComponent;
}());
export { HeaderContentComponent };
//# sourceMappingURL=header-content.js.map