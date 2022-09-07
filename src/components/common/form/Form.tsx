import React from 'react'
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form'

interface FormProps {
  children: JSX.Element | JSX.Element[]
  onSubmit: SubmitHandler<FieldValues>
}

export default function Form({ children, onSubmit }: FormProps) {
  const methods = useFormContext()

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
      <div>
        <pre>
          <code>{JSON.stringify(methods.watch(), null, 2)}</code>
        </pre>
      </div>
    </form>
  )
}
