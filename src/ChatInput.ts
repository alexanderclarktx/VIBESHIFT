import { VibeShiftState } from "docs"
import { AI, Lax, LaxDiv } from "vibeshift"

type ChatInputState = {}

const ai = AI()

const callback = (state: VibeShiftState) => async (response: string) => {
  try {
    const parsed = JSON.parse(response) as { song: string, artist: string, soundCloudUrl: string }

    // const embed = await fetch("https://soundcloud.com/oembed", {
    let embed: undefined | Response

    try {
      embed = await fetch("https://soundcloud.com/oembed", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          format: "jsonp",
          url: parsed.soundCloudUrl
          // url: `https://soundcloud.com/${parsed.soundCloudUrl}`
        })
      })
      console.log(embed)
    } catch (e) {
      console.error("POST ERROR")
    }

    if (embed) {
      console.log("EMBED", embed)
    }

    console.log(parsed)
    // console.log("EMBED", embed, embed.body)

    state.messages.push({ from: "ai", text: `${parsed.artist} — ${parsed.song}` })
  }
  catch (e) {
    // wasn't json structured, just return the text
    console.error("JSON ISSUE", e)
    state.messages.push({ from: "ai", text: response })
    return
  }
}

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

        ai.prompt(e.value, callback(lax.state))

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

          ai.prompt(state.textBuffer, callback(state))
        }
      }
    }
  })

  send.e.textContent = "↑"

  return send
}
