import './Nav.css';
import { Link } from 'react-router-dom';
import LoginButton from "./Auth/LoginButton";

export default function Nav() {
    return (
        <nav className="Nav">
            <Link to="/" >
                <h1>View All Products</h1>
            </Link>
            <Link to='/cart'>Cart</Link>
            <div>
                <LoginButton />
            </div>
            <div>WardrobeWave</div>
        </nav>
    );
}