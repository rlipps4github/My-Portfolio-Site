import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import WheelReact from 'wheel-react'

class Nav extends Component {
    constructor(props) {
        super(props);
        WheelReact.config({
            up: () => {
                this.props.handleScrollSwipeNav('down',1000)
            },
            down: () => {
                this.props.handleScrollSwipeNav('up',1000)
            },
        })
    }

    componentWillUnmount() {
        WheelReact.clearTimeout()
    }
    
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
            <div id="scrollNav-wrap" {...WheelReact.events}>
                {this.renderScrollLinks()}
            </div>
            </>
        )
    }

}

export default Nav