import { Lax, LaxDiv, ChatInput, ChatHistory } from "vibeshift"

export type Message = { from: string, text: string }

export type VibeShiftState = {
  messages: Message[]
}

const lax = Lax<VibeShiftState>({
  messages: []
})

const wrapper = LaxDiv({
  state: {},
  style: {
    // alignItems: "flex-end",
    position: "absolute",
    // width: "96%",
    maxWidth: "94%",
    width: "100%",
    height: "96%",
    left: "50%",
    top: "2%",
    right: "2%",
    transform: "translate(-50%)",
    flexDirection: "column",
    display: "flex",
    pointerEvents: "auto",
    touchAction: "manipulation"
  },
  children: [ChatHistory(), ChatInput()]
  // children: [ChatHistory()]
})

lax.append(wrapper)
