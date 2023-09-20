const tags = new Proxy((name, props, ...children) => {
  let dom = document.createElement(name)
  Object.entries(props ?? {}).forEach(([k, v]) => {
  let setter = dom[k] !== undefined ? v => dom[k] = v : v => dom.setAttribute(k, v)
  setter(v)
})
  return add(dom, ...children)
}, { get: (tag, name) => tag.bind(undefined, name) })

let toDom = v => v.nodeType ? v : new Text(v)

let add = (dom, ...children) => {
  children.forEach(child => dom.appendChild(toDom(child)))
  return dom
}

add(
    document.body,
    tags.div(
      // props is required
      {},
      tags.p({}, "👋Hello"),
      tags.ul(
        {},
        tags.li({}, "🗺️World"),
        tags.li({}, tags.a({href: "https://vanjs.org/"}, "🍦VanJS")),
      ),
    )
)
