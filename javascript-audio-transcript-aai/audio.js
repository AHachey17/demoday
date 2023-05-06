const axios = require("axios")
const audioURL = "https://bit.ly/3yxKEIY"
const APIKey = "883dc58cc16342eba5662f6df39f6c65"
const refreshInterval = 5000

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
  },
})

const getTranscript = async () => {
  // Sends the audio file to AssemblyAI for transcription
  const response = await assembly.post("/transcript", {
    audio_url: audioURL,
  })

  // Interval for checking transcript completion
  const checkCompletionInterval = setInterval(async () => {
    const transcript = await assembly.get(`/transcript/${response.data.id}`)
    const transcriptStatus = transcript.data.status

    if (transcriptStatus !== "completed") {
      console.log(`Transcript Status: ${transcriptStatus}`)
    } else if (transcriptStatus === "completed") {
      console.log("\nTranscription completed!\n")
      let transcriptText = transcript.data.text
      console.log(`Your transcribed text:\n\n${transcriptText}`)
      clearInterval(checkCompletionInterval)
    }
  }, refreshInterval)
}

getTranscript()
