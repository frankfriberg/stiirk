import Button from 'components/common/Button'
import useDailyWorkout from 'src/hooks/useDailyWorkoutField'
import FormInput from 'components/common/form/FormInput'
import DailyExerciseField from 'components/daily/DailyExerciseField'
import { Plus, Trash } from 'react-feather'

const DailyWorkoutField = () => {
  const { watch, fields, addNewWorkout, removeWorkout } = useDailyWorkout()

  const workoutTitle = (field: string): string =>
    watch(field) !== '' ? watch(field) : 'New Workout'

  return (
    <section>
      <h2 className="ml-4">Workouts</h2>
      {fields.map((field, index) => (
        <div key={field.id}>
          <div className="flex items-center justify-between mt-4">
            <h3 className="mt-3 ml-4">
              #{index + 1} {workoutTitle(`workouts.${index}.name`)}
            </h3>
            <Button
              size="small"
              icon={Trash}
              style="red"
              callback={removeWorkout(index)}
            />
          </div>
          <FormInput
            label="Name"
            name={`workouts.${index}.name`}
            placeholder="Name"
          />

          <DailyExerciseField prefix={index} />
        </div>
      ))}
      <Button
        callback={addNewWorkout}
        className="block mx-auto"
        style="black"
        icon={Plus}
        label="Add Workout"
      />
    </section>
  )
}

export default DailyWorkoutField
