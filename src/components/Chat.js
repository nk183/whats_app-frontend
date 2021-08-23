import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import '../styling/Chat.css';
import {Avatar,IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from'axios'

import {useQuery} from '../hooks' 


function Chat() {

    // const [roomId, setRoomId] = useState(null)
    const query = useQuery();
    // setRoomId(query.get("roomId") || "");
    const roomId = query.get("roomId") || ""
    const userId="1";
    console.log("lid-",roomId); 
    const [seed, setseed] = useState(Math.floor(Math.random()*5000))
    const [chat, setchat] = useState({message:null,roomId:roomId,userId:userId})
    const [roomChats, setRoomChats] = useState([])
    const [isAdd, setIsAdd] = useState(false)

    useEffect(() => {
        console.log("useEffect",roomId);
        axios.get(`http://localhost:8080/getChat/${roomId}`)
                .then(response=>{
                    console.log(response.data);
                    setRoomChats(response.data)
                    setIsAdd(false)
                })
                .catch(error=>{
                    console.log(error);
                }
                )

    }, [isAdd,roomId]) 

    const sendchat=(e)=>{
        e.preventDefault();
        console.log(chat);
        axios.post("http://localhost:8080/addChat",chat)
            .then(response=>{
                console.log(response.data);
                setchat({...chat,message:''})
                setIsAdd(true)
            })
            .catch(error=>{
                alert(error)
                console.log(error);
                }
            )

        console.log(chat);

    }
    
    return (
        <div className='chat'>
           <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat_header_info'>
                    <h3>name {roomId}</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>

           </div>
           <div className='chat_body'>
           {(roomChats.length!=0)?(roomChats.map((temp)=>(
           
                <p className={`chat_message ${userId==temp.userId && 'chat_reciever'}`}>
                    <spam className='chat_name'>
                        {temp.userId} naman
                    </spam>
                    {temp.message}
                    <spam className='chat_timestamp'>
                        {temp.timeStamp}
                    </spam>
                </p>
            )
            )):
            <p>start messaging</p>
           }
           </div>     

            {/* <div className='chat_body'>
                <p className={`chat_chat ${true && 'chat_reciever'}`}>
                    <spam className='chat_name'>
                        moooom
                    </spam>
                        lololo
                    <spam className='chat_timestamp'>
                        hi nmn
                    </spam>
                </p>
            </div> */}
           
           <div className='chat_footer'>
                
                <InsertEmoticonIcon></InsertEmoticonIcon>
                <form>
                    <input value={chat.message} placeholder="type chat ..." type="text" onChange={e=>setchat({...chat,message:e.target.value,roomId:roomId})}/>
                    <button onClick={sendchat} type='submit'>Send</button>

                </form>
                <MicIcon/>
           </div>


        </div>
    )
}

export default Chat
