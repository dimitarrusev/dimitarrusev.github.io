---
title: Building Angular Universal Applications with the Angular CLI
date: "2018-02-06"
category: angular
tags: 
  - angular cli
  - angular universal
  - server-side rendering
  - pre-rendering
slug: "building-angular-universal-apps-with-the-angular-cli"
---

As of Angular 4.0, Angular Universal, which initially started as a community-driven project, is part of the Angular core. Being a part of the framework itself brings many benefits, but most importantly it guarantees stability. 

Angular Universal is a technology that runs Angular applications on the server. It brings a set of tools that, among other things, enable generating static HTML pages through a process widely known as server-side rendering (or pre-rendering). It is performed to satisfy mainly three priorities i.e. to make an app:

- perceived as as fast loading
- scrapable by social network robots
- crawlable by search engines

Angular Universal was initially built to work with [Node.js](https://nodejs.org). Engines for the most popular frameworks such as [Express](https://github.com/angular/universal/tree/master/modules/express-engine) and [Hapi](https://github.com/angular/universal/tree/master/modules/hapi-engine) are available. In addition to Node.js, Angular Universal has [ASP.NET Core](https://github.com/aspnet/JavaScriptServices) support and a bridge protocol to communicate with different language backends like [Django](https://www.djangoproject.com/), [Go](https://golang.org/) and [PHP](http://php.net/) is expected in the future.

The goal of this guide is not to merely introduce you, but to also give you a deeper understanding of the inner workings of Angular Universal. It'll walk you through the process of integrating Angular Universal into an existing CLI generated project and show you how to pre-render an application on the server.

## Prerequisites

Both the Angular CLI and the generated project have dependencies that require Node.js `6.9.0` or higher, together with NPM `3` or higher installed on your system.

The bare minimum requirements are:

* Angular CLI version `1.3.0` and above
* Angular version `4.0.0` and above
* Angular Universal version `4.0.0` and above

This article is based on:

* Angular CLI version `1.6.6`
* Angular version `5.2.3`
* Angular Universal version `5.2.3`

## Get started

I'm assuming that you are already familiar with the Angular CLI. If not, please check out the [usage section](https://github.com/angular/angular-cli#usage) in the official documentation. 

We'll begin by generating a new project:

```bash
ng new my-angular-universal-app
cd my-angular-universal-app
```

At this point we have a standard Angular application. In it's current state it is not able to run in a server environment, mainly because the module format is incorrect. To fix that we need a universal bundle. 

A universal bundle is a [CommonJS](http://requirejs.org/docs/commonjs.html) formatted build of the application which can be used in a Node context. Generating such bundle is supported by the Angular CLI, but it doesn't work out of the box. It takes a bit of configuration, which is what we're going to do next.

## Integrate Angular Universal

Angular CLI version `1.6` offers an automatic way to integrate Angular Universal into an existing CLI generated project through [Schematics](https://github.com/angular/devkit/blob/master/packages/angular_devkit/schematics/README.md). It is as simple as running a single command:

```bash
ng generate universal server
```

It will integrate Angular Universal and configure the Angular CLI, leaving you only to build the application and handle pre-rendering logistics. However, in order to better understand the inner workings, we'll take the road less traveled and do the work by hand.

### Install dependencies

Angular Universal is available to us through the `@angular/platform-server` module. It contains server implementations of the [DOM](https://github.com/angular/angular/blob/5.0.1/packages/platform-server/src/domino_adapter.ts), [Renderer](https://github.com/angular/angular/blob/5.0.1/packages/platform-server/src/server_renderer.ts), [Styles Host](https://github.com/angular/angular/blob/5.0.1/packages/platform-server/src/styles_host.ts), [XHR](https://github.com/angular/angular/blob/5.0.1/packages/platform-server/src/http.ts), [Location](https://github.com/angular/angular/blob/5.0.1/packages/platform-server/src/location.ts) and other browser independent low-level features. We'll compile our application with this module instead of `platform-browser` to generate the universal bundle.

To Install it in your project, run the following command:

```bash
npm install @angular/platform-server --save
```
Before moving forward, it's important to make sure that every Angular package is on the same version. This minimal effort will prevent issues that may rise up from package version mismatch later on.

**package.json**
```json
{
  // ... 
    "dependencies": {
    "@angular/animations": "^5.2.3",
    "@angular/common": "^5.2.3",
    "@angular/compiler": "^5.2.3",
    "@angular/core": "^5.2.3",
    "@angular/forms": "^5.2.3",
    "@angular/http": "^5.2.3",
    "@angular/platform-browser": "^5.2.3",
    "@angular/platform-browser-dynamic": "^5.2.3",
    "@angular/platform-server": "^5.2.3",
    "@angular/router": "^5.2.3",
	// ...
  },
  "devDependencies": {
    "@angular/cli": "1.6.6",
    "@angular/compiler-cli": "^5.2.3",
    "@angular/language-service": "^5.2.3",
    // ...
  }
}
```

### Create platform-specific modules

Traditional Angular applications have only one top-level module. In our case, we need two. Each for its respective platform.

#### Browser module

Our browser module is already in place. The only modifications we're going to make to it is change its name and make it aware of a server transition.

The reason we're renaming it is to clearly express what it represents and also to maintain naming consistency. Down the road we'll need to create another top-level module specifically for the server platform, and obviously, we'll need to be able to easily differentiate between the two.

As far as naming goes, we'll stick to the recommended pattern outlined in the [general naming guidelines](https://angular.io/guide/styleguide#general-naming-guidelines) i.e. `feature.type.ts`.

```bash
mv src/app.module.ts src/app-browser.module.ts
```

Reflect the change to the module name as well:

**src/app/app-browser.module.ts**

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {} // Rename AppModule to AppBrowserModule 
```

Lastly, we need to let the browser module know that this is an application initially rendered on a server. We do that by invoking the [withServerTransition](https://github.com/angular/angular/blob/master/packages/platform-browser/src/browser.ts#L106) method on the `BrowserModule` import in the module's metadata and pass a unique application identifier. This method acts as an interface between the server and browser applications and allows Angular to perform the processing necessary to take over a server rendered application.

The application identifier can be any identifier that is unique on the page, the only requirement being that it must match between the two applications. Angular adds this identifier to the style names of the server rendered components, so that they can be identified and removed once the browser application bootstraps.

**src/app/app-browser.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app-id' }) // Invoke `withServerTransition()` with a unique `appId`
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}    
```

#### Server module

Setting up the server module requires a bit more effort. This time, in addition to creating the module itself, we'll need to create an entry point for it and configure the TypeScript compiler to tell TypeScript how to build it. This is standard procedure for every top-level module and the browser module is no exception, it's just that previously the Angular CLI did the work for us.

The server module wraps the browser module so it can mediate between the two and provides Angular with bootstrapping instructions when running in server context. It's also a place where any server specific code is registered.

Start by creating a file for the module:

```bash
touch src/app/app-server.module.ts
```

And add the following code:

**src/app/app-server.module.ts**

```typescript
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppBrowserModule } from './app-browser.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppBrowserModule, // `AppBrowserModule` should be followed by the `ServerModule`
    ServerModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
```
Pay attention to the module import order in the module's metadata.

### Create module entry points

Similarly like the step before last, we'll begin by changing the name of the entry point for the applications browser module:

```bash
mv src/main.ts src/main-browser.ts
```

And make the following modifications:

**main-browser.ts**
```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppBrowserModule } from './app/app-browser.module'; // Reflect the changes to the file and module names we did previously
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppBrowserModule) // Reflect the module name change here as well
                        .catch(err => console.log(err));
```

Then create an entry point for the server module:

```bash
touch src/main-server.ts
```

And add the following code:

**src/main-server.ts**

```typescript
export { AppServerModule } from './app/app-server.module';
```

It's only job is to export the server module.

### Configure the compilers

An Angular application is composed mainly of components and their HTML templates. Before the browser can render the application, the components and templates must be converted to executable JavaScript — a workload divided between the TypeScript and Angular compiler.
   
#### TypeScript compiler

Configuring the TypeScript compiler for the server application requires its own configuration file, mainly because the transpiled code needs to be in a different format than the one specified in the current configuration.

In addition to that, we need to add a specific section to guide the Angular compiler and let it know about the entry module of the server application.

Start by renaming the `tsconfig.app.json` file to `tsconfig-browser.app.json`:

```bash
mv src/tsconfig.app.json src/tsconfig-browser.app.json
```

Then create a configuration file for the server application by taking the configuration for the browser application as a starting point:

```bash
cp src/tsconfig-browser.app.json src/tsconfig-server.app.json
```

And make the following modifications:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "commonjs", // Change the module format from `ES2015` to `CommonJS`
    "types": []
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ]
}
```

#### Angular compiler

Finally, add `angularCompilerOptions` section with an `entryModule` property pointing to the server module expressed in the following format: `path/to/file#ClassName`:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    "module": "commonjs",
    "types": []
  },
  "angularCompilerOptions": { // Add `angularCompilerOptions` section
    "entryModule": "app/app-server.module#AppServerModule" // Add `entryModule` property pointing to the server module
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ]
}
```


### Configure the Angular CLI

Last but not least, we need to instruct the Angular CLI on how to build our bundle. The Angular CLI is an abstraction on top of Webpack and it's controlled through a special configuration file.

We'll begin by updating the configuration settings for the browser application:

**.angular-cli.json**

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "project": {
    "name": "my-angular-universal-app"
  },
  "apps": [
    {
      "name": "browser", // Add a name
      "root": "src",
      "outDir": "dist/browser", // Change the output directory
      "assets": [],
      "index": "index.html",
      "main": "main-browser.ts", // Update the entry point
      "polyfills": "polyfills.ts",
      "test": "test.ts",
      "tsconfig": "tsconfig-browser.json", // Update the tsconfig
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [
        "styles.scss"
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
  ],
  "test": {
    "karma": {
      "config": "./karma.conf.js"
    }
  },
  "defaults": {
    "styleExt": "scss",
    "component": {}
  }
}
```

