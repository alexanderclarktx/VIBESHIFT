import OpenAI from "openai"

const apiKey = (b64: string) => `sk-proj-${atob(b64)}`

type AI = {
  prompt: (prompt: string, callback: (response: string) => void) => Promise<void>
}

export const AI = (): AI => {
  const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey("UlktWU9id0F0eldiczBsRy1GRm8xeDZjaGlrWUhhSXNIZUFIYzgySHVuOEFELU5ndXQtdWYyeF91aVNTZkp6YmFLamM2YVlValhUM0JsYmtGSkwxZUV6dEpMQkZEMVU2TXhtNDkzdkstUUwwSkxkZHZWR040VkhaN1EyaUY0Y3MwdlJBZFYzdzlkNlFZaVB6d0pybzBNQ0hDLVVB")
  })

  return {
    prompt: async (prompt: string, callback) => {
      try {
        const completion = await client.chat.completions.create({
          model: "gpt-5-nano",
          messages: [
            { content: prompt, role: "user" }
          ]
        })
        if (completion?.choices[0].message.content) callback(completion.choices[0].message.content)
      } catch (e) {
        throw e
        console.warn("error prompting", e)
      }
    }
  }
}
