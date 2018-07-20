import { EventEmitter } from '@angular/core';
export declare class HeaderContentComponent {
    title: string;
    search: boolean;
    forceIOS: boolean;
    query: string;
    queryChange: EventEmitter<string>;
    constructor();
}
