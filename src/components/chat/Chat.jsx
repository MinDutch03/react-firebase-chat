import "./chat.css"
import { useEffect, useRef, useState } from "react"
import EmojiPicker from "emoji-picker-react"
import{
    doc,
    getDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
}from "firebase/firestore";
import {db} from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import {useChatStore} from "../../lib/chatStore"


const Chat = () => {
const [chat, setChat] = useState();
const [open, setOpen] = useState(false);
const [text, setText] = useState("");
const [img, setImg] = useState({
    file: null,
    url: "",
});


const {currentUser} = useUserStore();
const {chatId, user} = useChatStore();

const endRef = useRef(null);

useEffect(()=>{
    endRef.current?. scrollIntoView({behavior:"smooth"});
}, []);

useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats", chatId), (res)=>{
        setChat(res.data())
    })

    return () =>{
        unSub();
    }
},[chatId]);

const handleEmoji = e =>{
    setText((prev) => prev + e.emoji);
    setOpen(false);
};

const handleSend = async()=>{
    if (text === "") return;

    try{
        await updateDoc(doc(db, "chats", chatId),{
            messages:arrayUnion({
                senderId: currentUser.id,
                text,
                createdAt: new Date(),
            }),
        });

        const userIDs = [currentUser.id, user.id]

        userIDs.forEach(async (id)=>{
            const userChatsRef = doc(db, "userChats", id)
            const userChatsSnapshot = await getDoc(userChatsRef)

            if(userChatsSnapshot.exists()) {
                const userChatsData = userChatsSnapshot.data();

                const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId)

                userChatsData.chats[chatIndex].lastMessage = text;
                userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                userChatsData.chats[chatIndex].updatedAt = Date.now();

                await updateDoc(userChatsRef, {
                    chats: userChatsData.chats,
                });

            }
        })



    }catch (err){
        console.log(err);
    }
}

    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Jane Doe</span>
                        <p>ahfjffjf</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>sgyagdd</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="https://i.pinimg.com/originals/e7/31/a8/e731a82355eaaecc3c0ebe986941e563.jpg" alt="" />
                        <p>sgyagdd</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>sgyagdd</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>sgyagdd</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)} />
                <div className="emoji">
                    <img src="./emoji.png" alt=""onClick={()=>setOpen((prev)=> !prev)} />
                    <div className="picker">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                    </div>
                </div>
                <button className="sendButton" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat
