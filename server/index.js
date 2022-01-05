// server/index.js
/* Setting up express js */
const path = require('path');
const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

// Allow CORS for the client
app.use(
    cors({
        origin: "*"
    })
)

// Convert all object requested to json
app.use(express.json())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

/* Setting up firebase */
const firebase =  require("firebase/app");
const firestore = require("firebase/firestore");
const fireauth = require("firebase/auth");

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB1Q5uJDm7DM0q2WIFkPmyj0wjlqdkWPgc",
    authDomain: "study-buddy-63dfc.firebaseapp.com",
    projectId: "study-buddy-63dfc",
    storageBucket: "study-buddy-63dfc.appspot.com",
    messagingSenderId: "507104695623",
    appId: "1:507104695623:web:d45fec11754265c0816862"
  });

const db = firestore.getFirestore();

/* Build RESTful API */
// Signup a new user
app.post('/api/signup/users', async(req, res) => {
    const auth = fireauth.getAuth();
    email = req.body.email;
    password = req.body.password;
    fireauth.createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const uid = userCredential.user.uid;
        res.status(200).send({"userId": uid})
    })
    .catch((error) => {
        res.status(400).send({"message": "Bad request. Please try again"});
    })
})

// Login an user
app.post('/api/login/users', async(req, res) => {
    const auth = fireauth.getAuth();
    email = req.body.email;
    password = req.body.password;
    fireauth.signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const uid = userCredential.user.uid;
        res.status(200).send({"userId": uid})
    })
    .catch((error) => {
        res.status(404).send({"message": "Invalid credential. Please try again."})
    })
})

// Log out an user 
app.get('/api/logout/users', async(req, res) => {
    const auth = fireauth.getAuth();
    fireauth.signOut(auth).then(() => {
        //Sign-out successful
        res.status(200).send({"message": "Sign out successfully"})
    }).catch((error) => {
        res.status(400).send({"message": "Sign out failed"})
    })
})

// Get all user profiles from firestore
app.get('/api/profiles', async (req, res) => {
    // Get data from cloud firestore
    let profiles = []
    try {
        const profilesSnapshot = await firestore.getDocs(firestore.collection(db, 'profiles'));
        profilesSnapshot.forEach((profile) => {
            profiles.push(profile.data());
        })
        res.status(200).send(profiles);
    } catch (error) {
        res.status(400).send({"message": "Bad request. Please try again."})
    }
    
})

// Get a specific user profile
app.get('/api/profiles/:id', async function(req, res) {
    userId = req.params.id;
    const userProfileRef = firestore.doc(db, "profiles", userId);
    const userProfileSnap = await firestore.getDoc(userProfileRef)
    if(userProfileSnap.exists()) {
        res.status(200).send({"userProfile": userProfileSnap.data()})
    } else {
        res.status(404).send({"message": "Didn't find a profile related to this user"})
    }
})

// Post an user profile to firestore
app.post('/api/profiles', async (req, res) => {
    // res.status(200).send('Profile posted')
    let name = "";
    if (req.body["name"]) {
        name = req.body["name"];
    } else {
        res.status(400).send({'message': 'Bad request, missing name'});
        return;
    }

    let age = req.body.age ? req.body.age : -1;
    let studyYear = req.body.studyYear ? req.body.studyYear : -1;
    let profilePic = req.body.profilePic ? req.body.profilePic : "";
    let department = req.body.department ? req.body.department : "";
    
    let subjects = [];
    if (req.body.subjects) {
        subjects = req.body.subjects;
    } else {
        res.status(400).send({'message': 'Bad request, missing subjects'});
        return;
    }

    let studyingStyle = [];
    if (req.body.studyingStyle) {
        studyingStyle = req.body.studyingStyle;
    } else {
        res.status(400).send({'message': 'Bad request, missing studying style'});
        return;
    }

    let description = ""
    if (req.body.description) {
        description = req.body.description;
    } else {
        res.status(400).send({'message': 'Bad request, missing description'});
        return;
    }

    let status = "";
    if (req.body.status) {
        status = req.body.status;
    } else {
        res.status(400).send({'message': 'Bad request, missing status'});
        return;
    }

    let availability = req.body.availability ? req.body.availability : "";
    let location = req.body.location ? req.body.location : "";

    let profile_id = req.body.userId;

    add_profile = {
        "userId": profile_id,
        "name": name,
        "age": age,
        "studyYear": studyYear,
        "profilePic": profilePic,
        "department": department,
        "subjects": subjects,
        "studyingStyle": studyingStyle,
        "description": description,
        "status": status,
        "availability": availability,
        "location": location,
        "locationGeo": req.body.locationGeo
    };


    // Add a new user profile to the database
    try {
        await firestore.setDoc(firestore.doc(db, "profiles", profile_id), add_profile)
        await firestore.setDoc(firestore.doc(db, "likes", profile_id), {'user': profile_id, 'liked_people': []})
        await firestore.setDoc(firestore.doc(db, "matches", profile_id), {'user': profile_id, 'matched_people': []})
        res.status(201).send({"message": 'Profile posted'});
    } catch (error) {
        res.status(400).send({"message": 'Bad request. Please try again'});
    }
    

})

