import OpenAI from "openai"

type AI = {
  prompt: (prompt: string, callback: (response: string) => void) => Promise<void>
}

export const AI = (): AI => {
  const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: "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"
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
