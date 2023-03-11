import { useColorMode } from "@chakra-ui/react"
import * as React from "react"

export function ThinkingLoader() {
    const { colorMode } = useColorMode();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      xmlSpace="preserve"
    >
      <circle
        fill="none"
        stroke={colorMode === 'light' ? "var(--chakra-colors-gray-800)" : "#fff"}
        strokeWidth={4}
        strokeMiterlimit={10}
        cx={50}
        cy={50}
        r={48}
      />
      <path
        fill="none"
        strokeLinecap="round"
        stroke={colorMode === 'light' ? "var(--chakra-colors-gray-800)" : "#fff"}
        strokeWidth={4}
        strokeMiterlimit={10}
        d="M50 50L85 50.5"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
      <path
        fill="none"
        strokeLinecap="round"
        stroke={colorMode === 'light' ? "var(--chakra-colors-gray-800)" : "#fff"}
        strokeWidth={4}
        strokeMiterlimit={10}
        d="M50 50L49.5 74"
      >
        <animateTransform
          attributeName="transform"
          dur="15s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}

