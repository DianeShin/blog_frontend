import {useState} from "react";
import './SignUp.css'
const SignUp = () => {
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    }

    function signUp() {
        fetch("/addUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs)
        })
        .then(() => alert("Account made!"))
    }

    const [inputs, setInputs] = useState({});

    return (
        <div id="signUpDiv">
            <form id="signUpForm" onSubmit={signUp}>
                <h1 id="signUpTitle" className="title"> Welcome!</h1>
                <label>
                    Email:<br/>
                    <input type="email" name="email" value={inputs.email || ""} onChange={handleChange}/><br/><br/>
                </label>
                <label>
                    Password:<br />
                    <input type="password" name="password" value={inputs.password || ""} onChange={handleChange}/><br/><br/>
                </label>
                <label>
                    Name:<br />
                    <input type="text" name="name" value={inputs.name || ""} onChange={handleChange}/><br/><br/>
                </label>
                <label>
                    Birth Date:<br />
                    <input type="date" name="birthDate" value={inputs.birthDate || ""} onChange={handleChange}/><br/><br/>
                </label>
                <input type="submit" value="Submit" className="submitButton"/>
            </form>
        </div>
    )
}

export default SignUp;