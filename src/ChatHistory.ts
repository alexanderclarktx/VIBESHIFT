import { Message, VibeShiftState } from "docs"
import { Lax, LaxDiv } from "vibeshift"

const ChatBubble = (msg: Message) => {
  const div = LaxDiv({
    state: {},
    style: {
      fontSize: "2em",
      border: "2px solid blue",
      borderRadius: "8px"
    }
  })

  div.e.textContent = msg.text
}

export const ChatHistory = () => {

  let count = 0

  const chatHistory = LaxDiv({
    state: {},
    style: {

    },
    update: (_, lax: Lax<VibeShiftState>) => {
      const { messages } = lax.state
      if (count !== messages.length) {
        for (let i = count; i < messages.length; i++) {
          console.log("new", messages[i])
        }
      }

      count = messages.length
    }
  })

  return chatHistory
}
