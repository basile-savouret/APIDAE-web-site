import { Message, CreateMessageCommand } from "model/Message"

const createMessageCommand = (
    message: string,
    timestamp: string
): CreateMessageCommand => ({
    message: message,
    timestamp: timestamp,
})

export const createStudentRoomMessage = (
    message: string,
    timestamp: string
): Promise<Message> => {
    return fetch((`http://localhost:8080/api/messages/studentRoom`), {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(createMessageCommand(message, timestamp)),
        credentials: 'include'
    }).then((response) => {
        return response.json();
    });
};