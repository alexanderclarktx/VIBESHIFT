import { Lax, LaxDiv, ChatInput } from "vibeshift"

type Chat = { from: string, text: string }

type VibeShiftState = {
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
    display: "flex"
  },
  children: [ChatInput()]
})

lax.append(wrapper)
