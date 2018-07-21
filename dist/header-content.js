import { Component, Input, Output, EventEmitter } from '@angular/core';
var HTML_TEMPLATE = "\n<ion-header class=\"statusbar\" #nav>\n  <ion-navbar >\n    <ion-title><span #fade>{{title}}</span></ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <div #toolbar>\n    <h1 transition [forceIOS]=\"forceIOS\" [contentbox]=\"content\" [nav]=\"nav\" [fade]=\"fade\" [toolbar]=\"toolbar\" [searchbar]=\"searchbar\" class=\"bold-header\">{{title}}</h1>\n    <ion-toolbar [hidden]=\"!search\" #searchbar>\n        <ion-searchbar\n        [(ngModel)]=\"query\"\n        (ionInput)=\"queryChange.emit(query)\">\n      </ion-searchbar>\n    </ion-toolbar>\n  </div>\n  <div #content>\n    <ng-content></ng-content>\n  </div>\n</ion-content>\n";
var HeaderContentComponent = (function () {
    function HeaderContentComponent() {
        this.search = false;
        this.forceIOS = false;
        this.queryChange = new EventEmitter();
    }
    HeaderContentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'header-content',
                    template: HTML_TEMPLATE,
                    styles: ['.bold-header { padding-top: 0px;margin: 0;padding-left: 15px;padding-bottom: 0px;font-size: 2.7em;font-weight: bolder;color: #111}',
                        '.statusbar{padding-top: calc(20px + 4px);padding-top: calc(constant(safe-area-inset-top) + 4px);padding-top: calc(env(safe-area-inset-top) + 4px);min-height: calc(44px + 20px);min-height: calc(44px + constant(safe-area-inset-top));min-height: calc(44px + env(safe-area-inset-top)); }']
                },] },
    ];
    /** @nocollapse */
    HeaderContentComponent.ctorParameters = function () { return []; };
    HeaderContentComponent.propDecorators = {
        "title": [{ type: Input },],
        "search": [{ type: Input },],
        "forceIOS": [{ type: Input },],
        "query": [{ type: Input },],
        "queryChange": [{ type: Output },],
    };
    return HeaderContentComponent;
}());
export { HeaderContentComponent };
//# sourceMappingURL=header-content.js.map