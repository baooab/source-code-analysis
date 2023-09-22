// TODO


let addAndScheduleOnFirst = (set, s, func, waitMs) => {
  if (set != null) {
    return set.add(s)
  } 

  setTimeout(func, waitMs)
  return new Set().add(s)
}

let changedStates

let stateProto = {
  get "val"() { return this._val },
  // start!
  set "val"(newVal) {
    const currVal = this._val
    const oldVal = this.oldVal
    if (newVal !== currVal) {
      // first update state value
      if (oldVal === currVal) {
        changedStates = addAndScheduleOnFirst(changedStates, this, updateDoms)
      }

      // this.oldVal = currVal ??
      
      this._val = newVal
      // this.listeners.forEach(listener => listener(newVal, currVal))
    }
  }
}

let state = initVal => ({
  __proto__: stateProto,
  _val: initVal,
  oldVal: initVal,
  bindings: [],
  // listeners: [],
})

let toDom = v => v.nodeType ? v : new Text(v)

let add = (dom, ...children) => {
  children.forEach(child => {
    const appendChild = protoOf(child) === stateProto ? bind(child, v => v) : toDom(child)
    // !
    dom.appendChild(appendChild)
  })
  
  return dom
}

let filterBindings = s => {
  s.bindings = s.bindings.filter(b => b.dom?.isConnected)
  return s.bindings
}

let updateDoms = () => {
  let changedStatesArray = [...changedStates]
  changedStates = undefined

  new Set(changedStatesArray.flatMap(filterBindings)).forEach(b => {
    let {_deps, dom, func} = b

    // TODO
  })

  changedStatesArray.forEach(s => s.oldVal = s._val)
}

let bind = (...args) => {
  // deps: state/prop, func: handler function(`state._val`)
  let deps = args.slice(0, -1), func = args[args.length - 1]
  let result = func(...deps.map(d => d._val))
  if (result == undefined) return [] // ??
  let binding = {_deps: deps, dom: toDom(result), func}
  deps.forEach(s => {
    // statesToGc = addAndScheduleOnFirst(statesToGc, s,
    //   () => (statesToGc.forEach(filterBindings), statesToGc = undefined),
    //   bindingGcCycleInMs)

    // bindings for every state/prop
    s.bindings.push(binding)
  })
  return binding.dom
}
