import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './styles.css';

class TopNav extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const authToken = localStorage.getItem('Access Token')
        return (
            <div>
                {!authToken &&
                    <Link to='/'>Home</Link>
                }
                {authToken &&
                    <div
                        className='topNav__link--item'
                        onClick={() => {
                            localStorage.removeItem('Access Token')
                            this.props.history.push('/')
                        }}>
                        Logout
                    </div>
                }
                {authToken &&
                    <Link to='/projects'>Projects</Link>
                }
            </div>
        )
    }
}

export default TopNav