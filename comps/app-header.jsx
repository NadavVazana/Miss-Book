const { NavLink, withRouter } = ReactRouterDOM
import { UserMsg } from './user-msg.jsx';


function _AppHeader(props){

    return <header>
        <div className="app-header">
            <label onClick={()=>{props.history.push('/')}} htmlFor="logo">
        <h1  className="logo" >Miss Book!</h1>
        <img className="logo-icon" src="../assets/imgs/icon.png" alt="" />
        </label>
        <nav>
        
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/book">Our Books!</NavLink>
        <NavLink to="/about">About</NavLink>
        </nav>
        </div>
        <UserMsg />
    </header>
}

export const AppHeader = withRouter(_AppHeader)