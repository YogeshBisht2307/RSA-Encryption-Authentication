import React, {useEffect, useState} from 'react';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Nav from "./components/Navbar";
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
                    console.log(response)
                    const content = await response.json();
                    console.log(content)
                    setName(content.email);
                }
                catch(error){
                  console.log(error)
                }
            }
        )();
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName}/>

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
