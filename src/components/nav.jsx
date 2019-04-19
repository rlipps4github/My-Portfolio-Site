import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            links: this.props.links,
            sectOffset: this.props.sectOffset,
            activeSectIdx: this.props.activeSectIdx,
            sectInViewIdx: this.props.sectInViewIdx,
        }
    }
    
    renderLinks = () => {   
        let navLinks = []
        for (let i=0; i<this.state.links.length; i++) {
            navLinks.push( 
                <Link 
                    key={i} 
                    onClick={this.props.handler}
                    data-idx={i}
                    to={this.state.links[i][1]} 
                    component={this.state.links[i][0]}
                >{this.state.links[i][0]}</Link>
            )
        } return navLinks
    }

    render() {
    
        return (
            <nav id="nav" className={this.props.atTop}>
                {this.renderLinks()}
            </nav>
        )
    
    }

}

export default Nav