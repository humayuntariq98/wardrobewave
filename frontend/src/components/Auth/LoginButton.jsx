import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
 
  async function handleLogin  ( ) {
    await loginWithRedirect({
      appState: {
        returnTo: "/your-client-route"
      }
    })
  }
  return <button onClick={ handleLogin }>Log In</button>;
};

export default LoginButton;