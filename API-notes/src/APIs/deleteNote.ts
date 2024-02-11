import axios/* , { AxiosResponse } */ from "axios";
import { getData } from "./getAPI";
import { showOverlay } from "../components/displayNotes";

const BASE_URL = "https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com"

export const deleteData = async (noteID: any, username: string) => {
    try {
        await axios.delete(`${BASE_URL}/api/notes/${noteID}`);

        const refreshOverlay = await getData(username);

        showOverlay(refreshOverlay);
    }
    catch (error) {
        console.error(error)
    }
};
