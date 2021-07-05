import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "./../store/FirebaseStore";

const BoardContext = React.createContext(null);
const BoardProvider = ({ init, children }) => {
    const { db, HOST, LOC, firebase } = useContext(FirebaseContext);

    const getBoardContentList = (cb) => {
        var userDocRef = db.collection("board").doc(HOST).collection(LOC).get();
        var board_list = [];
        userDocRef.then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                board_list.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            cb(board_list);
        });
    };

    const getBoardDetailContent = (docName, cb) => {
        var userDocRef = db
            .collection("board")
            .doc(HOST)
            .collection(LOC)
            .doc(docName)
            .get()
            .then((result) => {
                cb(result.data());
            });
    };

    const addBoardContent = (title, author, content) => {
        if (title.length > 1 && author.length > 1 && content.length > 1) {
            var myFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(new Date());
            db.collection("board")
                .doc(HOST)
                .collection(LOC)
                .add({
                    title: title,
                    author: author,
                    content: content,
                    createdDate: myFirebaseFirestoreTimestampFromDate,
                })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    history.back();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            console.log("입력해라");
        }
    };

    const store = {
        getBoardContentList,
        addBoardContent,
        getBoardDetailContent,
    };

    return <BoardContext.Provider value={store}>{children}</BoardContext.Provider>;
};
export { BoardProvider, BoardContext };
