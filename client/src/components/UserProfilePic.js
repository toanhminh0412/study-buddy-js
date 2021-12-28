import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfilePic() {
    const navigate = useNavigate();

    const [profilePic, setProfilePic] = useState(null)

    const changeProfilePic = e => {
        if (e.target.files[0]) {
            setProfilePic(e.target.files[0]);
        }
        console.log(e.target.files[0]);
    }

    const submitProfilePic = e => {
        e.preventDefault();
        const data = new FormData();
        data.append('profilePic', profilePic);
        //console.log(data);
        fetch('/api/profilepics', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: data
        }).then((response) => response.json())
        .then(data => {
            console.log(data);
            let profilePicPath = data["destination"].slice(14, data["destination"].length) + "/" + data["filename"];
            console.log(profilePicPath);
            window.localStorage.setItem('profilePic', profilePicPath);
            navigate('/user-profile')
        })
        .catch((error) => {
            console.log("Error:", error)
        })
    }
    
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