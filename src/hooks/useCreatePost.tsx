import { Configuration, OpenAIApi } from 'openai'
import { useState, useEffect } from 'react'
import { PostProps, State } from 'types'
import { getPrompt } from 'utils/config'
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// convert this text into instagram post/ twitter thread with numbers and related emojis:

export function useCreatePost(post: PostProps | undefined) {
  const [state, setState] = useState<State<string>>({
    loading: false,
    error: undefined,
    data: undefined,
  })
  const [prevPost, setPrevPost] = useState<PostProps>()

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: getPrompt(post),
          temperature: post?.creativity,
          max_tokens: post ? post?.size * 7 : 1024,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          stop: [String(post?.type), 'tags', 'keywords'],
        })

        setState({
          loading: false,
          error: undefined,
          data: response.data.choices[0].text,
        })
        setPrevPost(post)
      } catch (e) {
        console.log('Unable to generate post',String(e))
        setState({
          loading: false,
          error: String(e),
          data: undefined,
        })
      }
    }

    if (post !== prevPost) {
      console.log('prev : ', prevPost, ' | new : ', post)
      setState({
        loading: true,
        error: undefined,
        data: undefined,
      })
      getPost()
    }
  }, [post])
  return state
}
