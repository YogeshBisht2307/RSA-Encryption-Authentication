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
            let formData = new FormData()
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("unique_id", unique_id);
            formData.append("age", age);
            formData.append("image", image);
            const response = await fetch('http://localhost:8000/api/authentication/register/', {
                method: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                body: formData,
            });
            const data = await response.json();
            if(data.email)
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

                <input type="text" className="form-control mt-2 mb-2" placeholder="First Name" id="first_name" required
                    onChange={e => setFirstName(e.target.value)}
                />
                <CSRFToken/>
                <input type="text" className="form-control mt-2 mb-2" placeholder="Last Name" id="last_name" required
                    onChange={e => setLastName(e.target.value)}
                />
                <input type="number" className="form-control mt-2 mb-2" placeholder="Age" id="age" required
                    onChange={e => setAge(e.target.value)}
                />
                <input  type="text" className="form-control mt-2 mb-2" placeholder="Unique ID" id="unique_id" required
                    onChange={e => setUniqueID(e.target.value)}
                />
                <input type="email" className="form-control mt-2 mb-2" placeholder="Email address" id="email" required
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="form-control mt-2 mb-2" placeholder="Password" name="password" required
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="text" className="form-control mt-2 mb-2" placeholder="Confirm Password" id="confirm_password" required
                    onChange={e => setConfirmPasword(e.target.value)}
                />
                <input type="file"  className="form-control mt-2 mb-2" id="image"
                    onChange={e => setImage(e.target.files[0])}
                />
                <button className="w-100 btn btn-lg btn-primary mt-2 mb-2" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;
