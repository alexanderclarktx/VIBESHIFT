import { Lax, LaxDiv, ChatInput, ChatHistory } from "vibeshift"

type Chat = { from: string, text: string }

export type VibeShiftState = {
  messages: Chat[]
}

const lax = Lax<VibeShiftState>({
  messages: []
})

const wrapper = LaxDiv({
  state: {},
  style: {
    alignItems: "flex-end",
    position: "absolute",
    width: "96%",
    height: "96%",
    left: "50%",
    top: "0px",
    transform: "translate(-50%)",
    flexDirection: "column",
    display: "flex",
    pointerEvents: "auto",
    touchAction: "manipulation"
  },
  children: [ChatHistory(), ChatInput()]
})

lax.append(wrapper)
