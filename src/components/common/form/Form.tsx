import React from 'react'
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'
interface FormProps<TFormValues extends Record<string, unknown>> {
  children: JSX.Element | JSX.Element[]
  onSubmit: SubmitHandler<TFormValues>
  methods: UseFormReturn<TFormValues>
}

const Form = <TFormValues extends Record<string, unknown>>({
  children,
  onSubmit,
  methods,
}: FormProps<TFormValues>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      <div>
        <pre>
          <code>{JSON.stringify(methods.watch(), null, 2)}</code>
        </pre>
      </div>
    </FormProvider>
  )
}

export default Form
