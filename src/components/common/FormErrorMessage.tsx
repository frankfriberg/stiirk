import React from 'react'
import classNames from 'classnames'

export type FormErrorMessageProps = {
  children: React.ReactNode
  className?: string
}

export const FormErrorMessage = ({
  children,
  className,
}: FormErrorMessageProps) => (
  <p
    className={classNames(
      'font-serif text-sm text-left block text-red-600',
      className
    )}
  >
    {children}
  </p>
)
