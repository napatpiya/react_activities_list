import React from 'react';
import { Link } from '@reach/router';
import Activitieslist from '../components/Activitieslist';
import Create from '../components/Create';
import Update from '../components/Update';
import { Router } from '@reach/router';


const Main = props => {


    return (
        <div className="container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="bulma" width="112" height="28" />
                    </Link>
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/new" className="navbar-item"> New </Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/signup" className="button is-primary">
                                    <strong>Sign up</strong>
                                </Link>
                                <Link to="/login" className="button is-light">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        Fitness Buddy
                    </h1>
                    <h2 className="subtitle">
                        ...
                    </h2>
                    </div>
                </div>
            </section>
            <br /><br />
            <Router>
                <Activitieslist path="/" />
                <Create path="/new" />
                <Update path="/update/:_id" />
            </Router>
        </div>
    );
}

export default Main;