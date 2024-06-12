import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
    const {chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock} = useChatStore();
    const {currentUser} = useUserStore();
    const handleBlock = async () =>{
        if(!user) return;
        const userDocRef = doc(db, "users", currentUser.id)

        try{
            await updateDoc(userDocRef,{
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
            });
            changeBlock();
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='detail'>
            <div className="user">
                <img src={user?.avatar || ".avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>gajgd</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.pinimg.com/originals/62/96/f7/6296f7477ab8b248425c9330107828f6.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.pinimg.com/originals/62/96/f7/6296f7477ab8b248425c9330107828f6.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://i.pinimg.com/originals/62/96/f7/6296f7477ab8b248425c9330107828f6.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button onClick={handleBlock}>
                    {isCurrentUserBlocked ? "You are blocked!" : isReceiverBlocked ? "User blocked" : "Block User"}
                </button>
                <button className="logout" onClick={()=> auth.signOut()}>Logout</button>
            </div>
        </div>
    )
}

export default Detail
