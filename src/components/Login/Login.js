import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import  Home  from 'X:/project/TaskForge/TaskForge-frontend/src/components/Home'
export default function Login() {
    const [data, setData] = useState([{}])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const url = '/login'
    
    const getUserId = async () => {
        const update = {
            email: email,
            password: password
        };
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        };
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            console.log(data);
            <Home user_id={data.id}/>
        } catch (err) {
            console.log(err);
        } finally {

        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form class="box" style={{ width: "40%", margin: '10vh' }}>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input
                            style={{ maxWidth: '100%' }}
                            class="input"
                            type="email"
                            placeholder="e.g. alex@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3vh' }}>

                    <button class="button is-primary" onClick={() => getUserId} >Login</button>
                </div>
            </form>
        </div>
    )
}