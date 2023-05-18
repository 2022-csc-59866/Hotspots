import { Link } from 'react-router-dom';
import './NavBar.css'
import { FaRegCalendarAlt } from 'react-icons/fa';
function NavBar(props) {
    const navlist = ["Manage Events", "Create Event", "About"]
    const navlistrouting = ["manage", "create", "about"]

    function deleteTokens() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        window.location.href = "/";
    }
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-body-tertiary bg-primary nav-words" data-bs-theme="dark">
            <div className="container-fluid ms-4 text-white">
            <a className="navbar-brand d-flex justify-content-center align-items-center" href="/"><FaRegCalendarAlt size={42} style={{marginRight: '5px'}}/>Hotspot</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ms-4 ps-4" id="navbarText">
                <ul className="navbar-nav w-100 mb-2 mb-lg-0 d-flex gap-4">
                    {navlist.map((navlistitem, index) =>
                    // {navlistitem !== "Login" && navlistitem !== "Sign Up" && (
                        <li className="nav-item" key={index}>
                            { navlistitem === props.path && 
                                <Link className="nav-link active" aria-current="page" to={"/" + navlistrouting.at(index)}>{navlistitem}</Link>
                            }
                            {
                                navlistitem !== props.path && 
                                <Link className="nav-link" to={"/" + navlistrouting.at(index)}>{navlistitem}</Link>
                            }
                        </li>
                    // )}
                    )}
                </ul>
                {localStorage.getItem('token') === null && <div className='navbar-nav d-flex flex-row-reverse'>
                    <span className="me-4 nav-item">
                        <Link className={`nav-link ${props.path==='Sign Up'?'active':''}`} aria-current="page" to={"/signup"}>Signup</Link>
                    </span>
                    <span className="nav-item">
                        <Link className={`nav-link ${props.path==='Login'?'active':''}`} aria-current="page" to={"/login"}>Login</Link>
                    </span>
                </div>}
                {localStorage.getItem('token') !== null && <div className='navbar-nav d-flex flex-row-reverse'>
                    <span className="me-4 nav-item">
                        <Link className={`nav-link ${props.path==='Sign Up'?'active':''}`} aria-current="page" to={"/"} onClick={deleteTokens}>Logout</Link>
                    </span>
                </div>}
            </div>
            </div>
        </nav>
        );
}

export default NavBar;