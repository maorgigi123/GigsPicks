import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    messages : []
}


export const userReducer = (state = INITIAL_STATE, action={}) => {
    const { type, payload } = action;

    switch(type)
    {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
        return {
            ...state,
            currentUser:payload
        }
        case USER_ACTION_TYPES.SET_CURRENT_MESSAGES:
        return {
            ...state,
            messages : payload.slice().sort((a, b) => {
                return new Date(a.timestamp) - new Date(b.timestamp);
            })
        }
        case USER_ACTION_TYPES.SET_ADD_MESSAGE:
           // Find the index of the conversation that matches the participants
           const conversationIndex = state.messages.findIndex(conversation => 
            (conversation.participants[0].username === payload.sender.username && conversation.participants[1].username === payload.recipient.username) ||
            (conversation.participants[1].username === payload.sender.username && conversation.participants[0].username === payload.recipient.username)
        );
        if (conversationIndex > -1) {
            // If the conversation exists, update the messages array within it
            return {
                ...state,
                messages: state.messages.map((conversation, index) => {
                    if (index === conversationIndex) {
                        return {
                            ...conversation,
                            messages: [...conversation.messages, payload] // Add the new message
                        };
                    }
                    return conversation; // Keep other conversations unchanged
                })
            };
        } else {
            // If no matching conversation exists, create a new one
            const newConversation = {
               
                messages: [{...payload}], // Array of messages
                participants: [payload.sender, payload.recipient], // Array of participants
            }

            return {
                ...state,
                messages : [...state.messages, newConversation]
            };
        }

        default:
            return state;
    }
}
