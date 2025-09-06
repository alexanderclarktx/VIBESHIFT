import { ChatInput } from "src/ChatInput"
import { Lax, LaxDiv } from "vibeshift"

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
    position: "absolute",
    width: "96%",
    height: "96%",
    left: "50%",
    // bottom: "%",
    transform: "translate(-50%)"
  },
  children: [ ChatInput()]
})

// const chatInput = ChatInput()
// wrapper.e.append(chatInput.e)

lax.append(wrapper)
