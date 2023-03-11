import { Configuration, OpenAIApi } from 'openai'
import { ImagesResponse } from 'openai/dist/api'
import { useState, useEffect } from 'react'
import { State } from 'types'
import { NO_GENERATED_IMAGES } from 'utils/config'
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// convert this text into instagram post/ twitter thread with numbers and related emojis: 

export function useCreateImage(text: string) {
  const [state, setState] = useState<State<ImagesResponse>>({
    loading: false,
    error: undefined,
    data: undefined,
  })
  const [prevText, setPrevText] = useState('')

  useEffect(() => {
    const getImages = async () => {
      const response = await openai.createImage({
        prompt: text,
        n: NO_GENERATED_IMAGES,
        size: '512x512',
      })

      if (response.status === 200) {
        setState({
          loading: false,
          error: undefined,
          data: response.data,
        })
        setPrevText(text)
        return
      } else {
        console.log('Unable to get passport score')
        setState({
          loading: false,
          error: response.statusText,
          data: undefined,
        })
      }
    }

    if (text.length > 3 && text !== prevText) {
      console.log('prev : ' + prevText + ' | new : ' + text)
      setState({
        loading: true,
        error: undefined,
        data: undefined,
      })
      getImages()
    }
  }, [text])

  return state
}
