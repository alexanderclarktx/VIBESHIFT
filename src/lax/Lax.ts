import { KeyBuffer, LaxElement } from "vibeshift"

export type Lax<State extends {} = {}> = {
  state: State
  elements: LaxElement[]
  keysDown: KeyBuffer
  append: (...element: LaxElement[]) => boolean
}

export const Lax = <State extends {} = {}>(state: State): Lax<State> => {

  let ready = false

  const bufferUp = KeyBuffer()

  const lax: Lax<State> = {
    state,
    elements: [],
    keysDown: KeyBuffer(),
    append: (element: LaxElement) => {
      document.body.appendChild(element.e)
      lax.elements.push(element)

      if (element.children) {
        for (const child of element.children) {
          element.e.appendChild(child.e)

          lax.elements.push(child)
          // lax.append(child)
        }
      }

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
      element.update?.(element.e, lax)

      if (element.children) {
        for (const child of element.children) {
          child.update?.(child.e, lax)
        }
      }


    }
  }

  document.addEventListener("keydown", (event) => {
    if (document.hasFocus()) {
      let key = event.key.toLowerCase()

      console.log("event listener", key)

      // prevent defaults
      // if (charactersPreventDefault.has(key)) event.preventDefault()

      // add to buffer
      if (!lax.keysDown.get(key)) {
        lax.keysDown.push({ key, hold: 0 })
        console.log("pushed", key)
      }
    }
  })

  requestAnimationFrame(update)

  return lax
}
