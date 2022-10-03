import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import classNames from 'classnames'
import { Icon as IconType } from 'react-feather'
import Icon from './Icon'

interface ButtonProps {
  label?: string
  icon?: IconType
  shape?: 'circle' | 'rounded'
  style?: 'white' | 'black' | 'red' | 'blue' | 'green'
  size?: 'small' | 'normal' | 'big'
  className?: string
  type?: 'button' | 'submit'
  callback?(): void
}

const iconStyles = {
  white: '',
  black: '',
  red: 'stroke-red-900',
  green: 'stroke-green-700',
  blue: 'stroke-blue-800',
}

const styles = {
  circle: 'rounded-full',
  rounded: 'rounded-md',
  white: 'bg-white text-black border-gray-200',
  black: 'bg-slate-700 text-white border-black',
  red: 'bg-red-400 text-red-900 border-red-900',
  green: 'bg-green-300 text-green-700 border-green-700',
  blue: 'bg-blue-300 text-blue-800 border-blue-800',
  small: {
    size: 12,
    stroke: 2,
    styling: 'p-1 text-xs font-bold',
  },
  normal: {
    size: 20,
    stroke: 2,
    styling: 'py-2 px-4',
  },
  big: {
    size: 25,
    stroke: 2,
    styling: 'py-3 px-5',
  },
}

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
  label = '',
  icon: FeatherIcon,
  shape = 'circle',
  style = 'white',
  size = 'normal',
  className,
  type = 'button',
  callback,
}: ButtonProps): React.ReactElement => {
  return (
    <button
      type={type}
      onClick={callback}
      className={classNames(
        className,
        styles[shape],
        styles[style],
        styles[size].styling,
        'border flex items-center'
      )}
    >
      {FeatherIcon && <Icon className={iconStyles[style]} icon={FeatherIcon} />}
      {label}
    </button>
  )
}

export default forwardRef(Button)
