import React from 'react'
import { Link } from 'react-router-dom'

export default class Authenticated extends React.Component {
    render() {
        return (
            <div>
                <Link to="/home">welcome</Link>

            </div>
        )
    }
}
