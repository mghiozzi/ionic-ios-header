# Ionic iOS Header

Simple ionic module that emulates iOS 11 headers.
Still in development 😎

[Try it on StackBlitz!](https://stackblitz.com/edit/ionic-ios-header)

## Features:
* Easy to setup 🏂
* Searchbar support 🔍
* Android fallback 🤖
* Customizable 👨‍🎨️

## How do I install it?
Install it from npm:
```
npm i --save ionic-ios-header
```
You just need to import the module:
```
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
```
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

## Styles:
You can use pre-made styles make the header even cooler!
At the moment there are two stiles:
* ```blur-overlay``` which is my attempt at emulating the native blur effect found iOS 11 headers.
* ```white-noborder``` which displays a white background header whith no borders.

Simply import one in your src/theme/variables.css
```
@import "../../node-modules/ionic-ios-header/scss/blur-overlay";
@import "ionic.globals";
```



## Work in progress:
* Unit Tests
* Custom templates
* Code cleaning, missing types
* Complete documentation
