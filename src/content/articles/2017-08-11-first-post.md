---
title: First Post 
date: "2017-08-11"
category: angular
tags: 
  - tag 1
  - tag 2
slug: first-post 
---

First post!

Syntax highlight example:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
 
@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    HighlightDirective
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```
