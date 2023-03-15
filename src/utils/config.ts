import { ThemingProps } from '@chakra-ui/react'
import { goerli, sepolia, polygon, optimism, arbitrum, polygonMumbai } from '@wagmi/chains'
import { Category, Option, PostProps } from 'types'

export const SITE_NAME = 'AI Content Generator'
export const SITE_NAME_MOBILE = 'AI Content'
export const COPYRIGHT = 'Developed by ❤️'
export const SITE_DESCRIPTION =
  'Create captivating content with the AI Post Generator App! This app will generate unique, high quality posts and content to help you engage your audience. It uses advanced AI technology to create content that is informative and entertaining while taking into account your target audience. With just a few clicks, you’ll have the perfect post that will keep your readers interested.'
export const SITE_URL = 'https://ai-post-generator.vercel.app'
export const GITHUB_URL = 'https://github.com/sam-shariat/ai-post-generator';
export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = {
  initialColorMode: THEME_INITIAL_COLOR,
}

export const SOCIAL_TWITTER = 'SamyWalters'
export const SOCIAL_GITHUB = 'sam-shariat'

export const ETH_CHAINS = [polygon, arbitrum, optimism, goerli, sepolia, polygonMumbai]

interface OPENSEA_ASSET_URLs {
  [index: number]: string
}

export const OPENSEA_ASSET_URL: OPENSEA_ASSET_URLs = {
  5: 'https://testnets.opensea.io/assets/goerli',
  80001: 'https://testnets.opensea.io/assets/mumbai',
  137: 'https://opensea.io/assets/matic',
  42161: 'https://opensea.io/assets/arbitrum',
  10: 'https://opensea.io/assets/optimism',
  11155111: 'https://testnets.opensea.io/assets/sepolia',
}

export const NO_GENERATED_IMAGES = 2

export function getPrompt(post: PostProps | undefined) {
  let basePrompt = `You are an all-knowing being that helps generate ${post?.type}s. you respond helpful, creative, clever, and very friendly. you take different variables and output a perfect ${post?.type} according to the variables.`
  switch (post?.type) {
    case 'Twitter Thread':
      return (
        basePrompt +
        `generated ${post.type} should have a few related tags and emojis. each tweet in the thread should be numbered. tags should be on the last tweet and tweets must look very professional and engaging \nTITLE: ${post?.title}\nNUMBER OF TWEETS: ${post?.subtitles}\nTAGS: ${post?.tags}\nKEYWORDS: ${post?.keywords}\n`
      )
    case 'Cover Letter':
      return (
        basePrompt +
        `generated ${post.type} should be formal and official. please leave some space for my resume. cover letter output should be in html. \ncover letter is for ${post?.title}`
      )

    case 'Instagram Post':
    case 'Facebook Post':
      return (
        basePrompt +
        `generated ${post.type} should have related emojis.\nTITLE: ${post?.title}\nSUBTITLES: ${post?.subtitles}\nTAGS: ${post?.tags}\nKEYWORDS: ${post?.keywords}\n`
      )
    default:
      return (
        basePrompt +
        `First you create a detailed table of content from this ${post?.type} title : ${post?.title} \nthen you take that table of content and generate a full detailed ${post?.type} out of it and also consider the variables below. only show the content of the post , tags and summary in the output. content of the post should be in html\nSUBTITLES: ${post?.subtitles}\nTAGS: ${post?.tags}\nKEYWORDS: ${post?.keywords}\nSUMMARY: maximum of 50 characters\ncontent of the post length: ${post ? post?.size * 10 : 3000} characters`
      )
  }
}

export function getPromptPlaceholder(postType:string) {
  switch (postType) {
    case 'White Paper':
      return 'decentralized game center with mint capabilities on different blockchains'
    case 'Tutorial':
      return 'Install Linux on Windows'
    case 'Twitter Thread':
      return 'Ways to help save our soil'
    case 'Cover Letter':
      return 'Front End Developer with Next.js and Web3 Skills At Polygon'
    case 'Instagram Post':
    case 'Facebook Post':
      return 'Vegan Potato Bread Recipe'
    default:
      return 'How AI and Blockchain is changing the world'
  }
}

export const POST_TYPES = [
  'Article',
  'Twitter Thread',
  'Blog Post',
  'Essay',
  'Cover Letter',
  'White Paper',
  'Instagram Post',
  'Facebook Post',
  'Tutorial',
]

export const STYLE_OPTIONS: Option[] = [
  { value: 'realistic', label: 'Realistic' },
  { value: 'digital art', label: 'Digital Art' },
  { value: '3d render', label: '3D Render' },
  { value: 'pixel art', label: 'Pixel Art' },
  { value: 'black and white', label: 'Black and White' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'surreal', label: 'Surreal' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'pop-art', label: 'Pop Art' },
  { value: 'impressionist', label: 'Impressionist' },
  { value: 'expressionist', label: 'Expressionist' },
  { value: 'cubist', label: 'Cubist' },
  { value: 'futuristic', label: 'Futuristic' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'gothic', label: 'Gothic' },
  { value: 'steampunk', label: 'Steampunk' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'naturalistic', label: 'Naturalistic' },
  { value: 'whimsical', label: 'Whimsical' },
  { value: 'geometric', label: 'Geometric' },
  { value: 'retro', label: 'Retro' },
]

export const CATEGORIES: Category[] = [
  { value: 'TECH', label: 'Technology' },
  { value: 'LIFESTYLE', label: 'Lifestyle' },
  { value: 'TRAVEL', label: 'Travel' },
  { value: 'FOOD', label: 'Food' },
  { value: 'HEALTH_FITNESS', label: 'Health and Fitness' },
  { value: 'BUSINESS_FINANCE', label: 'Business and Finance' },
  { value: 'EDUCATION', label: 'Education' },
  { value: 'ENTERTAINMENT', label: 'Entertainment' },
  { value: 'FASHION', label: 'Fashion' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'POLITICS', label: 'Politics' },
  { value: 'SCIENCE', label: 'Science' },
  { value: 'ART_CULTURE', label: 'Art and Culture' },
  { value: 'PERSONAL_DEV', label: 'Personal Development' },
  { value: 'SOCIAL_MEDIA', label: 'Social Media' },
  { value: 'MARKETING', label: 'Marketing' },
  { value: 'HISTORY', label: 'History' },
  { value: 'ENVIRONMENT', label: 'Environment' },
  { value: 'DIY', label: 'DIY' },
  { value: 'PARENTING', label: 'Parenting' },
  { value: 'BEAUTY', label: 'Beauty' },
  { value: 'PHOTOGRAPHY', label: 'Photography' },
  { value: 'GAMING', label: 'Gaming' },
  { value: 'SPIRITUAL', label: 'Spiritual' },
  { value: 'HUMOR', label: 'Humor' },
]

export const SERVER_SESSION_SETTINGS = {
  cookieName: SITE_NAME,
  password:
    process.env.SESSION_PASSWORD ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}
