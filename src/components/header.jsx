import React, { Component } from 'react';

let logoTimer = null

function HeadLogo(props) {
    let thisIcon = props.ico
    let thisLabel = props.lbl
    let thisClass = props.active
    return(
        <div className={'logo-'+thisIcon+' '+thisClass} >
            <i className={'fab fa-'+thisIcon}></i>
            <span>{thisLabel}</span>
        </div>
    )
}

class LogoCarousel extends Component {
    
    renderLogo(i) {
        return(
            React.createElement(HeadLogo, {
                key: i,
                ico: this.props.arr[i][0].toString(),
                lbl: this.props.arr[i][1].toString(),
                active: i===this.props.idx ? 'active' : '',
            })
        )
    }
    
    render() {
        return(
            <div className="logos-ticker"> { 
                this.props.arr.map((key,val) => {
                    return this.renderLogo(val)
                })
            }</div>
            
        )
        
        
    }
}

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logoArr: [],
            logoLen: 0,
            logoIdx: 0,
        }
    }
    
    componentDidMount() {
        clearInterval(logoTimer)
        logoTimer = setInterval(this.advanceIdx, 2000)
        this.advanceIdx()
    }

    componentWillUnmount() {
        clearInterval(logoTimer)
    }
    
    advanceIdx = () => {
        const editArr = this.props.logos
        this.setState( prevState => ({
            logoArr: editArr, 
            logoLen: editArr.length,
            logoIdx: prevState.logoIdx+1 < editArr.length ? prevState.logoIdx+1 : 0,
        }));
    }
    
    render() {
        return (
            <header id="header" className={this.props.device}>
                <div className={'header-wrap '+ (this.props.atTop ? '' : 'rollupTop')}>
                    <LogoCarousel len={this.state.logoLen} arr={this.state.logoArr} idx={this.state.logoIdx} />
                    <div className="contact-card">
                        <h2 onClick={this.props.handleNameClick}>Ron&nbsp;Lipps</h2>
                        <div>
                            <div>Web Developer</div>
                            <div>San Diego CA</div>
                            <div id="navBtn" onClick={this.props.toggleNavBtn}><div></div><div></div><div></div></div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </header>
        );
    }
}

export default Header;
