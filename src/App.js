import React, {useContext, useEffect, useState} from 'react';
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';

import SignIn from "./pages/auth/SignIn";
import TextEditor from "./pages/post/TextEditor"
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import SignOut from "./pages/auth/SignOut"
import Blog from "./pages/post/Blog"
import SignUp from "./pages/auth/SignUp"
import Post from "./pages/post/Post"

import './App.css'
import {AuthContext} from "./pages/auth/Authenticator";

function copyContent(){
    let button = document.getElementById("emailButton");
    navigator.clipboard.writeText(button.innerText);
    alert("Copied!");
}
function App() {
    const [blogPosts, setBlogPosts] = useState([]);
    const {userId, setUserId} = useContext(AuthContext);
    useEffect(() => {
        fetch("/fetchBlogPosts", {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
            .then((response) => {
                if (response.status === 200) return response.json();
                else throw new Error("No posts.")
            })
            .then((posts) => setBlogPosts(posts))
            .catch((error) => {})
    }, []);

    const handleSignOut = () => {
        setUserId('');
        sessionStorage.clear();
        window.location.href = "/";
    };

    return (
            <BrowserRouter>
                <div className="header">
                    {/* Link to the home page */}
                    <Link to="/" id="logoLink"><img className="logoLink" src="/images/Logo.png" alt="Logo" width="250" /></Link>
                    <p id="userNameP">Please log in!</p>
                </div>

                {/* Render the appropriate component based on the URL */}
                <Routes id="navBarRoutes">
                    <Route path="/" element={<NavBar />}>
                        {/* Render Home component when the URL matches / */}
                        <Route index element={<Home />} />
                        <Route path="sign-up" element={<SignUp />} />
                        <Route path="blog" element={<Blog />} />
                        <Route path="text-editor" element={<TextEditor />} />
                        {userId === '' ? (
                            <Route path="sign-in" element={<SignIn />} />
                        ) : (
                            <Route path="sign-out" element={<SignOut handleSignOut={handleSignOut} />} />
                        )}
                        {blogPosts && blogPosts.reverse().map((post) => (
                            <Route path={"/blog/" + post.title + "/" + post.postId} element={<Post id={post.postId}/>} />
                        ))}
                    </Route>
                </Routes>
                <div className="footer">
                    <p>Developer : Diane Shin</p>
                    <p>Email : <button id="emailButton" className="emailButton" onClick={copyContent}>jadore845@snu.ac.kr</button></p>
                    <p>Github : <button id="emailButton" className="emailButton" onClick={() => window.location.href = "https://github.com/DianeShin"}>Here</button></p>
                </div>
            </BrowserRouter>
    );
}

export default App;