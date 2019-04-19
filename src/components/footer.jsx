import React, { Component } from 'react';

class Footer extends Component {
    
    render() {
        return (
            <footer id="footer">
                <div className={'footer-wrap '+this.props.atTop+' '+this.props.atBottom}>
                    <div className="contact-card">
                        <div><a href="https://www.linkedin.com/in/ron-lipps-ab324171/"><i className="fab fa-linkedin"></i> Linkedin</a></div>
                        <div><a href="https://github.com/rlipps4github"><i className="fab fa-github"></i> Github</a></div>
                        <div><a href="https://codepen.io/rlipps4pens/"><i className="fab fa-codepen"></i> CodePen</a></div>
                        <div><a href="mailto:rdl.work@gmail.com" ><i className="fas fa-envelope"></i> rdl.work@gmail.com</a></div>
                    </div>
                </div>
            </footer>
        )
    }
    
}

export default Footer;