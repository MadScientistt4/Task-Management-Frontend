import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a href="/" className="navbar-item">
                        Home
                    </a>

                    <a href="/project" className="navbar-item">
                        Project
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item is-selected">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>

                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a href="/signup" className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a href="/login" className="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}