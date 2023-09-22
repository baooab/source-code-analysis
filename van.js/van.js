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

let state = initVal => ({
  __proto__: stateProto,
  _val: initVal,
  oldVal: initVal,
  bindings: [],
  // listeners: [],
})
