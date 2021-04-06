import React,{useState,useEffect} from 'react'
import "../styling/Sidebar.css";
import {Avatar,IconButton} from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import axios from'axios'

function Sidebar() {

    const [rooms, setRooms] = useState([])

    useEffect(() => {
        // alert("sidebar")
        axios.get("http://localhost:8080/getRooms")
            .then(response=>{
                console.log("response:rooms");
                console.log(response);
                setRooms(response.data)

            })
            .catch(error=>{
                console.log("yo error");
                console.log(error);
            }
            )

        
    }, [])

    const showData=()=>{
        alert(rooms)
    }


    return (
        <div className="sidebar" >
            <div className="sidebar_header">
                <Avatar />
                <div className='sidebar_headerRight'>
                    <IconButton onClick={showData}>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            
            <div className="sidebar_search">
                
                <div className="sidebar_searchContainer">
                    <SearchOutlined/> 
                    <input placeholder="search" type="text" />
                
                </div>


            </div>

            <div className="sidebar_chats">
                
                <SidebarChat addNewChat/>
                {/* <SidebarChat key="1" id="1" name="nk"  />                 */}
                {rooms.map((temp)=> (
                    <SidebarChat key={temp.roomId} id={temp.roomId} name={temp.roomName} />
                ))}

            </div>



        </div>
    )
}

export default Sidebar
