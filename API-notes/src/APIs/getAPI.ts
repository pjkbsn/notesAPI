import axios, { AxiosResponse } from "axios";
import { Notes } from '../types/interface';

const BASE_URL = "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com"

export const getData = async (username: string): Promise<Notes[]> => {
    try {
        const noteData: AxiosResponse = await axios.get(`${BASE_URL}/api/notes/${username}`)
        const notesData: Notes[] = noteData.data.notes.map((note: any) => ({
            id: note.id,
            username: note.username,
            title: note.title,
            note: note.note,
            createdAt: note.createdAt,
        }));




        return notesData;
    } catch (error) {
        console.error("Error fetching data from API:", error);
        return [];
    }
};
