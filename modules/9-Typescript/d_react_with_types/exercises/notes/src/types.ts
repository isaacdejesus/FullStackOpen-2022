export interface Note {
    id: number;
    content: string;
}

export type New_Note = Omit<Note, 'id'>
