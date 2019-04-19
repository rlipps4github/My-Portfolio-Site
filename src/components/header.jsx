import React, { Component } from 'react';

function HeadLogo(props) {
    let thisLabel = props.lbl
    let thisClass = props.active
    return(
        React.createElement('div', {className: 'logo-'+thisLabel+' '+thisClass}, 
            React.createElement('i', {className: 'fab fa-'+thisLabel.toLowerCase()}),
            React.createElement('span',null, thisLabel),
        )
    )
}

class LogoCarousel extends Component {
    
    renderLogo(i) {
        return(
            React.createElement(HeadLogo, {
                lbl: this.props.arr[i].toString(),
                active: i===this.props.idx ? 'active' : '',
                key: i,
            })
        )
    }
    
    render() {
        return(
            React.createElement('div', {className: 'logos-ticker'}, 
                this.props.arr.map((val,key) => {
                    return this.renderLogo(key)
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
        setInterval(this.advanceIdx, 5000)
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
            <header id="header">
                <div className={'header-wrap '+this.props.atTop}>
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
