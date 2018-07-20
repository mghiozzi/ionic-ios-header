# Ionic iOS Header

Simple ionic module that emulates iOS 11 headers.

## Features:
* Easy to setup 🏂
* Searchbar support 🔍
* Android fallback 🤖
* Customizable 👨‍🎨️

## How does it looks like?
<p align="left">
  <img width="392" height="682" src="https://github.com/MarcelloGhiozzi/ionic-ios-header/raw/master/demo.gif">
</p>


## How do I install it?
Install it from npm:
```bash
npm i --save ionic-ios-header
```
You just need to import the module:
```javascript
import { IonicIOSHeaderModule } from 'ionic-ios-header';
@NgModule({
  ...

  imports: [
    IonicIOSHeaderModule
  ]

  ...
```

## How do I use it?
It's easy! Just use the header-content component, instead of ion-header and ion-content, in your page!
```html
<header-content search="true" [(query)]="query" title="Photos">
  //What you put here will be placed inside ion-content
  <ion-card *ngFor="let photo of photos;  let i = index">
    <img [src]="photo"/>
  </ion-card>
</header-content>
```
This is a pretty complete example:
* ```search``` attribute displays a search if set.
* ```query``` attribute 2-way-binds a variable to the search input: no need to manage events!
* ```title``` attribute is self-explanatory


## Work in progress:
* Unit Tests
* Custom templates
* Code cleaning, missing types
