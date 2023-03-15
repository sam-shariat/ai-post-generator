import React from 'react'
import { Flex, useColorModeValue, Spacer, Heading, useMediaQuery } from '@chakra-ui/react'
import { SITE_NAME, SITE_NAME_MOBILE } from 'utils/config'
import { LinkComponent } from './LinkComponent'
import { ThemeSwitcher } from './ThemeSwitcher'
import { ConnectKitButton } from 'connectkit'
import { GithubStarButton } from './GithubStarButton'

interface Props {
  className?: string
}

export function Header(props: Props) {
  const className = props.className ?? ''
  const [notMobile] = useMediaQuery('(min-width: 750px)')

  return (
    <Flex
      as="header"
      className={className}
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={5}
      py={2}
      mb={8}
      alignItems="center">
      <LinkComponent href="/">
        <Heading as="h1" size="md" fontWeight={'black'}>
          {notMobile ? SITE_NAME : SITE_NAME_MOBILE}
        </Heading>
      </LinkComponent>
      <Spacer />

      <Flex alignItems="center" gap={4}>
        <GithubStarButton label={'Star On Github'} />
        {notMobile && <ConnectKitButton showAvatar={notMobile} showBalance={notMobile} />}
        <ThemeSwitcher />
      </Flex>
    </Flex>
  )
}
