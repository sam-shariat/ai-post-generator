export function GetNetworkColor(chain?: string) {
  if (chain === 'arbitrum') return 'blue'
  if (chain === 'optimism') return 'red'
  if (chain === 'matic') return 'purple'
  if (chain === 'goerli') return 'gray'
  if (chain === 'polygon mumbai') return 'gray'
  if (chain === 'sepolia') return 'gray'

  return 'grey'
}
