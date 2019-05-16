import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
    
    renderLinks = () => {   
        let navLinks = []
        for (let i=0; i<this.props.links.length; i++) {
            navLinks.push( 
                <NavLink 
                    key={'nav'+i} 
                    onClick={this.props.handleNavClick}
                    data-idx={i}
                    activeClassName='active'
                    exact
                    to={this.props.links[i][1]} 
                >{this.props.links[i][0]}</NavLink>
            )
        }
        return navLinks
    }

    renderScrollLinks = () => {
        let scrollLinks = []
        for (let i=0; i<this.props.links.length; i++) {
            scrollLinks.push(
                <NavLink 
                    className="scrl-nav"
                    key={'scrl-nav'+i} 
                    onClick={this.props.handleNavClick}
                    data-idx={i}
                    activeClassName='active'
                    exact
                    to={this.props.links[i][1]} 
                >{this.props.links[i][0]}</NavLink>
            )
        }      
        return scrollLinks 
    }

    render() {
        return (
            <>
            <nav id="nav" className={this.props.atTop ? '' : 'rollupTop'}>
                {this.renderLinks()}
            </nav>
            <div id="scrollNav-wrap">
                {this.renderScrollLinks()}
            </div>
            </>
        )
    }

}

export default Nav