import React from 'react'
import github from './treasuregame/gihub.png'
import linkedin from './treasuregame/linkedin.jpg'
import mail from './treasuregame/email.png'
import './footer.css'

function Footer() {
    return (
        <div className="footer">
            <div className="social-icon">
                <a
                    href="https://github.com/jayachandra-12"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={github} className="icon github" alt="" />
                </a>
                <a
                    href="https://www.linkedin.com/in/thelukuntla-jayachandra-36322a221/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={linkedin} className="icon" alt="" />
                </a>

                <a
                    href="mailto:santhu.t2003@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={mail} className="icon bg-white" alt="" />
                </a>
            </div>
            <div className="personal-info">
                <p>Created with ❤ using MERN by </p>
                <h4>
                    <span className="symbol">&#60;</span>Thelukuntla Jayachandra
                    <span className="symbol">/&#62;</span>
                </h4>
                <h6>Full Stack Developer</h6>

            </div>
            <h5 style={{ textAlign: "center" }}>
                Copyright © 2023 Thelukuntla Jayachandra. All rights reserved.
            </h5>
        </div>
    )
}

export default Footer