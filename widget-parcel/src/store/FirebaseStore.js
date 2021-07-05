import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCh6HqY3ecTgHP3UcwXnx_rO8WCKBlanIg",
    authDomain: "system-monitor-6737e.firebaseapp.com",
    databaseURL: "https://system-monitor-6737e.firebaseio.com",
    projectId: "system-monitor-6737e",
    storageBucket: "system-monitor-6737e.appspot.com",
    messagingSenderId: "382753654296",
    appId: "1:382753654296:web:a412a8c5bf89c815ab656d",
    measurementId: "G-PKTL22FSB2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore(); //store 사용

const HOST = encodeURIComponent("https://somuneza.site");
const LOC = encodeURIComponent("https://somuneza.site/12312322");

const FirebaseContext = React.createContext(null);
const FirebaseProvider = ({ init, children }) => {
    const store = {
        db,
        HOST,
        LOC,
        firebase,
    };
    return <FirebaseContext.Provider value={store}>{children}</FirebaseContext.Provider>;
};
export { FirebaseProvider, FirebaseContext };
