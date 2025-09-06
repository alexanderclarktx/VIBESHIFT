import { Lax, LaxDiv } from "vibeshift"

type VibeShiftState = {

}

const lax = Lax<VibeShiftState>({

})


type TextInputState = {
  text: string,
  opened: boolean
}

const textInput = LaxDiv<TextInputState>({
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
    textInput.e.textContent = textInput.state.text


  },
  callbacks: {
    onPointerDown: () => {
      textInput.state.opened = true
    },
    
  }
}, true)

lax.append(textInput)
