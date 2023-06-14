import { InfoIcon } from '@chakra-ui/icons'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Button,
  Text
} from '@chakra-ui/react'

export function CreditInfo() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={'ghost'} px={2} mx={1} gap={2} minW={108}>
        API key<InfoIcon />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent border={'none'} bg={'blackAlpha.200'} backdropFilter="blur(10px)">
          <PopoverHeader textAlign={'center'} fontWeight={'semibold'} p={4}>
            OpenAI API key
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody
            width={'100%'}
            p={6}
            display={'flex'}
            flexDirection={'column'}
            alignItems="center"
            gap={4}>
            <Text>
              You can get A free Open AI API key in the link below 
            </Text>
            <Button>
            <a target='_blank' href="https://platform.openai.com/account/api-keys"><strong>platform.openai.com</strong></a>
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
