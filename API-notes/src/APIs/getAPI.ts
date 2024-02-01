import axios, { AxiosResponse } from "axios";

const getData = async () => {
    try {
        const noteData: AxiosResponse = await axios.get("https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes/ada")
        const notesData: JSON = noteData.data.notes;
        console.log(notesData);

    }
    catch (error) { }
};

getData();