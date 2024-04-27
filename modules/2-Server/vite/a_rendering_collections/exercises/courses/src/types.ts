export interface Courses {
    name: string;
    id: number;
    parts: Parts[]
}

export interface Parts {
    name: string;
    exercises: number;
    id: number;
}
