import { Icon } from 'react-feather'
import { forwardRef, ForwardRefRenderFunction } from 'react'

interface IconProps {
  icon: Icon
  size?: 'small' | 'default' | 'big'
  stroke?: number
  className?: string
}

const sizes = {
  small: 15,
  default: 20,
  big: 25,
}

const Icon: ForwardRefRenderFunction<HTMLElement, IconProps> = (
  { icon: FeatherIcon, size = 'default', stroke = 1, className, ...props },
  ref
) => {
  return (
    <i ref={ref} className={className} {...props}>
      <FeatherIcon size={sizes[size]} strokeWidth={stroke} />
    </i>
  )
}

export default forwardRef(Icon)
