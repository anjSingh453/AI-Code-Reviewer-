const Groq = require("groq-sdk");

const groq = new Groq({apiKey : process.env.GROQ_API_KEY});

async function getResponse(prompt){
    const chatCompletion = await groq.chat.completions.create(
        {model:"deepseek-r1-distill-llama-70b",
         messages:[
            {role:"system",
            content :prompt
        }
         ]

        }

    )
    return chatCompletion.choices[0].message.content;
}

module.exports = getResponse