// get all people that a person has liked
app.get('/api/like/:id', async(req, res) => {
    userId = req.params.id;
    const userLikeRef = firestore.doc(db, 'likes', userId);
    const userLikeSnap = await firestore.getDoc(userLikeRef);
    if(userLikeSnap.exists()) {
        let likes = userLikeSnap.data().liked_people;
        res.status(200).send({'liked_people': likes})
    } else {
        res.status(200).send({'liked_people': []})
    }
})

// add a new like for a person
app.post('/api/like', async (req, res) => {
    let senderId = req.body["senderId"];
    let receiverId = req.body["receiverId"];
    const senderRef = firestore.doc(db, 'likes', senderId);
    const senderSnap = await firestore.getDoc(senderRef);
    let senderLikes = [];
    if(senderSnap.exists()) {
        senderLikes = senderSnap.data().liked_people;
    }
    if(!senderLikes.includes(receiverId)) {
        senderLikes.push(receiverId);
    }   
    try {
        await firestore.setDoc(firestore.doc(db, 'likes', senderId), {'user': senderId,'liked_people': senderLikes})
    } catch (error) {
        res.status(400).send({"message": "Fail to like the person. Try again"})
    }

    const receiverRef = firestore.doc(db, 'likes', receiverId);
    const receiverSnap = await firestore.getDoc(receiverRef);
    if (receiverSnap.exists()) {
        if (receiverSnap.data().liked_people.includes(senderId)) {
            const senderMatchRef = firestore.doc(db, 'matches', senderId);
            const senderMatchSnap = await firestore.getDoc(senderMatchRef);
            let senderMatches = [];
            if (senderMatchSnap.exists()) {
                senderMatches = senderMatchSnap.data().matched_people;
            }
            senderMatches.push(receiverId);

            const receiverMatchRef = firestore.doc(db, 'matches', receiverId);
            const receiverMatchSnap = await firestore.getDoc(receiverMatchRef);
            let receiverMatches = [];
            if (receiverMatchSnap.exists()) {
                receiverMatches = receiverMatchSnap.data().matched_people;
            }
            receiverMatches.push(senderId);
            
            try {
                await firestore.setDoc(senderMatchRef, {'user': senderId, 'matched_people': senderMatches})
                await firestore.setDoc(receiverMatchRef, {'user': receiverId, 'matched_people': receiverMatches})
            } catch (error) {
                console.log(error);
            }

            const senderNotificationSnap = await firestore.getDoc(firestore.doc(db, 'notifications', senderId));
            const receiverNotificationSnap = await firestore.getDoc(firestore.doc(db, 'notifications', receiverId));

            let senderNotifications = [];
            let receiverNotifications = [];
            if (senderNotificationSnap.exists()) {
                senderNotifications = senderNotificationSnap.data().notifications;
            }
            senderNotifications.push("You have a new match. Check out who it is");
            if (receiverNotificationSnap.exists()) {
                receiverNotifications = receiverNotificationSnap.data().notifications;
            }
            receiverNotifications.push("You have a new match. Check out who it is");
            try {
                await firestore.setDoc(firestore.doc(db, 'notifications', senderId), {'notifications': senderNotifications})
                await firestore.setDoc(firestore.doc(db, 'notifications', receiverId), {'notifications': receiverNotifications})
            } catch (error) {
                console.log(error);
            }
        }
    }

    const notificationRef = firestore.doc(db, 'notifications', receiverId);
    const notificationSnap = await firestore.getDoc(notificationRef);
    let notifications = [];
    if(notificationSnap.exists()) {
        notifications = notificationSnap.data().notifications;
    }
    if(notifications.length >= 25) {
        notifications = notifications.slice(notifications.length-10, notifications.length);
    }
    notifications.push("You just received a new like. Check out who it is!!")
    try {
        await firestore.setDoc(firestore.doc(db, 'notifications', receiverId), {'notifications': notifications})
    } catch (error) {
        console.log(error);
    }

    res.status(200).send({"message": "Add a liked person"})
})

