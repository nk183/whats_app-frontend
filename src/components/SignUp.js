import React from 'react'
import {useState,useEffect} from 'react'

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    return (
        <div className=''>
            <input value={name} placeholder="name" type="text" onChange={e=>setName(e.target.value)}/>
            <input value={email} placeholder="email" type="text" onChange={e=>setEmail(e.target.value)}/>
    
        </div>
    )
}

export default SignUp
