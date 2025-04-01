import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function Header()
{
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return(
   <header className="header">
    <img className="header-image" src="src\assets\troll-face.png" alt="" />
    <h2 className="header-title">Meme Generator</h2>
    <h4 className="header-project">Rang manch</h4>
    <button 
       className="auth-button"
       onClick={() => {
        if (isAuthenticated) {
            logout({ returnTo: window.location.origin });
        } else {
            loginWithRedirect();
        }
    }}
>
    {isAuthenticated ? 'Log Out' : 'Log In'}


    </button>
   </header>
    )

}
export default Header