# 💡 vue-dom-hints <a href="https://npm.im/vue-dom-hints"><img src="https://badgen.net/npm/v/vue-dom-hints"></a> <a href="https://npm.im/vue-dom-hints"><img src="https://badgen.net/npm/dm/vue-dom-hints"></a> <a href="https://packagephobia.now.sh/result?p=vue-dom-hints"><img src="https://packagephobia.now.sh/badge?p=vue-dom-hints"></a> <a href="https://bundlephobia.com/result?p=vue-dom-hints"><img src="https://badgen.net/bundlephobia/minzip/vue-dom-hints"></a>

<p align="center">
  <img src=".github/screenshot.png" width="70%">
  <br>
  <br>
  <strong>A Vue devtool that adds dev hints in the DOM via <code>__vue__</code> attribute</strong>
  <br>
  <i>Instantly identify all Vue components in the DOM and where they're located in your codebase</i>
</p>

## :raising_hand: Why?

- **🌟  Browser agnostic** Minimal alternative to [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)!
- **🕵️‍♀️  No more guessing** Easily identify Vue components just by inspecting the DOM!
- **🔥  Faster debugging** Quickly determine the SFC path and start debugging!

> ⚡️ Pro tip: In Chrome DevTools, inspect an element with the hint attribute and enter `$0.__vue__` in the console to dive into the view model and inspect the state.

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
- `showDevtip` `<Boolean>` (`true`) - whether to show the dev tip in the console when loaded
