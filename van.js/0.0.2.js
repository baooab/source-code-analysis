const isProps =  (arg) => (arg != undefined && (Object.getPrototypeOf(arg) === Object.prototype))

    const tags = new Proxy((name, ...args) => {4
      const [props, ...children] = isProps(args[0]) ? args : [{}, ...args] 

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

    // props is optional field
    add(
        document.body,
        tags.div(
          tags.p("👋Hello"),
          tags.ul(
            tags.li("🗺️World"),
            tags.li(tags.a({href: "https://vanjs.org/"}, "🍦VanJS")),
          ),
        )
    )
