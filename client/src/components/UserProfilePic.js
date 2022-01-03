import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../App";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UserProfilePic() {
    const navigate = useNavigate();

    const [profilePic, setProfilePic] = useState(null)
    const [profilePicName, setProfilePicName] = useState("");

    const changeProfilePic = e => {
        if (e.target.files[0]) {
            setProfilePic(e.target.files[0]);
            let picName = e.target.files[0].name + "-" + Date.now()
            setProfilePicName(picName)
        }
        // console.log(e.target.files[0]);
    }

    const submitProfilePic = e => {
        e.preventDefault();
        // console.log(profilePic);
        // console.log(profilePicName);
        let editPic = window.localStorage.getItem('editPic');
        if(editPic === "false") {
            if (profilePic !== null && profilePicName !== "") {
                let profilePicRef = ref(storage, `images/${profilePicName}`);
                uploadBytes(profilePicRef, profilePic).then((snapshot) => {
                console.log('Profile picture uploaded');
                getDownloadURL(profilePicRef)
                .then((url) => {
                    console.log(url);
                    window.localStorage.setItem('profilePic', url);
                    navigate('/user-profile');
                })
            })
            } else {
                window.localStorage.setItem('profilePic', 'https://firebasestorage.googleapis.com/v0/b/study-buddy-63dfc.appspot.com/o/images%2Fblank.jpg-1641196683053?alt=media&token=daa74371-1e91-4aab-9697-7eb39cd6810d');
                navigate('/user-profile')
            }
        } else {
            if (profilePic !== null && profilePicName !== "") {
                let profilePicRef = ref(storage, `images/${profilePicName}`);
                uploadBytes(profilePicRef, profilePic).then((snapshot) => {
                console.log('Profile picture uploaded');
                getDownloadURL(profilePicRef)
                .then((url) => {
                    console.log(url);
                    window.localStorage.setItem('profilePic', url);
                    window.localStorage.setItem('editPic', "false");
                    window.localStorage.setItem('editDetails', "true");
                    navigate('/user-profile');
                })
                })
            } else {
                window.localStorage.setItem('editPic', "false");
                window.localStorage.setItem('editDetails', "true");
                navigate('/user-profile');
            }  
    }}
    
    return (
        <div>
            <h1 className='font-medium text-5xl mt-8 sm:ml-4 lg:ml-12'>Upload profile picture</h1>
            <form className='profile-form mt-4 flex flex-col' encType="multipart/form-data" onSubmit={submitProfilePic}>
                <label className='text-2xl font-light ml-8 lg:ml-20' htmlFor="profilePic">Profile Picture</label>
                <input className='ml-8 lg:ml-20' type="file" name="profilePic" onChange={changeProfilePic}/>
                <input className='w-16 h-8 bg-red-500 hover:bg-red-700 rounded-sm ml-8 lg:ml-20 text-white mt-6 mb-4' type='submit' value='Post'/>
            </form>
        </div>
    )
}