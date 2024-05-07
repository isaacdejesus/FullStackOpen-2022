export enum Weather { 
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy', 
    Windy = 'windy', 
    Stormy = 'stormy',
}
export enum Visibility {
    Great = 'great', 
    Good = 'good', 
    Ok = 'ok', 
    Poor = 'poor',
} 
export interface Diary_Entry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}
export type Non_Sensitive_Diary_Entry = Omit<Diary_Entry, 'comment'>;
export type New_Diary_Entry = Omit<Diary_Entry, 'id'>;
