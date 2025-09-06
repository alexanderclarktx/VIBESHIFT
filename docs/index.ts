import { Lax, LaxDiv, LaxElement } from "vibeshift"

type VibeShiftState = {

}

const lax = Lax<VibeShiftState>({
  
})

const textInput = LaxDiv<{text: string}>({
  state: {
    text: "hello world"
  },
  style: {
    border: "2px solid black",
    borderRadius: "8px",
    bottom: "100px",
    left: "50%",
    transform: "translate(-50%)",
    width: "90%",
    height: "5%",
    wordBreak: "break-all"
  },
  update: (_, state) => {
    textInput.e.textContent = textInput.state.text
    console.log(textInput.state)
  }
})

lax.append(textInput)
