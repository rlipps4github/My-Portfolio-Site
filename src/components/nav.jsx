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
                    key={'nav'+i} 
                    onClick={this.props.handler}
                    data-idx={i}
                    to={this.state.links[i][1]} 
                    component={this.state.links[i][0]}
                >{this.state.links[i][0]}</Link>
            )
        }
        return navLinks
    }

    renderScrollLinks = () => {
        let scrollLinks = [], theHtml, k = 0, m = 1
        for (let i=0; i<this.state.links.length; i++) {
            if (i !== this.state.links.length-1) { 
                theHtml = 
                    <>
                    <div 
                        key={'scrl-nav'+k} 
                        onClick={this.props.handler}
                        data-idx={i}
                        className="scrollNav"
                    >{this.state.links[i][0]}</div>
                    <div 
                        key={'scrl-nav'+m} 
                        className="scrollNav mid"
                    ></div>
                    </>
            } else {
                theHtml = 
                    <div 
                        key={'scrl-nav'+k} 
                        onClick={this.props.handler}
                        data-idx={i}
                        className="scrollNav"
                    >{this.state.links[i][0]}</div>
            }
            scrollLinks.push(theHtml)
            k += 2
            m += 2
        }      
        return scrollLinks 
    }

    render() {
        return (
            <>
            <nav id="nav" className={this.props.atTop}>
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