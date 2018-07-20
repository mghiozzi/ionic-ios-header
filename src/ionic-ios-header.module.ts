import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common'
import { HeaderContentComponent } from './header-content';
import { TransitionDirective } from './transition';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [
        IonicModule,
        CommonModule
    ],
    declarations: [
        TransitionDirective,
        HeaderContentComponent
    ],
    exports: [
        HeaderContentComponent
    ]
})
export class IonicIOSHeaderModule {

}
