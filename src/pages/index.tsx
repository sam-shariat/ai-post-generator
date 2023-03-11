import {
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import GenerateForm from 'components/layout/GenerateForm'
import { Head } from 'components/layout/Head'
import { VerticalSlider } from 'components/layout/VerticalSlider'
import { POST_TYPES } from 'utils/config'

export default function Home() {
  const [notMobile] = useMediaQuery('(min-width: 750px)')
  return (
    <>
      <Head />
      <main>
          <Flex flexDirection="column" alignItems={'center'} width={'100%'}>
            <Heading fontSize={notMobile ? 34 : 24} pb={3} as="h2" textAlign="center" fontWeight={"black"} display="flex" alignItems={"center"}>
              Generate <VerticalSlider notMobile={notMobile} words={POST_TYPES} />
            </Heading>
          </Flex>
          <GenerateForm notMobile={notMobile} />
      </main>
    </>
  )
}
