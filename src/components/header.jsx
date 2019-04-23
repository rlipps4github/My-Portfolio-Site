import React, { Component } from 'react';

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
            React.createElement('div', {className: 'logos-ticker'}, 
                this.props.arr.map((key,val) => {
                    return this.renderLogo(val)
                })
            )
        )
        
        
    }
}

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logos: this.props.logos,
            logoLen: 0,
            logoArr: [],
            logoIdx: -1,
        }
    }
    
    componentDidMount() {
        setInterval(this.advanceIdx, 2000)
        this.advanceIdx()
    }
    
    advanceIdx = () => {
        const editArr = this.state.logos
        const nextIdx = this.state.logoIdx + 1
        const newIdx = nextIdx < editArr.length ? nextIdx : 0;
        this.setState({
            logoLen: editArr.length,
            logoIdx: newIdx,
            logoArr: editArr, 
        });
    }
    
    render() {
        return (
            <header id="header" className="container">
                <div className={'header-wrap '+ (this.props.atTop ? 'rollupTop' : '')}>
                    <LogoCarousel len={this.state.logoLen} arr={this.state.logoArr} idx={this.state.logoIdx} />
                    <div className="contact-card">
                        <h2 onClick={this.props.nameHandler}>Ron&nbsp;Lipps</h2>
                        <div>
                            <div>Web Developer</div>
                            <div>San Diego, CA.</div>
                            <div id="navBtn" onClick={this.props.handler}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </header>
        );
    }
}

export default Header;
