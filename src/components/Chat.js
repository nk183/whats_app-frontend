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




function Chat({roomID,userId}) {
    const [input, setInput] = useState("");
    const [seed, setseed] = useState(Math.floor(Math.random()*5000))
    const [chat, setchat] = useState({})
    const [roomChats, setRoomChats] = useState([])
    // const [roomId, setRooId] = useState("2");
    const [isAdd, setIsAdd] = useState("not")
    // setseed(Math.floor(Math.random()*5000));
    useEffect(() => {
        
        axios.get(`http://localhost:8080/getChat/${roomID}`)
                .then(response=>{
                    console.log(response.data);
                    setRoomChats(response.data)
                    setIsAdd("not")
                })
                .catch(error=>{
                    console.log(error);
                }
                )

    }, [isAdd,roomID]) 

    const sendchat=(e)=>{
        e.preventDefault();
        // alert(input);
        // alert();
        // alert("room"+roomID)
        console.log(input);
        // var userId="1"
        setchat({...chat,"message":input,"userId":userId,"roomId":roomID})
        console.log(chat);
        axios.post("http://localhost:8080/addChat",chat)
            .then(response=>{
                // alert(response.data);
                setIsAdd(response.data)
            })
            .catch(error=>{
                alert(error)
                console.log(error);
                }
            )

        setInput('');
    }
    
    return (
        <div className='chat'>
           <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat_header_info'>
                    <h3>name {roomID}</h3>
                    <p>Last seem at ...</p>
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
                        {temp.userId}
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
                    <input value={input} placeholder="type chat ..." type="text" onChange={e=>setInput(e.target.value)}/>
                    <button onClick={sendchat} type='submit'>Send</button>

                </form>
                <MicIcon/>
           </div>


        </div>
    )
}

export default Chat
