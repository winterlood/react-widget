import React, { useState, useEffect, useContext } from "react";
import { BoardContext } from "./BoardStore";
function displayedAt(createdAt) {
    const milliSeconds = new Date() - createdAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
}
const BoardDetail = ({ match }) => {
    const [state, setState] = useState();

    const { getBoardDetailContent } = useContext(BoardContext);
    const id = match.params.id;

    const getBoardDetailContentCallBack = (arg) => {
        setState(arg);
    };

    useEffect(() => {
        if (id) {
            getBoardDetailContent(id, getBoardDetailContentCallBack);
        }
    }, [id]);
    return (
        <div className="BoardDetail">
            DETAIL {id}
            {state && (
                <>
                    <div>
                        <h1>{state.title}</h1>
                    </div>
                    <div>작성자 : {state.author}</div>
                    <div>작성일 : {displayedAt(new Date(state?.createdDate?.seconds * 1000))}</div>
                    <div>본문 : {state.content}</div>
                </>
            )}
        </div>
    );
};

export default BoardDetail;
