import "./detail.css"

const Detail = () => {
    return (
        <div className='detail'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>Jane Doe</h2>
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
                        <span>Privacy % help</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared photos</span>
                        <img src="./arrowDown.png" alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItems">
                            <div className="photoDetail">
                                <img src="https://storage.cloud.google.com/img-dutch/images.png?authuser=1" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" />
                        </div>
                        <div className="photoItems">
                            <div className="photoDetail">
                                <img src="https://storage.cloud.google.com/img-dutch/images.png?authuser=1" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" />
                        </div>
                        <div className="photoItems">
                            <div className="photoDetail">
                                <img src="https://storage.cloud.google.com/img-dutch/images.png?authuser=1" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="" />
                    </div>
                </div>
                <button>Block User</button>
            </div>
        </div>
    )
}

export default Detail
