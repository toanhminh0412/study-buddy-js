// server/index.js
/* Setting up express js */
const path = require('path');
const express = require("express");
const cors = require('cors');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'client/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({storage:storage})

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
const fireauth = require("firebase/auth")
const firestorage = require("firebase/storage");
const { ref } = require('firebase/storage');

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
    profiles = []
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

// Post an user profile picture to cloud storage
app.post('/api/profilepics', upload.single('profilePic'), async (req, res) => {
    try {
        console.log(req.file);
        file = req.file;
        res.status(200).send(req.file)
    } catch (error) {
        res.status(400).send({"message": "Error"})
    }
    /*
    const storage = firestorage.getStorage();
    */
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

    /*
    // Generate a random id 
    let d = new Date();
    let d_string = String(d.getTime());
    let profile_id = name.toLocaleLowerCase().replace(/\s/g, '') + d_string;
    */

    let profile_id = req.body.userId;

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
        
        res.status(201).send({"message": 'Profile posted'});
    } catch (error) {
        res.status(400).send({"message": 'Bad request. Please try again'});
    }
    

})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});