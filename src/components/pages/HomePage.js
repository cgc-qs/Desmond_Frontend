import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <div style={{ display: "flex", justifyContent: "Space-between" }}>
            <h1 className="main-title2 home-page-title" style={{ marginLeft: 50 }}>Scanner table</h1>
            <div >
                <Link to="/">
                    <button className="primary-button" style={{ marginTop: "2rem" }}>Log out</button>
                </Link>
            </div>
        </div>

    )
}
