import axios from "axios";
import { PostNotes } from "../types/interface";
import { getData } from "./getAPI";
import { showOverlay } from "../modules/displayNotes";

const BASE_URL = "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com"


export const postData = async (title: string, text: string, username: string) => {
    try {
        const noteToPost: PostNotes = {
            username: username,
            title: title,
            note: text,
        };

        // Posta den nya anteckningen
        await axios.post(`${BASE_URL}/api/notes`, noteToPost);

        // Hämta om alla anteckningar
        const updatedNotes = await getData(username);

        // Visa alla anteckningar inklusive den nya
        showOverlay(updatedNotes);
    }
    catch (error) {
        console.error("Error posting data: ", error);
    }
};


