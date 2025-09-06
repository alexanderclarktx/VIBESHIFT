import { LaxDiv } from "vibeshift"

type ChatInputState = {
  text: string,
  opened: boolean
}

export const ChatInput = () => {

  const chatInput = LaxDiv<ChatInputState>({
    state: {
      text: "hello world",
      opened: false
    },
    style: {
      alignItems: "center",
      border: "2px solid black",
      borderRadius: "8px",
      bottom: "100px",
      left: "50%",
      transform: "translate(-50%)",
      width: "90%",
      minHeight: "5%",
      wordBreak: "break-all",
      paddingLeft: "10px",
      paddingRight: "10px",
      fontFamily: "Courier New",
      fontSize: "20px",
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
      pointerEvents: "auto",
      display: "flex",
    },
    update: () => {
      chatInput.e.textContent = chatInput.state.text


    },
    callbacks: {
      onPointerDown: () => {
        chatInput.state.opened = true
      },

    }
  }, true)

  return chatInput
}

