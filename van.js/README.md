soruce code: https://github.com/vanjs-org/van/blob/0.11.9/src/van.js

VanJS is an ultra-lightweight, zero-dependency and unopinionated Reactive UI framework based on pure vanilla JavaScript and DOM. Programming with VanJS feels like building React apps in a scripting language, without JSX. Check-out the Hello World code below:

demo01:

```js
import van from 'vanjs-core';

const { tags } = van

// Reusable components can be just pure vanilla JavaScript functions.
// Here we capitalize the first letter to follow React conventions.
const Hello = () => tags.div(
  tags.p("👋Hello"),
  tags.ul(
    tags.li("🗺️World"),
    tags.li(tags.a({href: "https://vanjs.org/"}, "🍦VanJS")),
  ),
)

van.add(document.body, Hello())
// Alternatively, you can write:
// document.body.appendChild(Hello())
```

demo02:

```js
const Counter = () => {
  const counter = van.state(0)
  return tags.div(
    "❤️ ", counter, " ",
    tags.button({onclick: () => ++counter.val}, "👍"),
    tags.button({onclick: () => --counter.val}, "👎"),
  )
}

van.add(document.body, Counter())
```
