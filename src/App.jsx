import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import { spring ,AnimatedSwitch } from 'react-router-transition';

import Header from './components/header'
import Nav from './components/nav'
import About from './components/about'
import Samples from './components/samples'
import Resume from './components/resume'
import Footer from './components/footer' 

let _scrollTimeout = null // to enforce proper scroll animation & event control

/* CLICK ROUTING */

function setRoute(navIdx) { // function to click router links when mouse scroll is detected
    document.getElementById('nav').getElementsByTagName('a')[navIdx].click()
}

/* ROUTING SWITCH ANIMATION */

function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

function bounce(val) {
    return spring(val, {
        stiffness: 120,
        damping: 10,
    });
}

const routeTransition = {
    atEnter: {
        opacity: 0,
        scale: 1.2,
        left: 10,
    },
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
        left: -10,
    },
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
        left: 0,
    },
};

/* MAIN APP */

class MainWrapper extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            device: 'mobile',
            scrollPosition: 0,
            sectOffset: 0,
            logos: [
                ['html5','HTML5'],
                ['css3-alt','CSS3'],
                ['sass',' '],
                ['less',' '],
                ['js','VanillaJS'],
                ['jquery','jQuery'],
                ['angular','Angular'],
                ['react','React'],
                ['node-js','Node'],
                ['php',' '],
                ['apple','Mac'],
                ['linux','Linux'],
                ['windows','PC'],
                ['adobe','Adobe'],
                ['aws',' '],
                ['bootstrap','Bootstrap']
            ],
            links: [
                ['About','/'],
                ['Samples','/samples'],
                ['Resume','/resume']
            ],
            atTop: true,
            atBottom: false,
            atSection: 0,
            footLinks: [
                ['linkedin','Linkedin','https://www.linkedin.com/in/ron-lipps-ab324171/'],
                ['github','GitHub','https://github.com/rlipps4github'],
                ['codepen','CodePen','https://codepen.io/rlipps4pens/'],
                ['envelope','Email','mailto:rdl.work@gmail.com'],
            ],
        }
    }
    
    componentDidMount() {
        this.customResponse()
        window.addEventListener('resize', this.customResponse)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.customResponse)
    }  

    customResponse = () => { // provides section & componenent level awareness for response
        let breakPoints = {desktop: 1200, laptop: 900, tablet: 600}
        let responsiveElements = document.getElementsByClassName('container')
        let currentWidth = window.innerWidth, currentDevice = null
        switch (true) {
            case currentWidth >= breakPoints['desktop']: 
                currentDevice = 'desktop'
                break
            case currentWidth >= breakPoints['laptop']: 
                currentDevice = 'laptop'
                break
            case currentWidth >= breakPoints['tablet']:
                currentDevice = 'tablet'
                break
            default:
                currentDevice = 'mobile'
        } 
        this.setState({
            device: currentDevice,
        })
        for (let el=0; el<responsiveElements.length; el++) {
            let thisElement = responsiveElements[el]
            let thisWidth = thisElement.offsetWidth
            thisElement.classList.remove('desktop','laptop','tablet','mobile')
            switch (true) {
                case thisWidth >= breakPoints['desktop']: 
                    thisElement.classList.add('desktop')
                    break
                case thisWidth >= breakPoints['laptop']: 
                    thisElement.classList.add('laptop')
                    break
                case thisWidth >= breakPoints['tablet']:
                    thisElement.classList.add('tablet')
                    break
                default:
                    thisElement.classList.add('mobile')
            } 
        }
    }
    
    handleNavClick = (e) => { // main nav item click
        const clickIdx = parseInt(e.target.getAttribute('data-idx'))
        this.setState({
            atSection: clickIdx,
        })
        this.toggleNavBtn('off')

    }
    
    toggleNavBtn = (arg) => { // mobile nav hamburger toggle on click
        if (arg === 'off') {
            document.getElementById('nav').classList.remove('open')
            document.getElementById('navBtn').classList.remove('open')    
        } else {
            if (document.getElementById('nav').classList.contains('open') || document.getElementById('navBtn').classList.contains('open')) {
                document.getElementById('nav').classList.remove('open')
                document.getElementById('navBtn').classList.remove('open')
            } else {
                document.getElementById('nav').classList.add('open')
                document.getElementById('navBtn').classList.add('open')
            }
        }

    }

    handleScroll = (direction) => { // take mouse scroll direction and increment route accordingly
        clearTimeout(_scrollTimeout)
        _scrollTimeout = setTimeout(() => { 
            let newAtTop = false, newAtBtm = false, newAtSection = null
            if (direction === 'up') {
                switch(this.state.atSection) {
                    case 0:
                        newAtTop = true
                        newAtSection = 0
                        break
                    case this.state.links.length - 1:
                        if (this.state.atBottom) { 
                            newAtBtm = false
                            newAtSection = this.state.links.length - 1
                        } else {
                            newAtSection = this.state.atSection -1
                        }
                        break
                    default:
                        newAtSection = this.state.atSection -1
                }
            } else {
                switch(this.state.atSection) {
                    case 0:
                        if (this.state.atTop) {
                            newAtTop = false
                            newAtSection = 0
                        } else {
                            newAtSection = this.state.atSection +1
                        }
                        break
                    case (this.state.links.length - 1):
                        if (! this.state.atBottom) { 
                            newAtBtm = true
                            newAtSection = this.state.links.length - 1
                        } 
                        break
                    default:
                        newAtSection = this.state.atSection +1
                }
            }
            this.setState({
                atTop: newAtTop,
                atBottom: newAtBtm,
                atSection: newAtSection,
            })
            setRoute(this.state.atSection)
        },500)
    }

    handleFooterCollapseClick = (e) => { // retract (close) footer  
        e.preventDefault()
        this.setState({ 
            atTop: false,
            atBottom: false,
         })
    }

    render() {
        return(
            <Router>
                <Header handler={this.toggleNavBtn} nameHandler={() => setRoute(0)} atTop={this.state.atTop} logos={this.state.logos} links={this.state.links}> 
                    <Nav handler={this.handleNavClick} atTop={this.state.atTop} atSection={this.state.atSection} links={this.state.links} />
                </Header>
                <main id="main" onWheel={ event => {
                        if (event.nativeEvent.wheelDelta > 0) {
                            this.handleScroll('up') 
                        } else {
                            this.handleScroll('down') 
                        }
                    }}
                >
                    <article className={this.state.atTop ? '' : 'rollupTop'}>
                        <div className="row row-pad">
                            <div className="col col-mob-12 column-pad text-center">
                                <header>
                                    <h1>Welcome!</h1>
                                    <p>My name is Ron and I am a Web Developer<br />specializing in Front End developement and<br />educating myself for a Full Stack role.</p>
                                    <p>Thanks for visiting! Scroll down to see more...</p>
                                    <button 
                                        onClick={this.handleFooterCollapseClick} 
                                        className="welcomeButton fas fa-arrow-circle-down"
                                    ></button>
                                </header>
                            </div>
                        </div>
                    </article>
                    <section>
                        <AnimatedSwitch
                            atEnter={routeTransition.atEnter}
                            atLeave={routeTransition.atLeave}
                            atActive={routeTransition.atActive}
                            mapStyles={mapStyles}
                            className="switch-wrapper"
                        >
                            <Route exact path='/' render={() => (
                                <About handleView={this.state.device} />
                            )} />
                            <Route exact path='/samples' render={() => (
                                <Samples handleView={this.state.device} />
                            )} />
                            <Route exact path='/resume' render={() => (
                                <Resume handleView={this.state.device} />
                            )} />
                        </AnimatedSwitch>
                    </section>
                </main>
                <Footer handler={this.handleFooterCollapseClick} atTop={this.state.atTop} atBottom={this.state.atBottom} links={this.state.footLinks} />
            </Router>
        )  
    }
}

export default MainWrapper


