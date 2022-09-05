import feather from 'feather-icons'
import { forwardRef } from 'react'

interface IconProps {
  icon: string
  size?: 'small' | 'default' | 'big'
  stroke?: number
  className?: string
}

const sizes = {
  small: 15,
  default: 20,
  big: 25,
}

const Icon = forwardRef<HTMLElement, IconProps>(
  ({ icon, size = 'default', stroke = 1, className, ...props }, ref) => {
    const featherIcon = feather.icons[icon].toSvg({
      width: sizes[size],
      heigh: sizes[size],
      'stroke-width': stroke,
    })

    return (
      <i
        ref={ref}
        className={className}
        {...props}
        dangerouslySetInnerHTML={{ __html: featherIcon }}
      ></i>
    )
  }
)

Icon.displayName = 'Icon'

export default Icon
