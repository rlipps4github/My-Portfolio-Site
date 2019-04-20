import React, { Component } from 'react';

class Footer extends Component {
    
    render() {
        return (
            <footer id="footer" className="container">
                <div className={'footer-wrap '+this.props.atTop+' '+this.props.atBottom}>
                    <div className="contact-card">
                        <div><a href="https://www.linkedin.com/in/ron-lipps-ab324171/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i> Linkedin</a></div>
                        <div><a href="https://github.com/rlipps4github" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> Github</a></div>
                        <div><a href="https://codepen.io/rlipps4pens/" target="_blank" rel="noopener noreferrer"><i className="fab fa-codepen"></i> CodePen</a></div>
                        <div><a href="mailto:rdl.work@gmail.com" ><i className="fas fa-envelope"></i> rdl.work@gmail.com</a></div>
                    </div>
                </div>
            </footer>
        )
    }
    
}

export default Footer;