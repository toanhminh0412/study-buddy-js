import React, {useState, useEffect} from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../App';
import Login from "./Login";

export default function Message() {
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([])
    const [curMessage, setCurMessage] = useState(null);
    const unchange = "";
    const senderId = window.localStorage.getItem('userId');
    const senderPic = window.localStorage.getItem('profilePic');
    const senderName = window.localStorage.getItem('name');
    const receiverId = window.localStorage.getItem('receiverId');
    const receiverName = window.localStorage.getItem('receiverName');
    const receiverPic = window.localStorage.getItem('receiverPic');
    
    const getMessages = () => {
        fetch('/api/message')
        .then(response => response.json())
        .then(data => {
            let messagesData = [];
            data.messages.forEach(messageObj => {
                if ((messageObj.senderId === senderId && messageObj.receiverId === receiverId) || (messageObj.senderId === receiverId && messageObj.receiverId === senderId)) {
                    messagesData.push({
                        "messageId": messageObj.messageId,
                        "senderId": messageObj.senderId,
                        "senderPic": messageObj.senderPic,
                        "senderName": messageObj.senderName,
                        "message": messageObj.message
                    })
                }
            })

            if (messagesData.sort().join(',') !== messageList.sort().join(',')) {
                setMessageList(messagesData);
            }

            // curMessage.scrollIntoView({ behavior: "smooth"})
            document.getElementById('dummy').scrollIntoView({behavior: 'smooth'})
            
        })
        .catch(error => {
            console.log(error);
        })
    }

    const q = query(collection(db, 'chat server'), where("receiverId", "==", senderId), where("senderId", "==", receiverId));
    const unsub = () => {onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            getMessages();
          }       
        });
      })};
    
    
    useEffect(() => {
        getMessages();
        unsub();
        
    }, [unchange]);
    

    const updateMessage = e => {
        setMessage(e.target.value);
    }
    
    const sendMessage = e => {
        e.preventDefault();
        if(message !== "") {
        setMessage("");
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
            let messagesData = [];
            data.messages.forEach(messageObj => {
                if ((messageObj.senderId === senderId && messageObj.receiverId === receiverId) || (messageObj.senderId === receiverId && messageObj.receiverId === senderId)) {
                    messagesData.push({
                        "messageId": messageObj.messageId,
                        "senderId": messageObj.senderId,
                        "senderPic": messageObj.senderPic,
                        "senderName": messageObj.senderName,
                        "message": messageObj.message
                    })
                }
            })

            setMessageList(messagesData);
            document.getElementById('dummy').scrollIntoView({behavior: 'smooth'})
        })
        }
    }

    if (senderId === "") {
        return <Login/>
    }
    if (messageList.length === 0) {
        return (
            <div className='flex flex-row h-full w-full'>
            <div className='w-0 h-full md:w-1/3 lg:w-1/4'></div>
            <div className='h-full w-full md:w-2/3 lg:w-1/2 flex flex-col'>
                <div className="h-[83%] overflow-y-scroll border-l border-r">
                    <img src={receiverPic} alt='receiverphoto' className='w-72 h-72 rounded-full mt-32 md:mt-48 mx-auto'></img>
                    <p className='text-2xl text-center mt-4 md:mt-8'>Say hi to <span className="font-medium">{receiverName}</span></p>
                    <div id='dummy'></div>
                </div>
                <div className='absolute bottom-0 w-full md:w-2/3 lg:w-1/2 border'>
                    <form className='w-full h-12 flex flex-row border-t border-b' onSubmit={sendMessage}>
                        <input className='w-10/12 pl-4 text-lg' type='text' name='message' placeholder="Type a message" value={message} onChange={updateMessage}></input>
                        <input className='w-2/12 text-center text-red-500 font-medium text-lg' type='submit' value='Send'></input>
                    </form>
                    <div className="w-full h-12 flex flex-col justify-center">
                        <p className='w-fit ml-auto mr-4 text-xl'> </p>
                    </div>
                </div>
            </div>
            <div className='w-0 h-full lg:w-1/4'></div>
        </div>
        )
    }

    return (
        <div className='flex flex-row h-full w-full'>
            <div className='w-0 h-full md:w-1/3 lg:w-1/4'></div>
            <div className='h-full w-full md:w-2/3 lg:w-1/2 flex flex-col'>
                <div className="h-[83%] overflow-y-scroll border-l border-r">
                    {messageList.map(messageObj => {
                        if (messageObj.senderId === senderId) {
                            return (
                                <div className='ml-4 mt-2 mb-2 w-fit flex flex-row xl:mt-4 xl:mb-4 xl:ml-6' key={messageObj.messageId}>
                                <img className='w-10 h-10 rounded-full mt-4' src={messageObj.senderPic} alt='senderphoto'></img>
                                <div>
                                    <p className='ml-4 font-light text-md'>{messageObj.senderName}</p>
                                    <div className='ml-4 border w-fit pl-2 pr-2 rounded-sm bg-slate-100'>
                                        <p className='text-lg'>{messageObj.message}</p>
                                    </div>
                                </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className='ml-auto mr-4 mt-2 w-fit flex flex-row xl:mt-4 xl:mr-6 xl:mb-4' key={messageObj.messageId}>
                                <div>
                                    <p className='font-light mext-md ml-auto w-fit mr-4'>{messageObj.senderName}</p>
                                    <div className='mr-4 border w-fit pl-2 pr-2 rounded-sm bg-slate-100'>
                                        <p className='text-lg'>{messageObj.message}</p>
                                    </div>
                                </div>
                                <img className='w-10 h-10 rounded-full mt-4' src={messageObj.senderPic} alt='senderphoto'></img>
                                </div>
                            )
                        }
                    }) }
                    <div id='dummy'></div>
                </div>
                <div className='absolute bottom-0 w-full md:w-2/3 lg:w-1/2 border'>
                    <form className='w-full h-12 flex flex-row border-t border-b' onSubmit={sendMessage}>
                        <input className='w-10/12 pl-4 text-lg' type='text' name='message' placeholder="Type a message" value={message} onChange={updateMessage}></input>
                        <input className='w-2/12 text-center text-red-500 font-medium text-lg' type='submit' value='Send'></input>
                    </form>
                    <div className="w-full h-12 flex flex-col justify-center">
                        <p className='w-fit ml-auto mr-4 text-xl'> </p>
                    </div>
                </div>
            </div>
            <div className='w-0 h-full lg:w-1/4'></div>
        </div>
    )
}