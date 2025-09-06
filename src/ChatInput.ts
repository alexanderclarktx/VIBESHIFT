import { VibeShiftState } from "docs"
import { Lax, LaxDiv } from "vibeshift"

type ChatInputState = {}

export const ChatInput = () => {

  const chatInput = LaxDiv<ChatInputState>({
    state: {},
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
      fontSize: "1em",
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
      pointerEvents: "auto",
      display: "flex",
      whiteSpace: "pre-line",
      touchAction: "manipulation",
      flexDirection: "column"
    },
    update: (e: HTMLInputElement, lax: Lax<VibeShiftState>) => {
      const enter = lax.keysDown.get("enter")
      if (enter && !enter.hold) {

        const { value } = e
        if (value) lax.state.messages.push({ from: "user", text: e.value })
        e.value = ""

        // console.log("messages", lax.state.messages)
      }
    },
    callbacks: {
      onPointerDown: () => {
        console.log("POINTER DOWN")
      }
    }
  }, true)

  return chatInput
}

