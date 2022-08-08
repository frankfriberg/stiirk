import { Input } from 'components/Form/Input'
import DailyExerciseField from './DailyExerciseField'
import useDailyWorkout from './useDailyWorkoutField'

const DailyWorkoutField = () => {
  const { fields, register, addNewWorkout, removeWorkout } = useDailyWorkout()

  return (
    <section>
      <button type="button" onClick={addNewWorkout}>
        Add Workout
      </button>
      {fields.map((field, index) => (
        <div key={field.id}>
          <button type="button" onClick={removeWorkout(index)}>
            Remove Workout
          </button>
          <Input name={`workouts.${index}.title`} placeholder="Title" />
          <DailyExerciseField prefix={index} />
        </div>
      ))}
    </section>
  )
}

export default DailyWorkoutField
