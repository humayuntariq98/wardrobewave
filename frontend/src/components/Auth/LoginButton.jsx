import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@material-tailwind/react/components/IconButton";
import Button from '@material-tailwind/react/components/Button'
import { Avatar } from "@material-tailwind/react";
import { UserCircleIcon } from '@heroicons/react/24/solid';

const LoginButton = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    return (
        <div className="flex items-center">
            {isAuthenticated ? (
                <div className="flex items-center">
                    <Avatar
                        src={user.picture}
                        alt="User profile"
                        className="h-10 w-10 rounded-full border border-white mr-2"
                        size="xxl"
                    />
                     <span className="text-white mr-2">
                        {user.name}
                    </span>
                    <Button
                        color="blue-gray"
                        buttonype="outline"
                        size="sm"
                        rounded="true"
                        className="ml-4"
                        onClick={() => logout({ returnTo: window.location.origin })}
                    >
                        Log Out
                    </Button>
                </div>
            ) : (
                <IconButton onClick={() => loginWithRedirect({ scope: 'openid profile email' })}>
                    <UserCircleIcon className="h-6 w-6 text-gray-700" />
                </IconButton>
            )}
        </div>
    );
};

export default LoginButton;
