import OpenAI from "openai"

const apiKey = (b64: string) => `sk-admin-${atob(b64)}`

type AI = {
  prompt: (prompt: string, callback: (response: string) => void) => Promise<void>
}

export const AI = (): AI => {
  const client = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: apiKey("SkNRZnhVLUtQWXU4WExVNkREMGkydkJhdHFTOC1hZTRGQW1NSGhYVW1JbWdkZVptcGwwcmpiMFFNTVQzQmxia0ZKelhLZGtISHE2ZldrdEdmRDh1T3BFOUxiQ2RySGdHVS1NNUt5U0lIREFfa19ZNUJiNUNMakpRTnBvQQ==")
  })

  return {
    prompt: async (prompt: string, callback) => {
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
