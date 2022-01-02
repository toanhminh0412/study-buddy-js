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
    // console.log(email, password);
    fireauth.createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        // console.log(userCredential)
        const uid = userCredential.user.uid;
        res.status(200).send({"userId": uid})
    })
    .catch((error) => {
        console.log(error)
        // const errorCode = error.code;
        // const errorMessage = error.message
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
        // console.log(userCredential)
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
        console.log('Success getting user profile')
        res.status(200).send({"userProfile": userProfileSnap.data()})
    } else {
        console.log("Error: Could not find user profile")
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
        "location": location
    };


    // Add a new user profile to the database
    try {
        await firestore.setDoc(firestore.doc(db, "profiles", profile_id), add_profile)
        await firestore.setDoc(firestore.doc(db, "likes", profile_id), {'liked_people': []})
        await firestore.setDoc(firestore.doc(db, "matches", profile_id), {'matched_people': []})
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
        console.log('User like database found')
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
        console.log('Like database found')
        senderLikes = senderSnap.data().liked_people;
    }
    if(!senderLikes.includes(receiverId)) {
        senderLikes.push(receiverId);
    }   
    try {
        await firestore.setDoc(firestore.doc(db, 'likes', senderId), {'liked_people': senderLikes})
        res.status(200).send({"message": "Add a liked person"})
    } catch (error) {
        res.status(400).send({"message": "Fail to like the person. Try again"})
    }

    const senderNotificationRef = firestore.doc(db, 'notifications', senderId);
    const receiverNotificationRef = firestore.doc(db, 'notifications', receiverId);
    const senderNotificationSnap = await firestore.getDoc(senderNotificationRef);
    const receiverNotificationSnap = await firestore.getDoc(receiverNotificationRef);
    let senderNotifications = [];
    if(senderNotificationSnap.exists()) {
        senderNotifications = senderNotificationSnap.data().notifications;
    }

    if(senderNotifications.length >= 25) {
        senderNotifications = senderNotifications.slice(senderNotifications.length-10, senderNotifications.length);
    }
    senderNotifications.push('You just received a like. Check out who it is!!')

    
    let receiverNotifications = [];
    if(receiverNotificationSnap.exists()) {
        receiverNotifications = receiverNotificationSnap.data().notifications;
    }

    if(receiverNotifications.length >= 25) {
        receiverNotifications = receiverNotifications.slice(receiverNotifications.length-10, receiverNotifications.length);
    }
    receiverNotifications.push('You just received a like. Check out who it is!!')

    try {
        await firestore.setDoc(firestore.doc(db, 'notifications', senderId), {'notifications': senderNotifications})
        await firestore.setDoc(firestore.doc(db, 'notifications', receiverId), {'notifications': receiverNotifications})
    } catch (error) {
        console.log(error);
    }
})

// add a new like for a person
app.post('/api/match', async (req, res) => {
    let senderId = req.body["senderId"];
    let receiverId = req.body["receiverId"];
    
    // Update sender match database
    const senderRef = firestore.doc(db, 'matches', senderId);
    const senderSnap = await firestore.getDoc(senderRef);
    let senderMatches = [];
    if(senderSnap.exists()) {
        console.log('Sender match database found')
        senderMatches = senderSnap.data().matched_people;
    }
    if (!senderMatches.includes(receiverId)) {
        senderMatches.push(receiverId);
    }

    // Update receiver match database
    const receiverRef = firestore.doc(db, 'matches', receiverId);
    const receiverSnap = await firestore.getDoc(receiverRef);
    let receiverMatches = [];
    if(receiverSnap.exists()) {
        console.log('Receiver match database found')
        receiverMatches = receiverSnap.data().matched_people;
    }
    if (!receiverMatches.includes(senderId)) {
        receiverMatches.push(senderId);
    }

    try {
        await firestore.setDoc(firestore.doc(db, 'matches', senderId), {'matched_people': senderMatches})
        await firestore.setDoc(firestore.doc(db, 'matches', receiverId), {'matched_people': receiverMatches})
        res.status(200).send({"message": "Add a matched person"})
    } catch (error) {
        res.status(400).send({"message": "Fail to match the person for sender. Try again"})
    }

    const senderNotificationRef = firestore.doc(db, 'notifications', senderId);
    const receiverNotificationRef = firestore.doc(db, 'notifications', receiverId);
    const senderNotificationSnap = await firestore.getDoc(senderNotificationRef);
    const receiverNotificationSnap = await firestore.getDoc(receiverNotificationRef);
    let senderNotifications = [];
    if(senderNotificationSnap.exists()) {
        senderNotifications = senderNotificationSnap.data().notifications;
    }

    if(senderNotifications.length >= 25) {
        senderNotifications = senderNotifications.slice(senderNotifications.length-10, senderNotifications.length);
    }
    senderNotifications.push('You have a new match. Check out who it is!!')

    
    let receiverNotifications = [];
    if(receiverNotificationSnap.exists()) {
        receiverNotifications = receiverNotificationSnap.data().notifications;
    }

    if(receiverNotifications.length >= 25) {
        receiverNotifications = receiverNotifications.slice(receiverNotifications.length-10, receiverNotifications.length);
    }
    receiverNotifications.push('You have a new match. Check out who it is!!')

    try {
        await firestore.setDoc(firestore.doc(db, 'notifications', senderId), {'notifications': senderNotifications})
        await firestore.setDoc(firestore.doc(db, 'notifications', receiverId), {'notifications': receiverNotifications})
    } catch (error) {
        console.log(error);
    }
})

// get all people that a person has liked
app.get('/api/match/:id', async(req, res) => {
    userId = req.params.id;
    const userMatchRef = firestore.doc(db, 'matches', userId);
    const userMatchSnap = await firestore.getDoc(userMatchRef);
    if(userMatchSnap.exists()) {
        console.log('User match database found')
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

    console.log(messageObject)

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

app.post('/api/notification/:id', async(req, res) => {
    userId = req.params.id;
    const newNotification = req.body.notification;
    const notificationRef = firestore.doc(db, 'notifications', userId);
    const notificationSnap = await firestore.getDoc(notificationRef);
    let notifications = [];
    if(notificationSnap.exists()) {
        notifications = notificationSnap.data().notifications;
    }
    if(notifications.length >= 25) {
        notifications = notifications.slice(notifications.length-10, notifications.length);
    }
    notifications.push(newNotification);
    let retNotifications = notifications.length < 3 ? notifications: notifications.slice(notifications.length-3, notifications.length)
    try {
        await firestore.setDoc(firestore.doc(db, 'notifications', userId), {'notifications': notifications});
        res.status(201).send({'recentNotifications': retNotifications})
    } catch (error) {
        res.status(400).send({'message': 'failed to add notification'});
    }

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});