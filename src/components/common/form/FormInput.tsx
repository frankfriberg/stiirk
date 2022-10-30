import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'
import { FormErrorMessage } from 'components/common/FormErrorMessage'
import Input, { InputProps } from 'components/common/Input'
import { get } from 'lodash'
import React from 'react'
import { Path, RegisterOptions, useFormContext } from 'react-hook-form'

type FormInputProps<TFormValues extends Record<string, unknown>> = {
  name: Path<TFormValues>
  options?: RegisterOptions
  inline?: boolean
  subtitle?: string
} & Omit<InputProps, 'name'>

const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  options,
  inline = false,
  subtitle,
  className,
  ...props
}: FormInputProps<TFormValues>): React.ReactElement => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

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
          {...(register && register(name, options))}
        />
        {subtitle && (
          <span className="ml-4 text-xs text-neutral-500">{subtitle}</span>
        )}
      </label>
      <ErrorMessage
        errors={errors}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className="mt-1">{message}</FormErrorMessage>
        )}
      />
    </div>
  )
}

export default FormInput
