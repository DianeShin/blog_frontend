import React, { useEffect } from 'react';

export const SignOut = ({ handleSignOut }) => {
    useEffect(() => {
        handleSignOut();
    }, []);

    return (
        <div>
            <h1>Signed out!</h1>
        </div>
    );
};

export default SignOut;
