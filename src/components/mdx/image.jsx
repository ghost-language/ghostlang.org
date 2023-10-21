import { default as NextImage } from 'next/image'

export function Image({ ...props }) {
  return <NextImage {...props} />
}