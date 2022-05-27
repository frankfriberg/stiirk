import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const coreExercises = await prisma.exercise.createMany({
    data: [
      {
        name: "Deadbugs",
        max: 30,
        min: 10,
        leftright: false,
      },
      {
        name: "Reverse Crunches",
        max: 30,
        min: 10,
        leftright: false,
      },
      {
        name: "Side Plank",
        max: 20,
        min: 5,
        leftright: true,
      },
      {
        name: "Superman",
        max: 20,
        min: 5,
        leftright: false,
      },
      {
        name: "Flutter Kicks",
        max: 30,
        min: 10,
        leftright: false,
      },
      {
        name: "Bicycle Crunches",
        max: 30,
        min: 10,
        leftright: false,
      },
      {
        name: "Plank Toe Reach",
        max: 20,
        min: 8,
        leftright: false,
      },
      {
        name: "Jackknife Crunch",
        max: 20,
        min: 8,
        leftright: false,
      },
    ],
  });
}
