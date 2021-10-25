import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import {CSRFToken, getCookie} from '../../components/csrftoken';

const Register = () => {
    const csrftoken = getCookie('csrftoken')
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPasword] = useState('');
    const [age, setAge] = useState('');
    const [lastName, setLastName] = useState('');
    const [unique_id, setUniqueID] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if(password === confirm_password){
            await fetch('http://localhost:8000/api/authentication/register/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken},
                body: JSON.stringify({
                    firstName,
                    lastName,
                    age,
                    unique_id,
                    email,
                    password,
                    image
                })
            });

            setRedirect(true);
        }
        else{
            alert("Password do not Match !")
        }
        
    }

    if (redirect) {
        return <Redirect to="/login"/>;
    }

    return (
        <div className="container col-4 border rounded p-4">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <input className="form-control mt-2 mb-2" placeholder="First Name" required
                    onChange={e => setFirstName(e.target.value)}
                />
                <CSRFToken/>
                <input className="form-control mt-2 mb-2" placeholder="Last Name" required
                    onChange={e => setLastName(e.target.value)}
                />
                <input className="form-control mt-2 mb-2" placeholder="Age" required
                    onChange={e => setAge(e.target.value)}
                />
                <input className="form-control mt-2 mb-2" placeholder="Unique ID" required
                    onChange={e => setUniqueID(e.target.value)}
                />
                <input type="email" className="form-control mt-2 mb-2" placeholder="Email address" required
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="form-control mt-2 mb-2" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="text" className="form-control mt-2 mb-2" placeholder="Confirm Password" required
                    onChange={e => setConfirmPasword(e.target.value)}
                />
                <input type="file" className="form-control mt-2 mb-2" name="image" required
                    onChange={e => setImage({pictureAsFile : e.target.files[0]}
                        )}
                />
                <button className="w-100 btn btn-lg btn-primary mt-2 mb-2" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;
