import { Lax, LaxDiv, ChatInput, ChatHistory, ChatSend } from "vibeshift"

export type Message = { from: string, text: string }

export type VibeShiftState = {
  messages: Message[]
  textBuffer: string
  justSent: boolean // TODO tech debt
}

// TODO shouldn't be global
const app = Lax<VibeShiftState>({
  messages: [],
  textBuffer: "",
  justSent: false
})

const wrapper = LaxDiv({
  state: {},
  style: {
    // alignItems: "flex-end",
    position: "absolute",
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
  children: [ChatHistory(), ChatInput(), ChatSend()]
  // children: [ChatHistory()]
})

app.append(wrapper)
