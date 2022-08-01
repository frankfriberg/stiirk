import React, { InputHTMLAttributes } from 'react'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>,
    'id' | 'className'
  > {
  name: string
  register?: RegisterOptions
  label?: string
}

interface SelectInputProps extends InputProps {
  options: any[]
}

export const Input = ({ name, label, register = {}, ...rest }: InputProps) => {
  const methods = useFormContext()
  const { type } = rest

  if (type == 'number') {
    register.valueAsNumber = true
  }

  const GInput = () => (
    <input
      type={!type ? 'text' : type}
      {...methods.register(name, register)}
      {...rest}
    />
  )

  if (label)
    return (
      <label>
        {label}
        <GInput />
      </label>
    )
  return <GInput />
}

export const Select = ({ options, name, label, ...rest }: SelectInputProps) => {
  const methods = useFormContext()
  return (
    <select {...methods.register(name)} {...rest}>
      {options.map((value: any) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}
