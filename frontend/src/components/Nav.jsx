import './Nav.css'
import {Link} from 'react-router-dom'
export default function Nav(){
    return (<nav className="Nav">
        <Link to="/" >
	        <h1>View All Products</h1>
        </Link>
        <Link to='/cart'>Cart</Link>
        <div>WardrobeWave</div>
    </nav>)
}