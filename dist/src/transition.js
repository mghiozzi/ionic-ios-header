import { ElementRef, Output, Directive, EventEmitter, Renderer2, Input } from '@angular/core';
import { Content, Platform } from 'ionic-angular';
var TransitionDirective = (function () {
    function TransitionDirective(element, renderer, content, platform) {
        this.element = element;
        this.renderer = renderer;
        this.content = content;
        this.platform = platform;
        this.forceIOS = false;
        this.ios = false;
        this.state = false;
        this.domChange = new EventEmitter();
    }
    TransitionDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.ios = _this.platform.is('ios') || _this.forceIOS;
            if (_this.ios)
                _this.initIOS();
            else
                _this.initAndroid();
        });
    };
    TransitionDirective.prototype.initIOS = function () {
        var _this = this;
        this.changes = new MutationObserver(function (mutations) {
            if (_this.contentbox.clientHeight < _this.content.contentHeight)
                _this.transitionToBody();
        });
        this.changes.observe(this.contentbox, {
            attributes: true,
            childList: true,
            characterData: true
        });
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'opacity 1s linear');
        this.renderer.setStyle(this.element.nativeElement, 'opacity', '1');
        this.appear = new EventEmitter();
        var height = this.toolbar.clientHeight + 10;
        var styleheight = height + 'px';
        this.renderer.setStyle(this.toolbar, 'min-height', styleheight);
        this.renderer.setStyle(this.fade, 'opacity', '0');
        this.renderer.setStyle(this.fade, 'transition', 'opacity 0.155s linear');
        this.subscribe();
    };
    TransitionDirective.prototype.initAndroid = function () {
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.fade, 'opacity', '1');
        if (this.searchbar)
            this.renderer.appendChild(this.nav, this.searchbar._elementRef.nativeElement);
    };
    TransitionDirective.prototype.subscribe = function () {
        var _this = this;
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
    TransitionDirective.prototype.transitionToHeader = function () {
        this.renderer.setStyle(this.fade, 'opacity', '1');
        if (this.searchbar)
            this.renderer.appendChild(this.nav, this.searchbar._elementRef.nativeElement);
    };
    TransitionDirective.prototype.transitionToBody = function () {
        if (this.searchbar)
            this.renderer.appendChild(this.toolbar, this.searchbar._elementRef.nativeElement);
        this.renderer.setStyle(this.fade, 'opacity', '0');
    };
    TransitionDirective.prototype.unsubscribe = function () {
        if (this.subscriptionScroll) {
            this.subscriptionScroll.unsubscribe();
        }
        if (this.changes) {
            this.changes.disconnect();
        }
    };
    TransitionDirective.prototype.debug = function () {
        console.log('element:', this.element.nativeElement);
        console.log('toolbar:', this.toolbar);
        console.log('fade:', this.fade);
        console.log('searchbar', this.searchbar);
    };
    TransitionDirective.prototype.ngOnDestroy = function () {
        this.unsubscribe();
    };
    TransitionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[transition]' // Attribute selector
                },] },
    ];
    /** @nocollapse */
    TransitionDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: Content, },
        { type: Platform, },
    ]; };
    TransitionDirective.propDecorators = {
        "appear": [{ type: Output },],
        "nav": [{ type: Input },],
        "searchbar": [{ type: Input },],
        "toolbar": [{ type: Input },],
        "contentbox": [{ type: Input },],
        "fade": [{ type: Input },],
        "forceIOS": [{ type: Input },],
        "domChange": [{ type: Output },],
    };
    return TransitionDirective;
}());
export { TransitionDirective };
//# sourceMappingURL=transition.js.map