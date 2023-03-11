import { useState, useEffect } from 'react'
import { State } from 'types'
import axios from 'axios'
const axiosRetry = require('axios-retry')
const FormData = require('form-data')

export function useUploadToIpfs(url: string, text: string | undefined) {
  const [state, setState] = useState<State<string>>({
    loading: false,
    error: undefined,
    data: undefined,
  })
  const [prevURL, setPrevURL] = useState('')

  useEffect(() => {
    const uploadImage = async () => {
      const axiosInstance = axios.create()
      axiosRetry(axiosInstance, { retries: 5 })
      const data = new FormData()
      const response = await axiosInstance(url, {
        method: 'GET',
        responseType: 'blob',
      })
        .then(async (responseBlob) => {
          data.append('file', responseBlob.data)
          try {
            const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
                pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
                pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
                'Content-Type': 'multipart/form-data',
              },
            })
            setState({
              loading: false,
              error: undefined,
              data: res.data.IpfsHash,
            })

            setPrevURL(url)
            console.log(res)
          } catch (error) {
            setState({
              loading: false,
              error: String(error),
              data: undefined,
            })
          }
        })
        .catch((e) => {
          setState({
            loading: false,
            error: String(e),
            data: undefined,
          })
        })
    }

    if (url.length > 3 && url !== prevURL) {
      setState({
        loading: true,
        error: undefined,
        data: undefined,
      })
      uploadImage()
    }
  }, [url])

  return state
}
