import { Message, VibeShiftState } from "docs"
import { Lax, LaxDiv } from "vibeshift"

const ChatBubble = (msg: Message) => {
  const div = LaxDiv({
    state: {},
    style: {
      fontSize: "2em",
      border: "2px solid blue",
      borderRadius: "8px",
      position: "relative"
      // display: "flex",
      // flex: 1
    }
  })

  div.e.textContent = msg.text

  return div
}

export const ChatHistory = () => {

  let count = 0

  const chatHistory = LaxDiv({
    state: {},
    style: {
      border: "2px solid green",
      borderRadius: "8px",
      width: "100%",
      height: "100%",
      display: "flex",
      flex: 0.9,
      left: "0px",
      position: "relative",
      alignSelf: "center",
      flexDirection: "column-reverse"
    },
    update: (_, lax: Lax<VibeShiftState>) => {
      const { messages } = lax.state
      if (count !== messages.length) {
        for (let i = count; i < messages.length; i++) {

          const bubble = ChatBubble(messages[i])
          chatHistory.e.appendChild(bubble.e)
          console.log("new", messages[i])
        }
      }

      count = messages.length
    }
  })

  return chatHistory
}
