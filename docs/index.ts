import { Lax, LaxDiv, ChatInput, ChatHistory, ChatSend } from "vibeshift"

export type Message = { from: string, text: string }

// @ts-expect-error
window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  const element = document.getElementById('embed-iframe')

  const options = {
    width: "100%",
    height: "100px",
    uri: "spotify:track:15uooxhgintp3YZq649IEr"
  }

  IFrameAPI.createController(element, options, () => {})
}

export type VibeShiftState = {
  messages: Message[]
  textBuffer: string
  justSent: boolean // TODO tech debt
}

// TODO shouldn't be global
const app = Lax<VibeShiftState>({
  messages: [],
  textBuffer: "",
  justSent: false
})

const music = LaxDiv({
  // id: "embed-iframe",
  state: {},
  style: {
    width: "100%",
    height: "150px",
    border: "2px solid green",
    position: "relative",
    pointerEvents: "auto",
    touchAction: "auto",
    zIndex: -1
  }
})

const wrapper = LaxDiv({
  state: {},
  style: {
    // alignItems: "flex-end",
    position: "absolute",
    maxWidth: "94%",
    width: "100%",
    height: "calc(96% - 104px)",
    left: "50%",
    top: "110px",
    right: "2%",
    transform: "translate(-50%)",
    flexDirection: "column",
    display: "flex",
    pointerEvents: "auto",
    touchAction: "manipulation"
  },
  children: [ChatHistory(), ChatInput(), ChatSend()]
})

app.append(wrapper)
