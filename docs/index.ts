import { ChatInput } from "src/ChatInput"
import { Lax, LaxDiv } from "vibeshift"

type Chat = { from: string, text: string }

type VibeShiftState = {
  messages: Chat[]  
}

const lax = Lax<VibeShiftState>({
  messages: []
})

lax.append(ChatInput())
