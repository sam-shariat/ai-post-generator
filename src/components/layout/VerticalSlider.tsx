import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  words: string[]
  notMobile: boolean
}

export function VerticalSlider({words,notMobile}: Props) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex === words.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(intervalId)
  }, [words])

  return (
    <Box height={"50px"} overflow="hidden" display={"block"} px={1} width={words[currentWordIndex].length * (notMobile ? 20 : 14)}>
      {words.map((word, index) => (
        <Box
          key={index}
          transform={`translateY(-${currentWordIndex * 100}%)`}
          transition="transform 0.5s"
          lineHeight={"50px"}
          width={words[index].length * (notMobile ? 20 : 14)}
          display="block"
          overflow={"hidden"}
          textAlign="center">
          {word}
        </Box>
      ))}
    </Box>
  )
}
