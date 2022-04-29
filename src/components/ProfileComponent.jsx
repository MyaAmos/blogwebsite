import { Component } from "react";
import { auth } from "../firebase-config";
import './ProfileComponent.css'

class ProfileComponent extends Component{

    render(){
        return(
            <div className="profile">
                <div>
                    <h2>Your Profile</h2>
                </div>
                <div>
                    <p>Name: {auth.currentUser.displayName}</p>
                    <p>Email: {auth.currentUser.email}</p>
                </div>
            </div>
        );
    };
}

export default ProfileComponent;