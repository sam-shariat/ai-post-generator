import {
  Button,
  Box,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
  useClipboard,
} from '@chakra-ui/react'

import { FaEnvelope, FaShareAlt, FaTimes, FaTwitter } from 'react-icons/fa'
import { TwitterShareButton } from 'react-share'
import EmailShareButton from 'react-share/lib/EmailShareButton'
import { SITE_URL } from 'utils/config'
import { MarkdownEditor } from './MarkdownEditor'
import { ThinkingLoader } from './ThinkingLoader'

interface Props {
  post: string
  postType: string
  onGenerateClick: Function
  loading: boolean
}
export function GenerateOutput({ post, postType, onGenerateClick, loading }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onCopy, hasCopied, setValue, value } = useClipboard(post)

  function shareIt() {
    navigator.share({
      title: postType,
      text: value,
      url: SITE_URL,
    })
  }

  return (
    <>
      <Button
        colorScheme="blue"
        size="lg"
        bgColor="blue.400"
        width={'100%'}
        mt={2}
        whiteSpace={'normal'}
        onClick={async () => {
          let isValid = await onGenerateClick()
          isValid !== null && onOpen()
        }}>
        GENERATE
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="outside" size={'2xl'}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader gap={2} display={'flex'}>
            {post && !loading ? `${postType} Generated` : `Generating ${postType}`} <Spacer />
            <Button isDisabled={loading} onClick={onCopy}>
              {hasCopied ? 'Copied!' : 'Copy'}
            </Button>
            <Button onClick={onClose}>
              <FaTimes />
            </Button>
          </ModalHeader>

          <ModalBody display={'flex'} flexDirection="column" gap={2}>
            {loading && (
              <Flex
                px={4}
                py={8}
                direction="column"
                width={'100%'}
                height={'100%'}
                justifyContent="center"
                alignItems="center">
                <Box width={100} height={100}>
                  <ThinkingLoader />
                </Box>
                <Text p={2} fontWeight="black" fontSize={20}>
                  Thinking...
                </Text>
                <Text p={2} fontWeight="black" fontSize={20}>
                  Please wait a few seconds...
                </Text>
              </Flex>
            )}

            {post && !loading && <MarkdownEditor initValue={post} setClipboard={setValue} />}
          </ModalBody>
          <ModalFooter gap={2} justifyContent={'left'}>
            <TwitterShareButton
              disabled={loading}
              title={value}
              children={
                <Button disabled={loading} px={1} borderRadius={'50px'} colorScheme="blue">
                  <FaTwitter />
                </Button>
              }
              url={SITE_URL}
            />
            <EmailShareButton
              disabled={loading}
              subject={postType}
              body={value}
              children={
                <Button disabled={loading} px={1} borderRadius={'50px'} colorScheme="blue">
                  <FaEnvelope />
                </Button>
              }
              url={SITE_URL}
            />
            <Button
              px={1}
              borderRadius={'50px'}
              disabled={loading}
              colorScheme="blue"
              onClick={shareIt}>
              <FaShareAlt />
            </Button>
            <Spacer />
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
