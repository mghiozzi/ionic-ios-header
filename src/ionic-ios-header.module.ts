import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common'
import { HeaderContentComponent } from './header-content';
import { IonicModule } from 'ionic-angular';

@NgModule({
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
})
export class IonicIOSHeaderModule {

}
