import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useField} from "../hooks/index.js";

const CreateNew = ({addNew, notify}) => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [info, setInfo] = useState("");

    // hook to redirect back home after creation
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content,
            author,
            info,
            votes: 0,
        });
        navigate("/");
        notify(`Anecdote created: ${content}`);
        setTimeout(() => {
            notify("");
        }, 5000);
    };

    // set up hooks for each field
    const contentHook = useField("text");
    const authorHook = useField("text");
    const infoHook = useField("text");

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input
                        {...contentHook}
                    />
                </div>
                <div>
                    author
                    <input
                        {...authorHook}
                    />
                </div>
                <div>
                    url for more info
                    <input
                        {...infoHook}
                    />
                </div>
                <button>create</button>
                <button type={"button"} onClick={()=>{
                    contentHook.reset();
                    authorHook.reset();
                    infoHook.reset();
                }}>reset</button>
            </form>
        </div>
    );
};

export default CreateNew;
