import {useEffect, useState} from "react";
import './Post.css'
import {getUserById} from "../auth/userHelper";
import Comment from "./Comment";

const Post = (props) => {
    const [post, setPost] = useState('');
    const [userName, setUserName] = useState('');

    const data = {
        id: props.id
    }

    useEffect(() => {
        fetch("/fetchBlogPostById", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((postResponse) => {
                setPost(postResponse);
                if(postResponse.userId) getUserById(postResponse.userId).then((userObj) => setUserName(userObj.name));
            });

    }, []);

    return (
        <div className="postDiv">
            <h1 className="postTitle">{post.title}</h1>
            <p className="postAuthor">{userName}</p>
            <p className="postContent">{post.content}</p>
            <Comment postId={post.postId}/>
        </div>
    )
}
export default Post;