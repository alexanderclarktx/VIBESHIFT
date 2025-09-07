import { VibeShiftState } from "docs"
import { AI, Lax, LaxDiv } from "vibeshift"

type ChatInputState = {}

const ai = AI()

export const ChatInput = () => {

  const chatInput = LaxDiv<ChatInputState>({
    state: {},
    style: {
      alignItems: "center",
      border: "2px solid black",
      borderRadius: "8px",
      bottom: "0%",
      width: "80%",
      height: "5%",
      wordBreak: "break-all",
      fontFamily: "Courier New",
      fontSize: "1em",
      textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
      pointerEvents: "auto",
      display: "flex",
      touchAction: "manipulation",
      paddingLeft: "4px",
      paddingRight: "4px"
    },
    update: (e: HTMLInputElement, lax: Lax<VibeShiftState>) => {
      const enter = lax.keysDown.get("enter")

      if (lax.state.justSent) {
        e.value = ""
        lax.state.justSent = false
        e.blur()
        return
      }

      if (enter && !enter.hold) {

        const { value } = e
        if (value) lax.state.messages.push({ from: "user", text: e.value })

        ai.prompt(e.value, (response: string) => {
          console.log("RESPONSE", response)
        })

        e.value = ""
      }

      lax.state.textBuffer = e.value
    }
  }, true)

  return chatInput
}

export const ChatSend = () => {

  let state: VibeShiftState | undefined = undefined

  const send = LaxDiv({
    state: {},
    style: {
      border: "2px solid green",
      borderRadius: "8px",
      bottom: "0%",
      width: "10%",
      right: "0%",
      height: "6%",
      minHeight: "6%",
      textAlign: "center",
      lineHeight: "30px",
      color: "green",
      fontSize: "20px"
    },
    update: (_, lax: Lax<VibeShiftState>) => {
      if (!state) state = lax.state
    },
    callbacks: {
      onPointerDown: async () => {
        if (!state) return

        if (state.textBuffer) {
          state.messages.push({ from: "user", text: state.textBuffer })
          state.justSent = true

          ai.prompt(state.textBuffer, (response: string) => {
            const parsed = JSON.parse(response) as { song: string, artist: string, soundCloudUrl: string}

            const embed = fetch("https://soundcloud.com/oembed", {
              method: "POST",
              body: ""
            })

            console.log(parsed)
            // console.log("RESPONSE", response)
          })
        }
      }
    }
  })

  send.e.textContent = "↑"

  return send
}
