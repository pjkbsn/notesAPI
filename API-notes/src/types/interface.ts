export interface Notes {
    id: string;
    username: string;
    title: string;
    note: string;
    createdAt: Date;
}

export interface PostNotes {
    username: string;
    title: string;
    note: string;
}

export interface UpdateNotes {
    note: string;
    id: any;
}