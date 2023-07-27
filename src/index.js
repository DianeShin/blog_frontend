import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import AuthProvider from "./pages/auth/Authenticator";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
    );