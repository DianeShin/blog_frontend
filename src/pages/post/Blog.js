import {useContext, useEffect, useState} from "react";
import './Blog.css'
import {AuthContext} from "../auth/Authenticator";
import {Link} from "react-router-dom";
import {getUserById} from "../auth/userHelper";
function Blog() {
    const [blogPosts, setBlogPosts] = useState([]);
    const {userId} = useContext(AuthContext);

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
            .then((posts) => {
                const getUserPromises = posts.map((post) =>
                    getUserById(post.userId).then((userObj) => (post.userName = userObj.name))
                );

                // Wait for all promises to be resolved before updating the state
                Promise.all(getUserPromises).then(() => {
                    setBlogPosts(posts);
                });
            })
            .catch((error) => {});
    }, []);

    function handleDelete(postId){
        const data = {
            postId: postId,
            userId: userId
        };
        fetch("/deleteBlogPost", {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.text())
        .then((text) => {
            if (text === "OK"){
                alert("Post deleted.");
                setBlogPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
            }
            else alert(text);
        })
        .catch((error) => alert("Something didn't go right."))
    }

    return(
        <>
            <h2 id="blogTitle">Blog Posts</h2>
            {blogPosts && blogPosts.reverse().map((post) => (
                <div className="blogDiv" key={post.id}>
                    <Link className="postLink" to={post.title + "/" + post.postId}><h2 className="postTitle">{post.title}</h2></Link>
                <p className="postContent">{post.content}</p>
                    <p className="author">By : {post.userName}</p>
                    { userId === post.userId && <button onClick={() => handleDelete(post.postId)}>Delete Post</button>}
                </div>
            ))}
            {blogPosts.length === 0 &&
                <h3 id={"no-post-h"}>No posts! Write something ;)</h3>
            }
        </>
    )
}

export default Blog;