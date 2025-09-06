import { LaxDiv } from "vibeshift"

type ChatInputState = {
  // text: string,
  // opened: boolean
}

export const ChatInput = () => {

  const chatInput = LaxDiv<ChatInputState>({
    state: {
      // text: "hello world",
      // opened: false
    },
    style: {
      alignItems: "center",
      border: "2px solid black",
      borderRadius: "8px",
      bottom: "0%",
      left: "50%",
      transform: "translate(-50%)",
      width: "100%",
      minHeight: "5%",
      wordBreak: "break-all",
      fontFamily: "Courier New",
      fontSize: "20px",
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
      pointerEvents: "auto",
      display: "flex",
      whiteSpace: "pre-line",
    },
    update: (_, lax) => {
      const enter = lax.keysDown.get("enter")
      if (enter && !enter.hold) {
        console.log(enter)
      }
    }
  }, true)

  return chatInput
}

