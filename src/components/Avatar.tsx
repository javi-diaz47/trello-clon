import { minidenticon } from 'minidenticons'
import Image from 'next/image'
import { useMemo } from 'react'

interface Avatar {
  username: string
  saturation?: number
  lightness?: number
  className?: string
  width: number
  height: number
}

export function Avatar({
  username,
  saturation = 95,
  lightness = 45,
  width,
  height,
  className,
}: Avatar) {
  const svgURI = useMemo(
    () =>
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  )
  return (
    <Image
      src={svgURI}
      className={className}
      width={width}
      height={height}
      alt={username}
    />
  )
}
