import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function Navbar({navTitle,tab1,tab2,tab3,tab4}){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">{navTitle}</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <NavLink to="/" end className={({isActive})=> isActive? "nav-link active": "nav-link"}>  {tab1} <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/about" end className={({isActive})=> isActive? "nav-link active": "nav-link"} > {tab2} </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/filter" end className={({isActive})=> isActive? "nav-link active": "nav-link"}> {tab3} </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/timer" end className={({isActive})=> isActive? "nav-link active": "nav-link"}> {tab4} </NavLink>
            </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        </div>
        </nav>
        </>
    );
}

Navbar.propTypes={
    navTitle: PropTypes.string.isRequired,
    tab1: PropTypes.string.isRequired,
    tab2: PropTypes.string.isRequired
}
// Navbar.defaultProps={
//     navTitle: "Some Default Value",
//     tab1: "Some Tab1",
//     tab2: "Some Tab2"
// }



