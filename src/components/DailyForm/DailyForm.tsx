import { Input } from 'components/Form/Input'
import { HydratedDocument } from 'mongoose'
import { FormProvider } from 'react-hook-form'
import { Daily } from 'types/daily.types'
import DailyWorkoutField from './DailyWorkoutField'
import useDailyForm from './useDailyForm'

export type DailyFormProps = {
  method: 'POST' | 'PUT'
  dailyFill?: HydratedDocument<Daily>
}

const DailyForm = ({ method, dailyFill }: DailyFormProps) => {
  const { handleSubmit, methods } = useDailyForm({ method, dailyFill })

  const values = methods.watch()

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <section>
          <Input name="slug" label="Slug" />
          <Input type="date" name="startDate" label="Start Date" />

          <fieldset>
            <legend>
              <h2>Settings</h2>
            </legend>
            <Input type="number" name="settings.maxReps" label="Max Reps" />
            <Input type="number" name="settings.startReps" label="Start Reps" />
            <Input type="number" name="settings.maxSets" label="Max Sets" />
            <h3>Rep Ratio</h3>
            <p>How reps will be divided for each set.</p>
            {Array.from(
              { length: methods.watch('settings.maxSets') },
              (v, i) => {
                return (
                  <Input
                    type="number"
                    key={`repratio-${i}`}
                    name={`settings.repRatio[${i}]`}
                  />
                )
              }
            )}
          </fieldset>
        </section>

        <DailyWorkoutField />

        <pre>{JSON.stringify(values, null, 2)}</pre>

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

export default DailyForm
