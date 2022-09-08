import { Exercise, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

enum MuscleGroup {
  'Shoulder',
  'Arms',
  'Legs',
  'Chest',
  'Abdominals',
  'Back',
}

enum Muscle {
  'Adductors',
  'Biceps Brachii',
  'Brachialis',
  'Brachioradialis',
  'Deltoid Anterior',
  'Deltoid Lateral',
  'Deltoid Posterior',
  'Deep Hip External Rotators',
  'Erector Spinae',
  'Gastrocnemius',
  'Gluteus Maximus',
  'Gluteus Medius',
  'Gluteus Minimus',
  'Gracilis',
  'Hamstrings',
  'Iliopsoas',
  'Infraspinatus',
  'Latissimus Dorsi',
  'Levator Scapulae',
  'Obliques',
  'Pectineous',
  'Pectoralis Major Clavicular Head',
  'Pectoralis Major Sternal Head',
  'Teres Major',
  'Teres Minor',
  'Tibialis Anterior',
  'Transverse Abdominus',
  'Trapezius Lower Fibers',
  'Trapezius Middle Fibers',
  'Trapezius Upper Fibers',
  'Triceps Brachii',
  'Wrist Extensors',
  'Wrist Flexors',
  'Pectoralis Minor',
  'Popliteus',
  'Quadratus Lumborum',
  'Quadriceps',
  'Rectus Abdominis',
  'Rhomboids',
  'Sartorius',
  'Serratus Anterior',
  'Soleus',
  'Splenius',
  'Sternocleidomastoid',
  'Subscapularis',
  'Supraspinatus',
  'Tensor Fasciae Latae',
}

const exerciseList = [
  'Push-Up',
  'Pull-Up',
  'Squat',
  'Superman',
  'Mountain Climber',
  'Burpee',
  'Calf Raise',
  'Wall Sit',
  'Jump Squat',
  'Reverse Crunch',
  'Crunch',
  'Chin-Up',
  'Bird Dog',
  'Side Plank',
  'Plank',
  'Tricep Dip',
  'Glute Bridge',
  'Forward Lunge',
  'Reverse Lunge',
]

const randomEnum = (enumerable: object, amount: number): string[] => {
  const returning: string[] = []
  const muscles = Object.keys(enumerable).filter(
    (k) => !(Math.abs(Number.parseInt(k)) + 1)
  )

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(
      (Math.random() * Object.keys(enumerable).length) / 2
    )

    if (!!muscles[randomIndex]) returning.push(muscles[randomIndex] as string)
  }

  return returning
}

async function main() {
  // Exercises
  const createdExercises: Exercise[] = []
  exerciseList.forEach(async (exercise) => {
    const createdExercise = await prisma.exercise.upsert({
      where: { slug: exercise.toLowerCase().replace(/[^\w]/gi, '') },
      update: {},
      create: {
        name: exercise,
        slug: exercise.toLowerCase().replace(/[^\w]/gi, ''),
        alias: [exercise, exercise],
        primary: randomEnum(Muscle, Math.floor(Math.random() * 3 + 1)),
        secondary: randomEnum(Muscle, Math.floor(Math.random() * 3 + 1)),
        group: randomEnum(MuscleGroup, Math.floor(Math.random() * 2 + 1)),
      },
    })
    createdExercises.push(createdExercise)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
