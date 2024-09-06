
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavBar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                WTDo
            </Link>
            
            <div className="moto">
                 B E _ C O N S I S T E N C E
            </div>
               
            <ul>
                <CustomLink to="/about">About</CustomLink>
                {/* <CustomLink to="/mission">Mission</CustomLink>
                <CustomLink to="/note">Note</CustomLink>
                 */}
                <CustomLink to="/account">Account</CustomLink>
                <li> + </li> 
            </ul>
        </nav>
    )
}

// eslint-disable-next-line react/prop-types
function CustomLink({ to, children, ...props }) {

    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}