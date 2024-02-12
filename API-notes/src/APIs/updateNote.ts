import axios from "axios";
import { UpdateNotes } from "../types/interface";
import { showOverlay } from "../modules/displayNotes";
import { getData } from "./getAPI";
const BASE_URL = "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com"



export const updateData = async (newText: string, noteID: any, username: string) => {
    try {
        const dataToUpdate: UpdateNotes = {
            note: newText,
            id: noteID.id,
        }

        await axios.put(`${BASE_URL}/api/notes/${noteID}`, dataToUpdate);

        const refreshOverlay = await getData(username);

        showOverlay(refreshOverlay);
    }
    catch (error) {
        console.error("Error updating data: ", error)
    }
};

