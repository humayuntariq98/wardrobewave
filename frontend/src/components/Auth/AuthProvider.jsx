import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

export default function Auth0ProviderWithNavigate({ children }) {
    // your code here...'
  
    const navigate = useNavigate();
  
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;
    if (!(domain && clientId && redirectUri)) {
        return null;
      }
      // depending on the architecture of your application, this can be used to prevent the application from loading, though a redirect call could navigate a user to an error page.

      const onRedirectCallback = (appState) => {
        console.log('AppState:', appState);
        navigate(appState?.returnTo || window.location.pathname);
    };
  
  return (
<Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri={redirectUri}
  onRedirectCallback={onRedirectCallback}
>
  {children}
</Auth0Provider>
  );
  }