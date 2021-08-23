import React,{useState,useEffect} from 'react'
import "../styling/SidebarChat.css";
import {Avatar,IconButton} from '@material-ui/core'
import {BrowserRouter as Router,Link} from "react-router-dom";
import axios from'axios'

function SidebarChat({addNewChat ,id,name }) {
    const [seed, setseed] = useState("")
    
    useEffect(() => {
        setseed(Math.floor(Math.random()*5000));
        // console.log("lol"+addNewChat);
    }, [])

    const createChat=()=>{
        const roomName = prompt("Enter name")
        const dis = prompt("Enter discription")
        if(roomName){
            const temp = {"roomId":"6","roomName":roomName,"discription":dis}
            axios.post("http://localhost:8080/addRoom",temp)
                .then(response=>{
                    console.log(response.data);

                })
                .catch(error=>{
                    console.log(error);
                }
                )
        }
        window.location.reload(false);
    }

    // const showChat=()=>{
    //     alert(name);
        // show chats with roomName
    // }

    return !addNewChat ? (
            <Link to = {`/rooms?roomId=${id}`}>
                <div  className='sidebarChat' >
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebarChat_info">
                        <h2>{name}</h2>
                        <p>message..</p>
                    </div>
                </div>
            </Link>
        )
        :(
            <div onClick={createChat} className='sidebarChat'>
                <h2>Add New Chat</h2>
            </div>
        
        );
}

export default SidebarChat
