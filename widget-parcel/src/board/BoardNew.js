import React, { useState, useEffect, useContext } from "react";
import { BoardContext } from "./BoardStore";

const useInput = () => {
    const [value, setValue] = useState("");
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return { value, onChange };
};

const BoardNew = () => {
    const { addBoardContent } = useContext(BoardContext);

    const title = useInput();
    const author = useInput();
    const content = useInput();

    const sumbit = () => {
        addBoardContent(title.value, author.value, content.value);
    };
    return (
        <div className="BoardNew">
            <div>
                <input {...title} type="text" placeholder="제목" />
            </div>
            <div>
                <input {...author} type="text" placeholder="작성자" />
            </div>
            <div>
                <textarea {...content} placeholder="본문" />
            </div>
            <div>
                <button onClick={() => sumbit()}>글 작성 완료</button>
            </div>
        </div>
    );
};

export default BoardNew;
