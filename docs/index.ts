import { Lax, LaxDiv, ChatInput, ChatHistory, ChatSend } from "vibeshift"

export type Message = { from: string, text: string }

// @ts-expect-error
window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
  const element = document.getElementById('embed-iframe')

  const options = {
    wdit
      uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
  };

  const callback = (EmbedController: any) => { }

  IFrameAPI.createController(element, options, callback)
};

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

const spotify = LaxDiv({
  id: "embed-iframe",
  state: {},
  style: {
    width: "100%",
    height: "100px",
    border: "2px solid green",
    position: "relative"
  }
})

const wrapper = LaxDiv({
  state: {},
  style: {
    // alignItems: "flex-end",
    position: "absolute",
    maxWidth: "94%",
    width: "100%",
    height: "96%",
    left: "50%",
    top: "2%",
    right: "2%",
    transform: "translate(-50%)",
    flexDirection: "column",
    display: "flex",
    pointerEvents: "auto",
    touchAction: "manipulation"
  },
  children: [spotify, ChatHistory(), ChatInput(), ChatSend()]
  // children: [ChatHistory()]
})

app.append(wrapper)
