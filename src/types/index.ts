export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export enum PostSizes {
  Medium = 300, 
  Long = 400, 
  Huge = 500, 
}

export interface PostProps {
  title: string;
  type: string;
  size: PostSizes;
  subtitles: number;
  tags: number;
  keywords: number;
  creativity: number;
}

export type Option = {
  value: string
  label: string
}


export type Category = {
  value: string
  label: string
}