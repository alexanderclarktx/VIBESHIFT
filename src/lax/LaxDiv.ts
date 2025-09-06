import { CSS, LaxElement, LaxElementProps } from "vibeshift"

const defaults: CSS = {
  position: "absolute",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  outline: "none",
  touchAction: "none"
}

export type LaxDiv<S extends {}> = LaxElement<HTMLDivElement, S>

export const LaxDiv = <S extends {}>(props: LaxElementProps<LaxDiv<S>>, input: boolean = false): LaxDiv<S> => {
  const div = document.createElement(input ? "input" : "div")

  if (props.id) div.id = props.id

  Object.assign(div.style, defaults)
  Object.assign(div.style, props.style)

  div.oncontextmenu = (e) => e.preventDefault()

  if (props.style?.touchAction === undefined) {
    div.ontouchstart = (e) => e.preventDefault()
    div.ontouchend = (e) => e.preventDefault()
    div.ontouchmove = (e) => e.preventDefault()
    div.ontouchcancel = (e) => e.preventDefault()
  }

  if (props.callbacks) {
    const { onPointerDown, onPointerOver, onPointerOut } = props.callbacks
    if (onPointerDown) div.onpointerdown = onPointerDown
    if (onPointerOver) div.onpointerover = onPointerOver
    if (onPointerOut) div.onpointerout = onPointerOut
  }

  return {
    e: div,
    update: props.update,
    state: props.state,
    callbacks: props.callbacks,
    children: props.children ?? []
  }
}
