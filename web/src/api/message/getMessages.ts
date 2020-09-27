import { Message } from "model/Message"
import { PaginedList } from "model/PaginedList"


export const getStudentRoomMessages = (
    perPage: number,
    page: number
): Promise<PaginedList<Message>> => {
    return fetch((`http://localhost:8080/api/messages/studentRoom?perPage=${perPage}&page=${page}`), {
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    }).then((response) => {
        return response.json();
    });
};