export enum ExerciseForceEnum {
  Push = 'push',
  Pull = 'pull',
}

enum MuscleGroups {
  'Shoulder',
  'Arms',
  'Legs',
  'Chest',
  'Abdominals',
  'Back',
}

enum Muscles {
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

export interface Exercise {
  title: string
  slug: string
  group: MuscleGroups[]
  primary?: Muscles[]
  secondary?: Muscles[]
  force: ExerciseForceEnum
}
