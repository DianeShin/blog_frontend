import './TextEditor.css'
import {useContext} from "react";
import {AuthContext} from "../auth/Authenticator";

const fontSizeSelect = (event) => {
    const textAreaElem = document.getElementById("textEditorText");
    textAreaElem.style.fontSize = event.target.value;
}

const quoteHandler = () => {
    const textAreaElem = document.getElementById("textEditorText");
    const start = textAreaElem.selectionStart;
    const end = textAreaElem.selectionEnd;
    const selectedText = textAreaElem.value.slice(start,end);
    textAreaElem.value = textAreaElem.value.slice(0, start) + '"' + selectedText + '"' + textAreaElem.value.slice(end);
}

const copyHandler = () => {
    const textAreaElem = document.getElementById("textEditorText");
    navigator.clipboard.writeText(textAreaElem.value);
    alert("Copied!");
}

const charCountHandler = () => {
    const charCountElem = document.getElementById("charCountButton");
    const textAreaElem = document.getElementById("textEditorText");
    charCountElem.innerText = textAreaElem.value.length + " characters";
}


const TextEditor = () => {
    const {userId} = useContext(AuthContext);
    const handlePost = () => {
        const textAreaElem = document.getElementById("textEditorText");
        const titleElem = document.getElementById("titleText");
        const newPost = {
            userId: userId,
            title : titleElem.value,
            content: textAreaElem.value
        }

        fetch("/uploadBlogPost", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(newPost)
        })
        .then((response) => response.text())
        .then((text) => {
            alert(text)
            window.location.href = "/blog";
        });
    }

    return(
        <div id="textEditor">
            <h2 id = "textEditorTitle">Text Editor</h2>
            <div id = "textEditorArea">
                <div id = "textEditorTools">
                    <button onClick={quoteHandler}>quote</button>
                    <button onClick={copyHandler}>copy</button>
                    <select id = "fontSizeSelect" onChange = {fontSizeSelect}>
                        <option value = "12px">12pt</option>
                        <option value = "16px">16pt</option>
                        <option value = "20px">20pt</option>
                    </select>
                    <button id = "charCountButton">0 Characters</button>
                </div>
                <textarea id = "titleText" placeholder="Title"></textarea>
                <textarea id = "textEditorText" placeholder="Body" onChange={charCountHandler}></textarea>
                <button onClick={handlePost}>Submit</button>
            </div>

        </div>
    )
}

export default TextEditor;