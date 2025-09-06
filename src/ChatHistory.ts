import { Message, VibeShiftState } from "docs"
import { Lax, LaxDiv } from "vibeshift"

const UserChatBubble = (msg: Message) => {
  const div = LaxDiv({
    state: {},
    style: {
      fontSize: "1em",
      border: "2px solid red",
      backgroundColor: "rgba(255, 200, 200, 0.5)",
      borderRadius: "8px",
      position: "relative",
      maxWidth: "80%",
      display: "flex",
      // left: "18%",
      wordBreak: "break-word",
      // right: "-2%",
      marginRight: "2%",
      marginTop: "2%",
      marginLeft: "auto",
      flexDirection: "row-reverse",
      flexShrink: 2,
      paddingTop: "2px",
      paddingBottom: "2px",
      paddingLeft: "4px",
      paddingRight: "4px"
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
      flexDirection: "column",
      overflowY: "scroll"
    },
    update: (_, lax: Lax<VibeShiftState>) => {
      const { messages } = lax.state
      if (count !== messages.length) {
        for (let i = count; i < messages.length; i++) {

          const bubble = UserChatBubble(messages[i])
          chatHistory.e.appendChild(bubble.e)
          console.log("new", messages[i])
        }
      }

      count = messages.length
    }
  })

  return chatHistory
}
