import React, {createContext, useEffect, useState} from "react";
import {getUserById} from "./userHelper";

export const AuthContext = createContext("");

export default ({children}) => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        // fetch info
        const userNameP = document.getElementById("userNameP");
        const userId = JSON.parse(sessionStorage.getItem('loginUserId'));
        // if no userId, inform user to login.
        if (!userId) userNameP.innerText = `Please log in!`;
        // if userId, display logged-in user.
        else{
            getUserById(userId)
                .then((userObj) => {
                    if(userObj) userNameP.innerText = `Hello ${userObj.name}!`;
                    setUserId(userId);
                })
        }


    }, [userId]);

    return(
        <AuthContext.Provider
            value={{
                userId,
                setUserId
            }}>
            {children}
        </AuthContext.Provider>
    );
};