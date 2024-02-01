import axios, { AxiosResponse } from "axios";

const note = {
    username: "ada",
    title: "Första anteckningen",
    note: "Min första anteckning",
};
const postData = async () => {
    try {
        const dataToSend = note;
        const response: AxiosResponse = await axios.post("https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com/api/notes", dataToSend);
        const responseData: JSON = response.data;
        console.log(responseData);
    }
    catch (error) { }
};
postData();

console.log(note);