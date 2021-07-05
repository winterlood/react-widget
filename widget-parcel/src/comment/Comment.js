import firebase from "firebase";
import "firebase/firestore";

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
                    console.log("Document written with ID: ", docRef.id);
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
                console.log(doc.id, " => ", doc.data());
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

const A