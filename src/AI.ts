import OpenAI from "openai"

const apiKey = "sk-" + "proj-" + ""

type AI = {
  prompt: (prompt: string, callback: (response: string) => void) => Promise<void>
}

export const AI = (): AI => {
  const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey
  })

  return {
    prompt: async (prompt: string, callback) => {
      console.log("prompting")
      const completion = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          { content: prompt, role: "user" }
        ]
      })

      if (completion?.choices[0].message.content) callback(completion.choices[0].message.content)
    }
  }
}
