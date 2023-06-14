import {
  Box,
  Flex,
  Select,
  SimpleGrid,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Textarea,
  useToast,
  Spacer,
} from '@chakra-ui/react'
import { useCreatePost } from 'hooks/useCreatePost'
import { useState, useEffect } from 'react'
import { apiAtom, getPromptPlaceholder, POST_TYPES } from 'utils/config'
import { PostProps, PostSizes } from 'types'
import { FaCreativeCommonsSampling } from 'react-icons/fa'
import { GenerateOutput } from './GenerateOutput'
import { useAtomValue } from 'jotai'
import { CreditInfo } from './CreditInfo'
import ApiKeyInput from './ApiKeyInput'

interface Props {
  notMobile: boolean
}

export default function GenerateForm({ notMobile }: Props) {
  const apikey = useAtomValue(apiAtom)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Article')
  const [size, setSize] = useState(PostSizes.Long)
  const [subtitles, setSubtitles] = useState(3)
  const [tags, setTags] = useState(5)
  const [keywords, setKeywords] = useState(5)
  const [creativity, setCreativity] = useState(0.8)
  const [finalPost, setFinalPost] = useState<PostProps>()
  const { loading, data: postData, error } = useCreatePost(finalPost)
  const toast = useToast()

  function handleChangeType(_type: string) {
    setType(_type)
    switch (_type) {
      case 'White Paper':
      case 'Tutorial':
        setSize(PostSizes.Huge)
        setSubtitles(10)
        break
      case 'Instagram Post':
      case 'Facebook Post':
        setSize(PostSizes.Medium)
        setSubtitles(2)
        break
      default:
        setSize(PostSizes.Long)
        setSubtitles(5)
        break
    }
  }

  useEffect(() => {
    if (error && error.includes('code 400')) {
      toast({
        title: 'Out of credits',
        status: 'info',
        description: `There are not enough credits in the OpenAI api key, Please enter a new one or recharge your account on OpenAI`,
        duration: 6000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      return
    }

    if (error && error.includes('code 401')) {
      toast({
        title: 'Wrong API Key',
        status: 'warning',
        description: `Your OpenAI API Key is not correct, Please enter a correct one that begins with sk-... `,
        duration: 6000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      return
    }

    if (error && error.includes('code 429')) {
      toast({
        title: 'Limit reached for requests',
        status: 'warning',
        description: `You have hit your assigned rate limit for the API, Please recharge or change your OpenAI Api key`,
        duration: 6000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      return
    }

    if (error && error.includes('NoKey')) {
      toast({
        title: 'Open AI Api Key is Requiered',
        status: 'warning',
        description: `Please Enter your OpenAI API Key, You can get a free one on platform.openai.com if you don't already have one.`,
        duration: 6000,
        isClosable: true,
        variant: 'solid',
        position: 'top',
      })
      return
    }
  }, [error])

  async function createPost() {

    if (title.length < 20) {
      toast({
        title: 'Title is not good enough',
        description: 'Please describe your title in at least 20 characters',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return
    }
    
    const nextFinalPost: PostProps = {
      title: title,
      type: type,
      size: size,
      subtitles: subtitles,
      tags: tags,
      keywords: keywords,
      creativity: creativity,
      apikey: apikey
    }
    setFinalPost(nextFinalPost)
  }
  return (
    <Flex pt={2} flexDirection="column" alignItems={'center'} width={'100%'} gap={4}>
      <Flex flexDirection="column" gap={2} width="100%">
        <Box
          pl={3}
          borderRadius={10}
          width="max-content"
          backgroundColor={'blackAlpha.400'}
          display={'flex'}
          gap={3}
          justifyContent="center"
          alignSelf={'center'}
          alignItems={'center'}>
          <Text textAlign={'center'} fontWeight="bold">
            Enter Title To Generate A
          </Text>
          <Select
            fontWeight={'bold'}
            variant={'filled'}
            backgroundColor="blackAlpha.300"
            width={170}
            size="md"
            value={type}
            onChange={(e) => {
              handleChangeType(e.currentTarget.value)
            }}>
            {POST_TYPES.map((type) => (
              <option value={type}>{type}</option>
            ))}
          </Select>
        </Box>

        <Textarea
          mt={4}
          variant={'filled'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={getPromptPlaceholder(type)}
          size="lg"
          fontSize={notMobile ? 24 : 20}
          p={4}
          textAlign="center"
          rows={notMobile ? 1 : 2}
          width={'100%'}
        />
      </Flex>
      <Box py={7} width={'100%'}>
        <Slider
          min={0.1}
          max={1}
          value={creativity}
          step={0.01}
          aria-label="slider-ex-6"
          onChange={(val) => setCreativity(val)}>
          <SliderMark value={0.1} pt={3}>
            Logic
          </SliderMark>
          <SliderMark value={notMobile ? 0.94 : 0.82} pt={3}>
            Creativity
          </SliderMark>
          <SliderMark
            value={creativity}
            textAlign="center"
            bg="blue.400"
            color="white"
            mt="-44px"
            ml="-5"
            borderRadius={5}
            w="10">
            {Math.round(creativity * 100)}%
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb boxSize={6}>
            <Box
              color={
                creativity > 0.8
                  ? 'red.500'
                  : creativity > 0.65
                  ? 'orange.500'
                  : creativity > 0.4
                  ? 'yellow.500'
                  : creativity > 0.25
                  ? 'green.500'
                  : 'blue.500'
              }
              as={FaCreativeCommonsSampling}
            />
          </SliderThumb>
        </Slider>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} width={'100%'} gap={4}>
        <Flex direction={'column'} gap={2} width={'100%'}>
          <Text>{type} Size</Text>
          <Select
            variant={'filled'}
            backgroundColor={'blackAlpha.400'}
            value={size}
            size="lg"
            onChange={(e) => setSize(Number(e.currentTarget.value))}>
            <option value={PostSizes.Medium}>Medium</option>
            <option value={PostSizes.Long}>Long</option>
            <option value={PostSizes.Huge}>Huge</option>
          </Select>
        </Flex>
        <Flex direction={'column'} gap={2} width={'100%'}>
          <Text>No Of {type} Subtitles</Text>
          <Select
            variant={'filled'}
            backgroundColor={'blackAlpha.400'}
            value={subtitles}
            size="lg"
            onChange={(e) => setSubtitles(Number(e.currentTarget.value))}>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={10}>15</option>
            <option value={10}>20</option>
          </Select>
        </Flex>
        <Flex direction={'column'} gap={2} width={'100%'}>
          <Text>No Of {type} Tags,Keywords</Text>
          <Select
            variant={'filled'}
            backgroundColor={'blackAlpha.400'}
            value={tags}
            size="lg"
            onChange={(e) => {
              setTags(Number(e.target.value))
              setKeywords(Number(e.target.value))
            }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Select>
        </Flex>
      </SimpleGrid>
      <GenerateOutput
        postType={type}
        onGenerateClick={createPost}
        post={String(postData)}
        loading={loading}
      />
      <Flex gap={1} py={2} px={1} width="100%" maxWidth={800} direction="row" alignItems={'center'}>
        <CreditInfo />
        <Spacer />
        <ApiKeyInput />
      </Flex>
    </Flex>
  )
}
