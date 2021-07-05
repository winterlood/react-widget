import React, { useEffect, useReducer, useState } from "react";
import "./style.scss";
import firebase from "firebase";
import "firebase/firestore";
import Board from "./board/Board";
import { FirebaseProvider } from "./store/FirebaseStore";

const HOST = encodeURIComponent("https://somuneza.site");
const LOC = encodeURIComponent("https://somuneza.site/12312322");

const CommentList = ({ commentList }) => {
    const CommentItem = (props) => {
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
        const date = new Date(props?.createdDate?.seconds * 1000);
        return (
            <div className="CommentItem">
                <div className="author">작성자 : {props.author}</div>
                <div>{displayedAt(date)}</div>
                <div className="comment">{props.comment}</div>
            </div>
        );
    };

    const sortedCommentList = commentList.sort(function (a, b) {
        return a.createdDate > b.createdDate ? -1 : a.createdDate < b.createdDate ? 1 : 0;
    });

    return (
        <div>
            {sortedCommentList.map((it) => (
                <CommentItem key={it.id} {...it} />
            ))}
        </div>
    );
};
const CommentForm = ({ addComment }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_SITE": {
                return {
                    ...state,
                    site: action.data,
                };
            }
            case "SET_LOC": {
                return {
                    ...state,
                    loc: action.data,
                };
            }
            case "SET_AUTHOR": {
                return {
                    ...state,
                    author: action.data,
                };
            }
            case "SET_COMMENT": {
                return {
                    ...state,
                    comment: action.data,
                };
            }

            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, {
        author: "",
        comment: "",
    });
    return (
        <div className="CommentForm">
            <div className="author_box">
                <input
                    type="text"
                    value={state.author}
                    placeholder={"작성자를 입력해주세요"}
                    onChange={(e) => dispatch({ type: "SET_AUTHOR", data: e.target.value })}
                />
            </div>
            <div className="content_box">
                <textarea
                    style={{ width: "100%", height: "50px" }}
                    type="textarea"
                    placeholder={"댓글을 입력해주세요"}
                    value={state.comment}
                    onChange={(e) => dispatch({ type: "SET_COMMENT", data: e.target.value })}
                />
            </div>
            <div className="submit_box">
                <button onClick={() => addComment(state.author, state.comment)}>ADD COMMENT</button>
            </div>
        </div>
    );
};
const Comment = () => {
    const [commentList, setCommentList] = useState([]);
    const addComment = (author, comment) => {
        if (author.length > 1 && comment.length > 1) {
            var myFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(new Date());
            db.collection("comment")
                .doc(HOST)
                .collection(LOC)
                .add({
                    author: author,
                    comment: comment,
                    createdDate: myFirebaseFirestoreTimestampFromDate,
                })
                .then((docRef) => {
                    getComment();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            console.log("입력해라");
        }
    };
    const getComment = () => {
        var userDocRef = db.collection("comment").doc(HOST).collection(LOC);

        var comment_list = [];
        userDocRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                comment_list.push({
                    id: doc.id,
                    author: doc.data().author,
                    comment: doc.data().comment,
                    createdDate: doc.data().createdDate,
                });
            });
            setCommentList(comment_list);
        });
    };
    useEffect(() => {
        getComment();
    }, []);
    return (
        <div>
            <CommentForm addComment={addComment} />
            <CommentList commentList={commentList} />
        </div>
    );
};

const App = ({ domElement }) => {
    console.log(domElement);
    const widgetType = domElement.getAttribute("widget-type");
    const ownerId = domElement.getAttribute("ownerid");

    console.log(ownerId);
    console.log(widgetType);

    return (
        <FirebaseProvider>
            <div>
                {widgetType === "comment" && <Comment />}
                {widgetType === "board" && <Board />}
            </div>
        </FirebaseProvider>
    );
};

export default App;
