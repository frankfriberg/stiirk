import React, { forwardRef, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

export type InputSize = 'medium' | 'large'
export type InputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'date'
  | 'checkbox'

export type InputProps = {
  name: string
  label: string
  type?: InputType
  className?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { name, label, type = 'text', className = '', placeholder, ...props },
    ref
  ) => {
    const typeOptions = type == 'number' ? 'numeric' : 'text'

    return (
      <input
        id={name}
        ref={ref}
        name={name}
        type={type}
        inputMode={typeOptions}
        aria-label={label}
        placeholder={placeholder}
        className={classNames(className, 'focus:outline-none')}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
