import api from "../api/interceptorToken";

const API_URL = "/priorities";
export const getAllPriorities = async () => {
    try {
        const response = await api.get(API_URL);
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
        throw err;
    }
};
export const postPriority = async (name: string) => {
    try {
        const response = await api.post(API_URL, { name });
        return response.data;
    } catch (err) {
        console.error("שגיאה: ", err);
    }
};