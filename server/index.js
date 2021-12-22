// server/index.js
/* Setting up express js */
const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Convert all object requested to json
app.use(express.json())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

/* Setting up firebase */
const firebase =  require("firebase/app");
const firestore = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB1Q5uJDm7DM0q2WIFkPmyj0wjlqdkWPgc",
    authDomain: "study-buddy-63dfc.firebaseapp.com",
    projectId: "study-buddy-63dfc"
  });

const db = firestore.getFirestore();

/* Build RESTful API */
// Get all user profiles from firestore
app.get('/api/profiles', async (req, res) => {
    // res.status(200).send('Hello, here are some profiles')
    // Get data from cloud firestore
    profiles = []
    try {
        const profilesSnapshot = await firestore.getDocs(firestore.collection(db, 'profiles'));
        profilesSnapshot.forEach((profile) => {
            profiles.push(profile.data());
        })
        res.status(200).send(profiles);
    } catch (error) {
        res.status(400).send('Bad request. Please try again.')
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
        res.status(400).send('Bad request, missing subjects');
        return;
    }

    let studyingStyle = [];
    if (req.body.studyingStyle) {
        studyingStyle = req.body.studyingStyle;
    } else {
        res.status(400).send('Bad request, missing studying style');
        return;
    }

    let description = ""
    if (req.body.description) {
        description = req.body.description;
    } else {
        res.status(400).send('Bad request, missing description');
        return;
    }

    let status = "";
    if (req.body.status) {
        status = req.body.status;
    } else {
        res.status(400).send('Bad request, missing status');
        return;
    }

    let availability = req.body.availability ? req.body.availability : "";
    let location = req.body.location ? req.body.location : "";

    // Generate a random id 
    let d = new Date();
    let d_string = String(d.getTime());
    let profile_id = name.toLocaleLowerCase().replace(/\s/g, '') + d_string;
    
    add_profile = {
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
        res.status(201).send('Profile posted');
    } catch (error) {
        res.status(400).send('Bad request. Please try again');
    }
    

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});