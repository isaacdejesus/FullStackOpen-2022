interface course_part_base {
  name: string;
  exerciseCount: number;
}

interface course_part_description extends course_part_base {
    description: string;
}

interface course_part_basic extends course_part_description {
  kind: "basic"
}

interface course_part_group extends course_part_base {
  groupProjectCount: number;
  kind: "group"
}

interface course_part_background extends course_part_description  {
  backgroundMaterial: string;
  kind: "background"
}
interface course_part_special extends course_part_description {
    requirements: string[];
    kind: "special"
}

 export type course_part = course_part_basic | course_part_group | course_part_background | course_part_special;
