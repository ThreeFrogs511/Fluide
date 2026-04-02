import { ComponentType } from "react";

export type Exercise = {
  slug: string;
  title: string;
  description: string;
  duration: number;
  component: ComponentType;
};

export const exercises: Exercise[] = [];

export function getExercise(slug: string): Exercise | undefined {
  return exercises.find((e) => e.slug === slug);
}
