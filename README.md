# 💡 vue-dom-hints <a href="https://npm.im/vue-dom-hints"><img src="https://badgen.net/npm/v/vue-dom-hints"></a> <a href="https://npm.im/vue-dom-hints"><img src="https://badgen.net/npm/dm/vue-dom-hints"></a> <a href="https://packagephobia.now.sh/result?p=vue-dom-hints"><img src="https://packagephobia.now.sh/badge?p=vue-dom-hints"></a> <a href="https://bundlephobia.com/result?p=vue-dom-hints"><img src="https://badgen.net/bundlephobia/minzip/vue-dom-hints"></a>

<p align="center">
  <img src=".github/screenshot.png" width="70%">
  <br>
  <br>
  <strong>A Vue devtool that gives dev hints in the DOM</strong>
  <br>
  <i>Attach <code>__vue__</code> attributes to each component root element to hint at the source path</i>
</p>

## :raising_hand: Why?

- 🌟  Minimal alternative to [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
- 🕵️‍♀️  Easily identify Vue components while inspecting the DOM!
- 🔥  Quickly identify where the Vue component is located!
- 🐣  Tiny! `401 B` gzipped


### ⚡️ Tip
In Chrome DevTools, inspect/select an element with the hint attribute and enter `$0.__vue__` in the console. You can dive into the view model to inspect the state.

## :rocket: Install
```sh
npm i vue-dom-hints
```

## :vertical_traffic_light: Setup
Install it to Vue as a [plugin](https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin):
```js
import DomHints from 'vue-dom-hints'

Vue.use(DomHints)
```

Disable it for production in your build:
```js
if (process.env.NODE_ENV !== 'production') {
  Vue.use(DomHints)
}
```

Pass in options:
```js
Vue.use(DomHints, {
  attributeName: 'hint'
})
```

## ⚙️ Options
- `attributeName` `<String>` (`__vue__`) - the attribute name to use when adding DOM hints
