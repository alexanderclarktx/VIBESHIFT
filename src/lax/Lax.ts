import { KeyBuffer, LaxElement } from "vibeshift"

export type Lax<State extends {} = {}> = {
  state: State
  elements: LaxElement[]
  append: (...element: LaxElement[]) => boolean
}

export const Lax = <State extends {} = {}>(state: State): Lax<State> => {

  let ready = false

  const bufferDown = KeyBuffer()
  const bufferUp = KeyBuffer()

  const lax: Lax<State> = {
    state,
    elements: [],
    append: (element: LaxElement) => {
      document.body.appendChild(element.e)
      lax.elements.push(element)
      return true
    }
  }

  const update = () => {
    requestAnimationFrame(update)

    if (!ready && document.body) {
      document.body.style.backgroundColor = "white"
      document.body.style.overflowX = "hidden"
      document.body.style.overflowY = "hidden"
      ready = true
    }

    for (const element of lax.elements) {
      element.update?.(element.e, element.state)

      // console.log(element)

      if (element.children) {
        for (const child of element.children) {
          // console.log(child.state)
          child.update?.(child.e, child.state)
        }
      }
    }
  }



  requestAnimationFrame(update)

  return lax
}

// const 
