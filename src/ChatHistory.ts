import { Message, VibeShiftState } from "docs"
import { Lax, LaxDiv } from "vibeshift"

const UserChatBubble = (msg: Message) => {
  const user = msg.from === "user"

  const div = LaxDiv({
    state: {},
    style: {
      fontSize: "1em",
      border: "2px solid black",
      borderRadius: "8px",
      position: "relative",
      maxWidth: "80%",
      display: "flex",
      // left: "18%",
      wordBreak: "break-word",
      // right: "-2%",
      // marginLeft: user ? "0px" : "2%",
      marginRight: user ? "2%" : "0px",
      marginTop: "2%",
      marginLeft: user ? "auto" : "2%",
      flexDirection: msg.from === "user" ? "row-reverse" : "row",
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
      border: "2px solid black",
      borderRadius: "8px",
      width: "99%",
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
        }
      }

      count = messages.length
    }
  })

  return chatHistory
}
