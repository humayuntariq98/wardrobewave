import './Nav.css'
import {Link} from 'react-router-dom'
export default function Nav(){
    return (<nav className="Nav">
        <Link to="/products" >
	        <h1>View All Products</h1>
        </Link>
        <div>WardrobeWave</div>
    </nav>)
}