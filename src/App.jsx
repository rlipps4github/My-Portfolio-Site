import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import { spring ,AnimatedSwitch } from 'react-router-transition';

import Header from './components/header'
import Nav from './components/nav'
import Home from './components/home'
import History from './components/history'
import Resume from './components/resume'
import Footer from './components/footer'

let _animationScroll = false, _preventScroll = false // to enforce proper scroll animation & event control

function setRoute(navIdx) { // click nav by index
    let navItems = document.getElementById('nav').getElementsByTagName('a')
    for (let n=0; n<navItems.length; n++) {
        if (navItems[n].classList) navItems[n].classList.remove()
    }
    document.getElementById('nav').getElementsByTagName('a')[navIdx].setAttribute('class','active')
    document.getElementById('nav').getElementsByTagName('a')[navIdx].click()
}

function setSCrollNav(h=0,p=0) {
    const scrollDiv = parseInt((p/h)*100)
    const scrollIdx = (Math.round(scrollDiv/25)*25)/25
    const scrollNavs = document.getElementById('scrollNav-wrap').getElementsByClassName('scrollNav')
    const scrollNavTarget = document.getElementById('scrollNav-wrap').getElementsByClassName('scrollNav')[scrollIdx]
    const navTarget = scrollNavTarget.dataset['idx']
    for (let i=0; i<scrollNavs.length; i++) {
        scrollNavs[i].classList.remove('active')
    }
    document.getElementById('scrollNav-wrap').getElementsByClassName('scrollNav')[scrollIdx].classList.add('active')
    if (typeof navTarget !== 'undefined') setRoute(navTarget)
}

function scrollToSection(navIdx,navCnt) { //scroll to section by index
    const windowTopOffset = window.pageYOffset
    const windowBtmOffset = windowTopOffset + window.innerHeight
    const targetSection = document.getElementById('main').getElementsByTagName('section')[navIdx]
    const targetHt = targetSection.offsetHeight-50 // give room to invoke footer
    const targetTop = targetSection.offsetTop
    const targetBtm = targetTop+targetHt
    // if top or btm of section is outside of window
    if (targetTop+(targetHt/navCnt)>windowBtmOffset || targetBtm<windowTopOffset+(targetHt/navCnt)) {
        _preventScroll = true
        scrollIt(
            document.getElementById('main').getElementsByTagName('section')[navIdx],
            250,
            'easeInOutCubic',
            () => _preventScroll = false
        )
    } 
}

/*
*   https://codepen.io/pawelgrzybek/pen/ZeomJB 2016.07.25 - 2
*   Updated and ES6 friendly - rdl041819
*/
function scrollIt(destination, duration = 200, easing = 'linear', callback) {
    const easings = {
        linear(t) { return t },
        easeInQuad(t) { return t * t },
        easeOutQuad(t) { return t * (2 - t) },
        easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
        easeInCubic(t) { return t * t * t; },
        easeOutCubic(t) { return (--t) * t * t + 1 },
        easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
        easeInQuart(t) { return t * t * t * t },
        easeOutQuart(t) { return 1 - (--t) * t * t * t },
        easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
        easeInQuint(t) { return t * t * t * t * t },
        easeOutQuint(t) { return 1 + (--t) * t * t * t * t },
        easeInOutQuint(t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
    }
    const start = window.pageYOffset
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset)

    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll)
        if (callback) {
            callback()
        }
        return
    }

    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime()
        const time = Math.min(1, ((now - startTime) / duration))
        const timeFunction = easings[easing](time)
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start))

        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback()
            }
            return
        }
        requestAnimationFrame(scroll)
    }
    scroll()
}

/*
*   ROUTING SWITCH ANIMATION
*/

function mapStyles(styles) {
    return {
        opacity: styles.opacity,
        transform: `scale(${styles.scale})`,
    };
}

function bounce(val) {
    return spring(val, {
        stiffness: 330,
        damping: 22,
    });
}

