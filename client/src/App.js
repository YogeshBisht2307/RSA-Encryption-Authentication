import React, {useEffect, useState} from 'react';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";


const App = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                try{
                    const response = await fetch('http://localhost:8000/api/authentication/user', {
                      headers: {'Content-Type': 'application/json'},
                      credentials: 'include',
                    });
                    const content = await response.json();
                    if(content.first_name)
                        setName(content.first_name);
                    else if(content.email)
                        setName(content.email);
                    else
                        console.log("Unauthenticated User");
                }
                catch(error){
                  console.log(error);
                  alert("Unable to load Resource");
                }
            }
        )();
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar name={name} setName={setName}/>

                <main className="form-signin">
                    <Route path="/" exact component={() => <Home name={name}/>}/>
                    <Route path="/login" component={() => <Login setName={setName}/>}/>
                    <Route path="/register" component={Register}/>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
