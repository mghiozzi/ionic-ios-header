import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from './header-content';
import { IonicModule } from 'ionic-angular';
var IonicIOSHeaderModule = (function () {
    function IonicIOSHeaderModule() {
    }
    IonicIOSHeaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        IonicModule,
                        CommonModule
                    ],
                    declarations: [
                        HeaderContentComponent
                    ],
                    exports: [
                        HeaderContentComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    IonicIOSHeaderModule.ctorParameters = function () { return []; };
    return IonicIOSHeaderModule;
}());
export { IonicIOSHeaderModule };
//# sourceMappingURL=ionic-ios-header.module.js.map