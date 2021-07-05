import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "./BoardStore";

const BoardList = () => {
    const [state, setState] = useState([]);
    const { getBoardContentList, getBoardDetailContent } = useContext(BoardContext);
    const getBoardCallBack = (arg) => {
        console.log(arg);
        setState(arg);
    };

    useEffect(() => {
        getBoardContentList(getBoardCallBack);
    }, []);

    return (
        <div className="BoardList">
            BOARD LIST
            <Link to="/board/new">글쓰기</Link>
            {state.map((it) => (
                <div style={{ marginBottom: "10px", border: "1px solid gray", padding: "10px" }}>
                    {it.data.content}
                    <div>
                        <Link to={`/board/${it.id}`}>게시글 이동</Link>
                    </div>
                    <div>
                        <button onClick={() => getBoardDetailContent(it.id)}>{it.id}</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardList;
