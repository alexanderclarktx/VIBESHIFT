import { app, VibeShiftState } from "docs"
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
      // left: "50%",
      // transform: "translate(-50%)",
      width: "84%",
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

      if (lax.state.justSent) {
        e.value = ""
        lax.state.justSent = false
        return
      }

      if (enter && !enter.hold) {

        const { value } = e
        if (value) lax.state.messages.push({ from: "user", text: e.value })
        e.value = ""
      }

      lax.state.textBuffer = e.value
    }
  }, true)

  return chatInput
}

export const ChatSend = () => {
  const send = LaxDiv({
    state: {},
    style: {
      border: "2px solid green",
      borderRadius: "8px",
      bottom: "0%",
      width: "10%",
      right: "0%",
      minHeight: "5.5%"
    },
    callbacks: {
      onPointerDown: () => {
        const { textBuffer } = app.state

        if (textBuffer) {
          app.state.messages.push({ from: "user", text: textBuffer })
          app.state.justSent = true
        }
      }
    }
  })

  return send
}
