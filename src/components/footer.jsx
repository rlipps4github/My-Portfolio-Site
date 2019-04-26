import React, { Component } from 'react'

class Footer extends Component {
    
    renderLinks(i) {
        const theIcon = i[0]
        const theLabel = i[1]
        const theLink = i[2]
        const theTarget = theLink.includes('http') ? '_blank' : '_self'
        const theRel = theTarget === '_blank' ? 'noopener noreferrer' : '' 
        const iconPrefix = theIcon === 'envelope' ? 'fas fa-' : 'fab fa-'
        return (
            <div key={i}>
                <a href={theLink} target={theTarget} rel={theRel}>
                    <i className={iconPrefix+theIcon}></i>&nbsp;&nbsp;
                    <span>{theLabel}</span>
                </a>
            </div>
        )
    }
    
    render() {
        return (
            <footer id="footer" className={this.props.device}>
                <div className={ 'footer-wrap '+ (this.props.atTop ? 'rollupTop' : '') +' '+ (this.props.atBottom ? 'rollupBtm' : '') }>
                    <div className="contact-card">
                        <button 
                            onClick={this.props.handler} 
                            className="closeFooter fas fa-arrow-circle-down"
                        ></button>
                        {
                            this.props.links.map( (key,val) => {
                                return this.renderLinks(key)
                            })
                        }
                    </div>
                </div>
            </footer>
        )
    }
    
}

export default Footer;