// unlike a person
app.post('/api/unlike', async(req, res) => {
    senderId = req.body.senderId;
    receiverId = req.body.receiverId;
    const senderLikesSnap = await firestore.getDoc(firestore.doc(db, 'likes', senderId));
    const senderMatchesSnap = await firestore.getDoc(firestore.doc(db, 'matches', senderId));
    let senderLikes = []
    if (senderLikesSnap.exists()) {
        senderLikes = senderLikesSnap.data().liked_people;
    }
    senderLikes = senderLikes.filter(personId => personId !== receiverId);
    let senderMatches = []
    if (senderMatchesSnap.exists()) {
        senderMatches = senderMatchesSnap.data().matched_people;
    }
    senderMatches = senderMatches.filter(personId => personId !== receiverId);

    const receiverMatchesSnap = await firestore.getDoc(firestore.doc(db, 'matches', receiverId));
    let receiverMatches = []
    if (receiverMatchesSnap.exists()) {
        receiverMatches = receiverMatchesSnap.data().matched_people;
    }
    receiverMatches = receiverMatches.filter(personId => personId !== senderId);
    try {
        await firestore.setDoc(firestore.doc(db, 'likes', senderId), {'user': senderId, 'liked_people': senderLikes})
        await firestore.setDoc(firestore.doc(db, 'matches', senderId), {'user': senderId, 'matched_people': senderMatches})
        await firestore.setDoc(firestore.doc(db, 'matches', receiverId), {'user': receiverId, 'matched_people': receiverMatches})
        res.status(200).send({"message": "Unlike successfully"})
    } catch(error) {
        res.status(400).send({"message": "Failed to unlike. Please try again"})
    }
})

// get all people that a person has matched
app.get('/api/match/:id', async(req, res) => {
    userId = req.params.id;
    const userMatchRef = firestore.doc(db, 'matches', userId);
    const userMatchSnap = await firestore.getDoc(userMatchRef);
    if(userMatchSnap.exists()) {
        let matches = userMatchSnap.data().matched_people;
        res.status(200).send({'matched_people': matches})
    } else {
        res.status(200).send({'matched_people': []})
    }
})

// Get all messages from the database
app.get('/api/message', async(req, res) => {
    let messages = []
    try {
        const messagesSnapshot = await firestore.getDocs(firestore.collection(db, 'chat server'));
        messagesSnapshot.forEach((message) => {
            messages.push(message.data());
        })
        res.status(200).send({"messages": messages})
    } catch (error) {
        res.status(404).send({"message": "No messages were found"})
    }
})

// add user messages
app.post('/api/message', async(req, res) => {
    
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const d = new Date();
    let msString = String(d.valueOf());
    let messageId = "msg" + msString;

    const messageObject = {
        "messageId": messageId,
        "senderId": req.body.senderId,
        "senderPic": req.body.senderPic,
        "senderName": req.body.senderName,
        "receiverId": req.body.receiverId,
        "receiverPic": req.body.receiverPic,
        "receiverName": req.body.receiverName,
        "message": req.body.message,
        "sendTime": Date.now()
    }

    try {
        await firestore.setDoc(firestore.doc(db, "chat server", messageId), messageObject);
        // res.status(201).send({"message": "Message sent"});
    } catch (error) {
        res.status(400).send({"message": "Fail to send message"});
        return;
    }

    let messages = []
    try {
        const messagesSnapshot = await firestore.getDocs(firestore.collection(db, 'chat server'));
        messagesSnapshot.forEach((message) => {
            messages.push(message.data());
        })
        res.status(200).send({"messages": messages})
    } catch (error) {
        res.status(404).send({"message": "No messages were found"})
    }

    const notificationRef = firestore.doc(db, 'notifications', receiverId);
    const notificationSnap = await firestore.getDoc(notificationRef);
    let notifications = [];
    if(notificationSnap.exists()) {
        notifications = notificationSnap.data().notifications;
    }
    if(notifications.length >= 25) {
        notifications = notifications.slice(notifications.length-10, notifications.length);
    }
    notifications.push(`You received a new message from ${req.body.senderName}. Check out what it is!!`)
    try {
        await firestore.setDoc(firestore.doc(db, 'notifications', receiverId), {'notifications': notifications})
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});