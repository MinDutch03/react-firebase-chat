import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useStore = create((set) => ({
    chatId: null,
    isCurrentUserBlocked: false,
    user: null,
    isReceiverBlocked: false,
    changeChat: async (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;

        // CHECK IF CURRENT USER IS BLOCKED
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        // CHECK IF RECEIVER USER IS BLOCKED
        if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        }

        // Assuming you might want to fetch additional data from Firestore
        // If you need to fetch the chat document, you can use the following logic:
        try {
            const chatDoc = await getDoc(doc(db, "chats", chatId));
            if (chatDoc.exists()) {
                set({
                    chatId,
                    user,
                    isCurrentUserBlocked: false,
                    isReceiverBlocked: false,
                });
            } else {
                console.error("No such chat document!");
            }
        } catch (error) {
            console.error("Error fetching chat document:", error);
        }
    },
    changeBlock: () => {
        set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
    },
}));
