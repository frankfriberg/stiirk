import feather from 'feather-icons'
import { forwardRef } from 'react'

interface IconProps {
  icon: string
  size?: 'small' | 'big'
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
      width: 20,
      heigh: 20,
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
