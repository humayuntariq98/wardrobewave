import { Link } from 'react-router-dom';
import LoginButton from "./Auth/LoginButton";
import { UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Nav() {
    return (
        <nav className="flex items-center justify-between p-4 bg-blue-gray-600">
            <div className="flex items-center">
                <img src='../../shirt.gif' alt='company-logo'
                className='w-20 ml-3 mr-3'
                />
                <Link to="/">
                    <h1 className="text-white font-serif text-xxl">WardrobeWave</h1>
                </Link>
                <Link to="/" className="ml-6 text-gray-200">
                    Products
                </Link>
            </div>
            <div className="flex items-center">
                <Link to="/cart">
                    <ShoppingCartIcon className="h-6 w-6 text-white mr-6" /> {/* Cart Icon */}
                </Link>
                <LoginButton />
            </div>
        </nav>
    );
}