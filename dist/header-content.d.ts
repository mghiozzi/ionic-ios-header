import { EventEmitter, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import { Platform, Content, Toolbar } from 'ionic-angular';
export declare class HeaderContentComponent {
    private renderer;
    private platform;
    title: string;
    search: boolean;
    forceIOS: boolean;
    contentbox: any;
    query: string;
    queryChange: EventEmitter<string>;
    navbarStart: TemplateRef<void>;
    navbarEnd: TemplateRef<void>;
    headerEnd: TemplateRef<void>;
    searchbar: Toolbar;
    toolbar: ElementRef;
    nav: ElementRef;
    fade: ElementRef;
    element: ElementRef;
    content: Content;
    private subscriptionScroll;
    private changes;
    domChange: EventEmitter<{}>;
    appear: EventEmitter<boolean>;
    private ios;
    private state;
    constructor(renderer: Renderer2, platform: Platform);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    unsubscribe(): void;
    subscribe(): void;
    contentChange(): void;
    initIOS(): void;
    initAndroid(): void;
    transitionToHeader(): void;
    transitionToBody(): void;
    debug(): void;
}
