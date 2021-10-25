import React, {useState} from 'react';
import {CSRFToken, getCookie} from '../../components/csrftoken';


const Home = ({name}) => {
    const csrftoken = getCookie('csrftoken')
    const [ipAddress, setIPAddress] = useState('');
    const [time, setTime] = useState('');

    console.log(ipAddress, time)
    const onShedule = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/sheduler/add-task/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
        
            },
            credentials: 'include',
            body: JSON.stringify({
                ipAddress,
                time
            })
        });

        const content = await response.json();
        console.log(content)
    }
    return (
        <div>
           <div className="Header"> {name ? 'Hi ' + name : 'You are not logged in'}</div>
           <div className="container">
               <div className="col-md-4">
                <div className="border rounded p-4 mt-5">
                        <form onSubmit={onShedule}>
                            <h1 className="h3 mb-3 fw-normal mt-2 mb-2">Shedule IP Here</h1>
                            <input type="text" className="form-control mt-2 mb-2" placeholder="IP Address" required
                                onChange={e => setIPAddress(e.target.value)}
                            />
                            <CSRFToken/>
                            <h5>Time</h5>
                            <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                                
                                <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                                    <input type="radio" id="minute" name="time" value="minute" onChange={e=>setTime(e.target.value)}/>
                                    <label htmlFor="minute">Every Minute</label>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                                    <input type="radio" id="hour" name="time" value="hour" onChange={e=>setTime(e.target.value)}/>
                                    <label htmlFor="hour">Every Hour</label>
                                </div>
                                <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
                                    <input type="radio" id="day" name="time" value="day" onChange={e=>setTime(e.target.value)}/>
                                    <label htmlFor="day">Every Day</label>
                                </div>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary mt-2 mb-2" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
               <div className="col-md-8">

               </div>
           </div>
        </div>
    );
};

export default Home;