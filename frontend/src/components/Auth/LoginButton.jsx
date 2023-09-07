import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();


  return (
    <div>
        {isAuthenticated ? (
            <div>
              <img src={user.picture} alt="User profile" />
                <span>{user.name}</span> {/* Display user name */}
                <button onClick={() => logout({ returnTo: window.location.origin })}>
                    Log Out
                </button>
            </div>
        ) : (
            <button onClick={loginWithRedirect}>Log In</button>
        )}
    </div>
);
};

export default LoginButton;