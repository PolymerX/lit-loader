# lit-loader
[![Build Status](https://travis-ci.org/PolymerX/lit-loader.svg?branch=master)](https://travis-ci.org/PolymerX/lit-loader) [![codecov](https://codecov.io/gh/PolymerX/lit-loader/badge.svg?branch=master)](https://codecov.io/gh/PolymerX/lit-loader?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/PolymerX/lit-loader.svg)](https://greenkeeper.io/)

[![npm](https://img.shields.io/npm/v/lit-loader.svg?style=for-the-badge)](https://github.com/PolymerX/lit-loader)

> Single File Component LitElement loader for Webpack

## Example repository

Checkout the working repository for a more comprehensive example: https://github.com/PolymerX/lit-loader-example

## Why

Because we love separation of concerns also without separation of files! This loader will produce a Web Component using the [LitElement](https://github.com/Polymer/lit-element) starting from a Single File Component, [like Vue](https://vuejs.org/v2/guide/single-file-components.html).

## What

The loader does a simple job: take your `.lit` file and build up as single `js` file. And you can easily use **PostCSS** on your styles.


## Install

```
$ yarn add --dev lit-loader
```

## Usage

#### Add to Webpack

Add the loader to your Webpack conf `webpack.config.js`:

```js
...

module: {
    rules: [
      {
        test: /\.lit$/,
        loader: 'lit-loader'
      }
    ]
  }

...
```

#### Create your first `.lit` element

`CounterElement.lit`
```html
<style lang="postcss"> <!-- This will enable PostCSS compilation -->
  span {
    width: 20px;
    display: inline-block;
    text-align: center;
    font-weight: bold;
  }
</style>

<template>
  <div>
    <p>
      Clicked: <span>${this.clicks}</span> times.
      Value is <span>${this.value}</span>.
      <button @click="${this._onIncrement}" title="Add 1">+</button>
      <button @click="${this._onDecrement}" title="Minus 1">-</button>
    </p>
  </div>
</template>

<script>
  export default class CounterElement {
    static get properties() { return {
      clicks: Number,
      value: Number
    }};

    constructor() {
      super();
      this.clicks = 0;
      this.value = 0;
    }

    _onIncrement() {
      this.value++;
      this.clicks++;
      this.dispatchEvent(new CustomEvent('counter-incremented'));
    }

    _onDecrement() {
      this.value--;
      this.clicks++;
      this.dispatchEvent(new CustomEvent('counter-decremented'));
    }
  }

  window.customElements.define('counter-element', CounterElement);
</script>
```

#### Import it within another element and use it

`index.js`
```js
import {LitElement, html} from 'lit-element';

...

import './CounterElement.lit';

export default class MyApp extends LitElement {
	...


	_render(props) {
		return html`
		<div>
			<counter-element></counter-element>
		</div>
		`
	}

	...

}

```

## Use with Babel

Just chain the `babel-loader` **AFTER** the `lit-loader` like so:

```js
module: {
    rules: [
      {
        test: /\.lit$/,
        use: ['babel-loader', 'lit-loader']
      }
    ]
  }
```

## PostCSS configuration

You need to add a PostCSS configuration file (`postcss.config.js`) if you want to use it.

## Current status

I think this should be considered experimental and I will try to improve it as much as I can. I really would love to accept some PR's to improve the project. 🤘


## License

MIT © [LasaleFamine](https://godev.space)
