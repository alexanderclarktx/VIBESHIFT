import OpenAI from "openai"

const apiKey = "sk-" + "proj-" + "6t_xXGEdWcivKWrlDt9AcVXpEi2RUgokv5E5Hs2UTQSBAXQSIoNXmieVCv8WjLvmsSLB51lcAfT3BlbkFJYB5y9C0iFA4v5b65ovl_B-1_q21Wi0yS2OkqdZKbjTOl29JIqw_" + "I6QiOpkWuzn4-blxkJnxMwA"

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
