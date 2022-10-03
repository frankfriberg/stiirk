import { Daily } from '@prisma/client'
import Button from 'components/common/Button'
import FormInput from 'components/common/form/FormInput'
import DailyWorkoutField from 'components/daily/DailyWorkoutField'
import useDailyForm from 'hooks/useDailyForm'
import React from 'react'
import { FormProvider } from 'react-hook-form'

export type DailyFormProps = {
  put?: boolean
  dailyFill?: Daily
}

const DailyForm = ({ put = false, dailyFill }: DailyFormProps) => {
  const { handleSubmit, methods } = useDailyForm({ put, dailyFill })
  const watchSlug = methods.watch('slug').toLowerCase().replace(/[^\w]/gi, '')
  const maxSetsWatch = methods.watch('maxSets')

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="prose">
        <div>
          <FormInput
            name="slug"
            label="Slug"
            subtitle={`http://www.stiirk.com/daily/${watchSlug}`}
          />
          <FormInput inline type="date" name="startDate" label="Start Date" />
          <FormInput inline type="number" name="maxReps" label="Max Reps" />
          <FormInput inline type="number" name="startReps" label="Start Reps" />
          <FormInput inline type="number" name="maxSets" label="Max Sets" />
          <div>
            <span className="ml-4 text-xs text-neutral-500">Rep Ratio</span>
            <div>
              {Array.from({ length: maxSetsWatch }, (v, i) => {
                return (
                  <FormInput
                    inline
                    type="number"
                    label={`Set #${i + 1}`}
                    key={`repratio-${i}`}
                    name={`repRatio[${i}]`}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <DailyWorkoutField />

        <Button type="submit" label="Create New Workout" />
      </form>
    </FormProvider>
  )
}

export default DailyForm