const bounceTransition = {
    atEnter: {
        opacity: 0,
        scale: 1.2,
    },
    atLeave: {
        opacity: bounce(0),
        scale: bounce(0.8),
    },
    atActive: {
        opacity: bounce(1),
        scale: bounce(1),
    },
};

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
                ['js','VanillaJS'],
                ['php',''],
                ['jquery','jQuery'],
                ['sass',''],
                ['less',''],
                ['react','React'],
                ['node-js','Node'],
                ['apple','Mac'],
                ['linux','Linux'],
                ['windows','PC'],
                ['adobe','Adobe'],
                ['aws',''],
                ['bootstrap','Bootstrap']
            ],
            links: [
                ['Home','/'],
                ['History','/history'],
                ['Resume','/resume']
            ],
            atTop: true,
            atBottom: false,
            footLinks: [
                ['linkedin','Linkedin','https://www.linkedin.com/in/ron-lipps-ab324171/'],
                ['github','GitHub','https://github.com/rlipps4github'],
                ['codepen','CodePen','https://codepen.io/rlipps4pens/'],
                ['envelope','Email','mailto:rdl.work@gmail.com'],
            ],
        }
    }
    
    componentDidMount() {
        // custom resizer
        this.customResponse()
        window.addEventListener('resize', this.customResponse)
        // scroll controller
        this.getYOffset()
        window.addEventListener('scroll', this.getYOffset)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.customResponse)
        window.removeEventListener('scroll', this.getYOffset)
    }  

    customResponse = () => { // provides seperate display, section & componenent level awareness for response
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
        //if (responsiveElements.length && currentDevice !== this.state.device) {
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
        //}
    }
    
    handleNavClick = (e) => { // user clicks main nav item 
        scrollToSection(e.target.getAttribute('data-idx'),this.state.links.length)
        this.toggleNavBtn('off')
    }
    
    toggleNavBtn = (arg) => {
        if (!_animationScroll) {
            if (document.getElementById('nav').classList.contains('open') || document.getElementById('navBtn').classList.contains('open')) {
                document.getElementById('nav').classList.remove('open')
                document.getElementById('navBtn').classList.remove('open')
            } else {
                document.getElementById('nav').classList.add('open')
                document.getElementById('navBtn').classList.add('open')
            }
        } 
        if (arg === 'off') {
            document.getElementById('nav').classList.remove('open')
            document.getElementById('navBtn').classList.remove('open')    
        }
    }
    
    getYOffset = () => { // get y scroll positions of the window and the sections
        if (!_animationScroll && !_preventScroll) {
            this.toggleNavBtn('off')
            window.requestAnimationFrame(() => {
                const windowScrollHt = document.body.offsetHeight - (window.innerHeight-100)
                const currentAtTop = window.pageYOffset > 10 ? true : false
                const currentAtBottom = windowScrollHt-window.pageYOffset < 10 ? true : false
                const currentScroll = window.pageYOffset
                const sectionHt = window.innerHeight
                setSCrollNav(windowScrollHt,currentScroll)
                this.setState({
                    scrollPosition: currentScroll,
                    sectOffset: sectionHt,
                    atTop: currentAtTop,
                    atBottom: currentAtBottom,
                })
                _animationScroll = false
            })
            _animationScroll = true
        }
    }

    handleFooterCollapseClick = (e) => {
        e.preventDefault()
        const currScrollPos = window.pageYOffset
        const targetScrollPos = currScrollPos === 0 ? currScrollPos+50 : currScrollPos-150 
        _preventScroll = true
        window.scrollTo(0,targetScrollPos)
        _preventScroll = false
    }

    render() {
        return(
            <Router>
                <Header handler={this.toggleNavBtn} nameHandler={() => setRoute(0)} atTop={this.state.atTop} logos={this.state.logos} links={this.state.links}> 
                    <Nav handler={this.handleNavClick} atTop={this.state.atTop} links={this.state.links} sectOffset={this.state.sectOffset}  />
                </Header>
                <main id="main">
                    <article className={this.state.atTop ? 'rollupTop' : ''}>
                        <div className="row row-pad">
                            <div className="col col-mob-12 column-pad text-center">
                                <header>
                                    <h1>Welcome!</h1>
                                    <p>My name is Ron and I am a Web Developer<br />specializing in Front End work but with<br />the desire to perform a Full Stack role.</p>
                                    <p>Scroll down to check out my work<br />and thank you for visiting!</p>
                                    <button 
                                        onClick={this.handleFooterCollapseClick} 
                                        className="welcomeButton fas fa-arrow-circle-down"
                                    ></button>
                                </header>
                            </div>
                        </div>
                    </article>
                    <section></section>
                    <section>
                        <AnimatedSwitch
                            atEnter={bounceTransition.atEnter}
                            atLeave={bounceTransition.atLeave}
                            atActive={bounceTransition.atActive}
                            mapStyles={mapStyles}
                            className="switch-wrapper"
                        >
                            <Route exact path='/' render={() => (
                                <Home handleView={this.state.device} />
                            )} />
                            <Route path='/history' render={() => (
                                <History handleView={this.state.device} />
                            )} />
                            <Route path='/resume' render={() => (
                                <Resume handleView={this.state.device} />
                            )} />
                        </AnimatedSwitch>
                    </section>
                    <section></section>
                </main>
                <Footer handler={this.handleFooterCollapseClick} atTop={this.state.atTop} atBottom={this.state.atBottom} links={this.state.footLinks} />
            </Router>
        )  
    }
}

export default MainWrapper


