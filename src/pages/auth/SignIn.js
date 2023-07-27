import './SignIn.css'
import {useContext, useState} from "react";
import {AuthContext} from "./Authenticator";
import {Link} from "react-router-dom";

const SignIn = () => {
    const [inputs, setInputs] = useState({});
    const {setUserId} = useContext(AuthContext);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    }

    function checkSignIn(event){
        event.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs)
        })
        .then((response) => {
            if (response.status === 200) return response.json();
            else if (response.status === 404) throw new Error("User not found");
            else throw new Error("Wrong password.")
        })
        .then((user) => {
            alert("Welcome back " + user.name + "!");
            setUserId(user.id);
            sessionStorage.setItem('loginUserId', JSON.stringify(user.id));
            window.location.href = "/";
        })
        .catch((error) => {
            alert(error.message);
        })
    }

    return (
        <>
            <div className="signInDiv">
                <form className="signInForm" onSubmit={checkSignIn}>
                    <h1 id="signInTitle" className="title"> Welcome back!</h1>
                    <label>
                        Email:<br />
                        <input type="email" name="email" value={inputs.email || ""} onChange={handleChange}/><br/><br/>
                    </label>
                    <label>
                        Password:<br />
                        <input type="password" name="password" value={inputs.password || ""} onChange={handleChange}/><br/><br/>
                    </label>
                    <input type="submit" value="Submit" className="submitButton"/>
                </form>
            </div>
            <div className="signUpDiv">
                <Link className="signUpLink" to="http://localhost:3000/sign-up">Not a member yet? Sign up!</Link>
            </div>
        </>
    )
}

export default SignIn;