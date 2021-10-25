import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {CSRFToken, getCookie} from '../../components/csrftoken';

const Login = ({setName}) => {

    const csrftoken = getCookie('csrftoken')
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/authentication/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();
        console.log(content)
        if(content.token){
            setRedirect(true);
            setName(content.first_name)
        }
        else
            alert("Credential don't Match");

    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="container col-4 border rounded p-4 mt-5">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal mt-2 mb-2">Login Here</h1>
                <input type="email" className="form-control mt-2 mb-2" placeholder="Email address" required
                    onChange={e => setEmail(e.target.value)}
                />
                <CSRFToken/>

                <input type="password" className="form-control mt-2 mb-2" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary mt-2 mb-2" type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Login;
