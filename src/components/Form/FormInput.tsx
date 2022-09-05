import React from 'react'
import classNames from 'classnames'

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  Path,
  useFormContext,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { FormErrorMessage } from './FormErrorMessage'
import { Input, InputProps } from '../Atoms/Input'
import { get } from 'lodash'

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>
  inline?: boolean
  subtitle?: string
  rules?: RegisterOptions
  errors?: Partial<DeepMap<TFormValues, FieldError>>
} & Omit<InputProps, 'name'>

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  inline = false,
  subtitle,
  rules,
  className,
  ...props
}: FormInputProps<TFormValues>): React.ReactElement => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  const numberRule = props.type == 'number' && { valueAsNumber: true }

  const inputClasses = 'flex items-center justify-between'
  const errorClasses =
    'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600'

  return (
    <div className={classNames(className, 'mb-4')} aria-live="polite">
      <label className={classNames(inline && inputClasses)} htmlFor={name}>
        <span
          className={classNames(
            inline ? 'absolute' : 'text-sm',
            'ml-4 text-neutral-500'
          )}
        >
          {props.label}
        </span>

        <Input
          aria-invalid={hasError}
          className={classNames(
            hasError && errorClasses,
            inline && 'text-right',
            props.type == 'date' && 'bg-white date-reset',
            'appearance-none w-full px-4 py-2 rounded-md border focus:ring-1 focus:border-black ring-black'
          )}
          {...props}
          {...(register && register(name, { ...rules, ...numberRule }))}
        />
        {subtitle && (
          <span className="ml-4 text-xs text-neutral-500">{subtitle}</span>
        )}
      </label>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  )
}
