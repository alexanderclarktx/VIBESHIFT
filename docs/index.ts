import { Lax, LaxDiv, ChatInput, ChatHistory, ChatSend } from "vibeshift"

export type Message = { from: string, text: string }

export type VibeShiftState = {
  messages: Message[]
  textBuffer: string
  justSent: boolean // TODO tech debt
}

const app = Lax<VibeShiftState>({
  messages: [],
  textBuffer: "",
  justSent: false
})

const wrapper = LaxDiv({
  state: {},
  style: {
    position: "absolute",
    maxWidth: "94%",
    width: "100%",
    height: "calc(96% - 110px)",
    left: "50%",
    top: "120px",
    right: "2%",
    transform: "translate(-50%)",
    flexDirection: "column",
    display: "flex",
    pointerEvents: "auto",
    touchAction: "manipulation"
  },
  children: [ChatHistory(), ChatInput(), ChatSend()]
})

app.append(wrapper)
