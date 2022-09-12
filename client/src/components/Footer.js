import React from 'react'

function Footer() {
  return (
    <nav className="navbar navbar-dark bg-secondary" style={{"minHeight":"90px", "marginTop":"20px"}}>
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1">GovTech Football Tournament</span>
            <h6> By Sakthibats <a href='https://github.com/Sakthibats/GT_ACE_football'><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='github' style={{"width":"20px"}} /></a> </h6>
        </div>
    </nav>
  )
}

export default Footer