Then copy the configuration and use it as a starting point for the server application with the following modifications:

**.angular-cli.json**

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "project": {
    "name": "my-angular-universal-app"
  },
  "apps": [
    {
	  "name": "browser",
      //
      // ...
      //
    },
    {
      "name": "server", // Update the name
      "platform": "server", // Add a platform
      "root": "src",
      "outDir": "dist/server", // Update the output directory
      "assets": [],
      "index": "index.html",
      "main": "main-server.ts", // Update the entry point
      // "polyfills": "polyfills.ts", // Remove the polyfills
      "test": "test.ts",
      "tsconfig": "tsconfig-server.json", // Update the tsconfig
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [
        "styles.scss"
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
  ],
  "test": {
    "karma": {
      "config": "./karma.conf.js"
    }
  },
  "defaults": {
    "styleExt": "scss",
    "component": {}
  }
}
```

This configuration file links all the files we created previously. With it done, we're ready to build.

### Build the application

To build the application we use the `ng build` command along with a few flags to tailor our build:

```bash
ng build --app server --prod --output-hashing none
```

 - `--app server` specifies the application we want to to build.
 - `--prod` is a meta-flag that sets other flags. It specifies the build target, builds with `AOT` and sets cache-busting mode for all files by default.
 - `--output-hashing none` disables the cache-busting mode set by the `--prod` flag. We do this because we don't need the hashes on the server.

Let's create a run script for easier usage in the future. Open up `package.json` and make the following modifications:

**package.json**

```json
{
  "name": "my-angular-universal-app",
  "version": "0.0.0",
  "license": "MIT",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build:browser": "ng build --app browser --prod", // <-- Update `ng build` to `ng build:browser`
    "build:server": "ng build --app server --prod --output-hashing none", // <-- Add `ng build:server`
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
  // ...
}
```

Now build it:

```bash
npm run build:server
```

Upon execution, you should get an output similar to this one:

```bash
Date: 2018-01-29T12:11:54.794Z
Hash: f068dbec42033c900e79
Time: 4073ms
chunk {0} main.bundle.js (main) 9.57 kB [entry] [rendered]
chunk {1} styles.bundle.css (styles) 79 bytes [entry] [rendered]
```

Congratulations, you have successfully built your universal bundle!

## Pre-render routes

The process of generating static HTML documents prior to the application being bootstrapped in the browser is referred to by different terms. Personally, i find the term `pre-rendering` most suitable in the current context and that's how i'll refer to it from now on.

To generate static HTML document for a given route we use a utility function called `renderModuleFactory`, provided to us by the `@angular/platform-server` module.

```typescript
function renderModuleFactory<T>(moduleFactory: NgModuleFactory<T>, options: {
    document?: string;
    url?: string;
    extraProviders?: StaticProvider[];
}): Promise<string>;
```

It takes as arguments a `moduleFactory` and `options` object containing an HTML `document`, a `url` and optional `extraProviders` for the render request and returns a promise that either resolves with a fully-rendered page or rejects with a reason.

Pre-rendering can be performed manually, during build time, using a build tool or dynamically, at runtime, using a web server. Both approaches have their use cases, advantages and disadvantages, but essentially it's a matter of flexibility, scalability and performance.

We've been writing our Angular apps in TypeScript all this time, so i'm assuming that we've all adopted the language by now. We're going to write the server code in TypeScript as well. Let's prepare.

### Configure TypeScript for the server

This step is required only because we've chosen to write our server code in TypeScript. If you want to use JavaScript instead, feel free to skip it.

In the projects root, create another `tsconfig`  file:

```bash
touch tsconfig.server.json
```

And add the following configuration:

**tsconfig.server.json**

```json
{
  "compilerOptions": {
      "baseUrl": "./",
      "module": "commonjs",
      "target": "es2015",
      "outDir": "dist"
   },
   "include": [
     "prerender.ts",
     "server.ts"
   ]
}
```

It tells the compiler to look for files in the current directory named `prerender.ts` and `server.ts`, transpile them from `es2015` to `commonjs` and put the results in the `dist` directory.

### Pre-rendering at build time

Pre-rendering at build time is great for static sites. It is highly scalable, performant and it can be accomplished with a simple command line script that can be manually executed or integrated into a continuous integration service. Let's write one.

In the projects root create a file named `prerender.ts`:

```bash
touch prerender.ts
```

And add the following code:

**prerender.ts**

```typescript
import { readFileSync } from 'fs';

import 'zone.js/dist/zone-node'; 								            // Node compatible version of zone.js. Required by Angular Universal.
import 'reflect-metadata'; 						                            // Metadata reflection API. Required by Angular Universal.
import { renderModuleFactory } from '@angular/platform-server';
const { AppServerModuleNgFactory } = require('./server/main.bundle.js');  	// Compiled Angular application in CommonJS format. Notice that here, we're using `require` instead of `import`.

import { enableProdMode } from '@angular/core';

enableProdMode();

const ARGS = process.argv.slice(2);										    // Command line arguments
const DOCUMENT = readFileSync('./dist/browser/index.html', 'utf-8');		// HTML document to be used as a template.
const URL = ARGS[0];														// URL for the render request.

if (ARGS.length !== 1) {
  process.stdout.write('Usage: node dist/prerender.js <url>');
  process.exit();
} else {
  renderModuleFactory(AppServerModuleNgFactory, { 
    document: DOCUMENT, 
    url: URL 
  })
  .then(html => process.stdout.write(html))
  .catch(err => process.stdout.write(err));
}
```

The script takes as argument the URL for the render request and returns a fully-rendered page or an error if something goes wrong. 

Prior to execution, run the TypeScript compiler to transpile the code:

```bash
node_modules/.bin/tsc --project tsconfig.server.json
```

If you haven't done so already, build both apps:

```bash
npm run build:browser && npm run build:server
```

Then run the script:

```bash
node dist/prerender.js /
```

You should get the following output:

```bash
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>IntroductionToAngularUniversal</title><base href="/"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/x-icon" href="favicon.ico"><link href="styles.9c0ad738f18adc3d19ed.bundle.css" rel="stylesheet"><style ng-transition="my-app-id"></style></head><body><app-root _nghost-c0="" ng-version="5.2.3">
<div _ngcontent-c0="" style="text-align:center">
  <h1 _ngcontent-c0="">
    Welcome to app!
  </h1>
  <img _ngcontent-c0="" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==" width="300">
</div>
<h2 _ngcontent-c0="">Here are some links to help you start: </h2>
<ul _ngcontent-c0="">
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://angular.io/tutorial" rel="noopener" target="_blank">Tour of Heroes</a></h2>
  </li>
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://github.com/angular/angular-cli/wiki" rel="noopener" target="_blank">CLI Documentation</a></h2>
  </li>
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://blog.angular.io/" rel="noopener" target="_blank">Angular blog</a></h2>
  </li>
</ul>

</app-root><script type="text/javascript" src="inline.78b4ac51ac1cd84f71f4.bundle.js"></script><script type="text/javascript" src="polyfills.f20484b2fa4642e0dca8.bundle.js"></script><script type="text/javascript" src="main.fce2f23baeaafec1976c.bundle.js"></script></body></html>
```

### Pre-rendering at run time

This approach is more typical. It is most appropriate for dynamic sites where data is constantly changing and requires setting up and deploying a web server, for which we'll use the popular node framework [Express](https://expressjs.com/) along with a custom [engine](https://github.com/angular/universal/tree/master/modules/express-engine) to automatically call the `renderModuleFactory` for each request and send the results to the browser.

Start by installing `express`, `@types/express` and `@nguniversal/express-engine`:

```bash
npm install express @types/express @nguniversal/express-engine --save-dev
```

In the projects root, create a file named `server.ts`:

```bash
touch server.ts
```

And add the following code:

**server.ts**

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

import * as express from 'express';											  // Express framework.
import { ngExpressEngine } from '@nguniversal/express-engine';				  // Universal engine for Express.

import 'zone.js/dist/zone-node';											  // Node compatible version of `zone.js`. Required by Angular Universal.
import 'reflect-metadata';													  // Metadata reflection API. Required by Angular Universal.
import { renderModuleFactory } from '@angular/platform-server';
const { AppServerModuleNgFactory } = require('./server/main.bundle.js');	  // Compiled Angular application in CommonJS format. Notice that here, we're using `require` instead of `import`.

import { enableProdMode } from '@angular/core';

enableProdMode();

const PORT = process.env.PORT || 4000;									      // Port for the server.
const DIST = join(process.cwd(), 'dist');									  // Directory where build results from the Angular CLI are put.
const DOCUMENT = readFileSync(join(DIST, 'browser', 'index.html'), 'utf-8');  // Document to be used as template.

let app = express();														  // Create Express server.

app.engine('html', ngExpressEngine({										  // Register Universal engine.
  bootstrap: AppServerModuleNgFactory
}));

app.set('view engine', 'html');												  // Set view engine to HTML.
app.set('views', join(DIST, 'browser'));

app.get('*.*', express.static(join(DIST, 'browser'), { maxAge: '1y' }));	  // Serve static files from `${ DIST }/browser`.
app.get('*', (req, res) => { res.render('index', { req }); });				  // Use the Universal engine for all other routes.

app.listen(PORT, () => {													  // Start the server.
  console.log(`Express server listening on http://localhost:${ PORT }`);
});
```

Again, prior to execution run the TypeScript compiler to transpile the code:

```bash
node_modules/.bin/tsc --project tsconfig.server.json
```

If you haven't done so already, build both apps:

```bash
npm run build:browser && npm run build:server
```

Then start the server:

```bash
node dist/server.js
```

You should get the following output:

```bash
Express server listening on http://localhost:4000
```

If you open up the browser on the above location and inspect the source, it should look like this:

```markup
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>IntroductionToAngularUniversal</title><base href="/"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/x-icon" href="favicon.ico"><link href="styles.9c0ad738f18adc3d19ed.bundle.css" rel="stylesheet"><style ng-transition="my-app-id"></style></head><body><app-root _nghost-c0="" ng-version="5.2.3">
<div _ngcontent-c0="" style="text-align:center">
  <h1 _ngcontent-c0="">
    Welcome to app!
  </h1>
  <img _ngcontent-c0="" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==" width="300">
</div>
<h2 _ngcontent-c0="">Here are some links to help you start: </h2>
<ul _ngcontent-c0="">
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://angular.io/tutorial" rel="noopener" target="_blank">Tour of Heroes</a></h2>
  </li>
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://github.com/angular/angular-cli/wiki" rel="noopener" target="_blank">CLI Documentation</a></h2>
  </li>
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://blog.angular.io/" rel="noopener" target="_blank">Angular blog</a></h2>
  </li>
</ul>

</app-root><script type="text/javascript" src="inline.78b4ac51ac1cd84f71f4.bundle.js"></script><script type="text/javascript" src="polyfills.f20484b2fa4642e0dca8.bundle.js"></script><script type="text/javascript" src="main.fce2f23baeaafec1976c.bundle.js"></script></body></html>
```

## Conclusion

This guide walked you through the process of integrating Angular Universal into an existing CLI generated project and introduced you to the basics of server-side rendering (or pre-rendering) --- a technique used to improve perceived startup performance and facilitate web crawlers. 

But this is just the tip of the iceberg in the ocean of possibilities on the subject. In the upcoming articles we'll explore more advanced topics.
