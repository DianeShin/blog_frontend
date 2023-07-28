import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../auth/Authenticator";
import {getUserById} from "../auth/userHelper";
import './Comment.css'
export const Comment = (props) => {
    const [comments, setComments] = useState([]);
    const [commentChange, setCommentChange] = useState(false);
    const {userId} = useContext(AuthContext);

    const data = {
        id : props.postId
    }

    useEffect( () => {

        fetch("/fetchCommentsByPostId", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((commentList) => {
                const getUserPromises = commentList.map((comment) =>
                    getUserById(comment.userId).then((userObj) => (comment.userName = userObj.name))
                );

                // Wait for all promises to be resolved before updating the state
                Promise.all(getUserPromises).then(() => {
                    setComments(commentList);
                });
            });
    }, [props.postId, commentChange])


    function handleCommentPost() {
        const titleElem = document.getElementById("commentTitleText");
        const contentElem = document.getElementById("commentContentText");

        if (userId === ''){
            alert("You need to login to comment!");
            window.location.href = "/sign-in";
        }
        else{
            const newComment = {
                postId: props.postId,
                userId: userId,
                title: titleElem.value,
                content: contentElem.value
            }

            fetch("/uploadComment", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(newComment)
            })
                .then((response) => response.text())
                .then((text) => {
                    alert("Comment uploaded!");
                    titleElem.value = '';
                    contentElem.value = '';
                    setCommentChange(!commentChange);
                });
        }

    }

    function handleDelete(commentId){
        const data = {
            postId: props.postId,
            commentId: commentId,
            userId: userId
        };
        fetch("/deleteComment", {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.text())
            .then((text) => {
                if (text === "OK"){
                    alert("Comment deleted.");
                    setComments((prevComments) => prevComments.filter((comment) => comment.commentId !== commentId));
                    setCommentChange(!commentChange);
                }
                else alert(text);
            })
            .catch((error) => alert("Something didn't go right."))
    }

    return(
        <div id="commentDiv">
            <h2>Comments</h2>
            <div id="commentPostDiv">
                <textarea id = "commentTitleText" placeholder="Title"></textarea><br/>
                <div id="nextLine">
                    <textarea id = "commentContentText" placeholder="Comment"></textarea>
                    <button id = "commentPostButton" onClick={handleCommentPost}>Submit</button>
                </div>

            </div>

            <div id="commentContentDiv">
                {comments && comments.reverse().map((comment) => (
                    <div className="commentDiv" key={comment.commentId}>
                        <h3 className="commentTitle">{comment.title}</h3>
                        <p className="commentContent">{comment.content}</p>
                        <div className="rightAlignedDiv">
                            <p className="author">By : {comment.userName}</p>
                        </div>

                        <div className="rightAlignedDiv">
                            { userId === comment.userId && <button className="deleteButton" onClick={() => handleDelete(comment.commentId)}>Delete Comment</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comment;