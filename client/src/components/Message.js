import React, {useState, useEffect} from "react";

export default function Message() {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([])
    const senderId = window.localStorage.getItem('userId');
    const senderPic = window.localStorage.getItem('profilePic');
    const senderName = window.localStorage.getItem('name');
    const receiverId = window.localStorage.getItem('receiverId');
    const receiverName = window.localStorage.getItem('receiverName');
    const receiverPic = window.localStorage.getItem('receiverPic');
    
    useEffect(() => {
        console.log(messageList)
        fetch('/api/message')
        .then(response => response.json())
        .then(data => {
            console.log("All messages:", data.messages)
            let messagesData = [];
            data.messages.forEach(messageObj => {
                if ((messageObj.senderId === senderId && messageObj.receiverId === receiverId) || (messageObj.senderId === receiverId && messageObj.receiverId === senderId)) {
                    messagesData.push({
                        "messageId": messageObj.messageId,
                        "senderPic": messageObj.senderPic,
                        "senderName": messageObj.senderName,
                        "message": messageObj.message
                    })
                }
            })

            setMessageList(messagesData);
        })
    }, [])

    const updateMessage = e => {
        setMessage(e.target.value);
    }
    
    const sendMessage = e => {
        e.preventDefault();
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "senderId": senderId,
                "senderPic": senderPic,
                "senderName": senderName,
                "receiverId": receiverId,
                "receiverPic": receiverPic,
                "receiverName": receiverName,
                "message": message
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("All messages:", data.messages)
            let messagesData = [];
            data.messages.forEach(messageObj => {
                if ((messageObj.senderId === senderId && messageObj.receiverId === receiverId) || (messageObj.senderId === receiverId && messageObj.receiverId === senderId)) {
                    messagesData.push({
                        "messageId": messageObj.messageId,
                        "senderPic": messageObj.senderPic,
                        "senderName": messageObj.senderName,
                        "message": messageObj.message
                    })
                }
            })

            setMessageList(messagesData);
        })
    }

    return (
        <div className='flex flex-row h-full w-full'>
            <div className='w-0 h-full md:w-1/3 lg:w-1/4'></div>
            <div className='h-full w-full md:w-2/3 lg:w-1/2 border flex flex-col'>
                <div>
                    {messageList.map(messageObj => {
                        return (
                            <div key={messageObj.messageId}>
                            <p>Sender: {messageObj.senderName}</p>
                            <p>Message: {messageObj.message}</p>
                            </div>
                        )
                    }) }
                </div>
                <form className='w-full h-12 md:w-2/3 lg:w-1/2 absolute bottom-4 flex flex-row border-t border-b' onSubmit={sendMessage}>
                    <input className='w-10/12 pl-4 text-lg' type='text' name='message' placeholder="Type a message" onChange={updateMessage}></input>
                    <input className='w-2/12 text-center text-red-500 font-medium text-lg' type='submit' value='Send'></input>
                </form>
            </div>
            <div className='w-0 h-full lg:w-1/4'></div>
        </div>
    )
}