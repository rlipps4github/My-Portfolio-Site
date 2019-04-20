import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import Header from './components/header'
import Nav from './components/nav'
import Home from './components/home'
import History from './components/history'
import Resume from './components/resume'
import Footer from './components/footer'
import { isNumber } from 'util';

let _animationScroll = false, _preventScroll = false // to enforce proper scroll animation & event control

function setRoute(navIdx) { // click nav by index
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
            1000,
            'easeInOutCubic',
            () => _preventScroll = false
        )
    } 
}

/*
*   Nice scrollIt animation by Pawel Grzybek
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
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
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
                ['js','Vanilla JS'],
                ['php',''],
                ['jquery','jQuery'],
                ['sass',''],
                ['less',''],
                ['react','React'],
                ['node-js','Node'],
                ['apple','Mac'],
                ['linux','Linux'],
                ['windows','Windows'],
                ['adobe','Adobe'],
                ['aws',''],
                ['bootstrap','Bootstrap']
            ],
            links: [
                ['Home','/'],
                ['History','/history'],
                ['Resume','/resume']
            ],
            atTop: '',
            atBottom: '',
            activeSectIdx: 0,
            sectInViewIdx: 0,
            footLinks: ['',''],
        }
    }
    
    componentDidMount() {
        // custom resize
        this.customResponse()
        window.addEventListener('resize', this.customResponse)
        // scroll control
        this.getYOffset()
        window.addEventListener('scroll', this.getYOffset)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.customResponse)
        window.removeEventListener('scroll', this.getYOffset)
    }  

    customResponse = () => { // provides section/componenent level response awareness
        // get lower breakpoints
        let deviceArray = {desktop: 1200, laptop: 900, tablet: 600}
        // get responsive container
        let responsiveElements = document.getElementsByClassName('container')
        let currentWidth = window.innerWidth, currentDevice = null
        switch (true) {
            case currentWidth >= deviceArray['desktop']: 
                currentDevice = 'desktop'
                break
            case currentWidth >= deviceArray['laptop']: 
                currentDevice = 'laptop'
                break
            case currentWidth >= deviceArray['tablet']:
                currentDevice = 'tablet'
                break
            default:
                currentDevice = 'mobile'
        } 
        if (responsiveElements.length && currentDevice !== this.state.device) {
            this.setState({
                device: currentDevice,
            })
            for (let el=0; el<responsiveElements.length; el++) {
                let thisElement = responsiveElements[el]
                let thisWidth = thisElement.offsetWidth
                thisElement.classList.remove('desktop')
                thisElement.classList.remove('laptop')
                thisElement.classList.remove('tablet')
                thisElement.classList.remove('mobile')
                switch (true) {
                    case thisWidth >= deviceArray['desktop']: 
                        thisElement.classList.add('desktop')
                        break
                    case thisWidth >= deviceArray['laptop']: 
                        thisElement.classList.add('laptop')
                        break
                    case thisWidth >= deviceArray['tablet']:
                        thisElement.classList.add('tablet')
                        break
                    default:
                        thisElement.classList.add('mobile')
                } 
            }
        }
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
                const currentAtTop = window.pageYOffset > 10 ? 'rollupTop' : ''
                const currentAtBottom = windowScrollHt-window.pageYOffset < 10 ? 'rollupBtm' : ''
                const activeSect = document.getElementById('section-content').parentNode
                const activeSectOffset = activeSect.offsetTop
                const currentScroll = window.pageYOffset
                const sectionHt = window.innerHeight
                let overSectIdx = 0, currSectIdx = 0
                for (let s=0; s<this.state.links.length; s++) {
                    overSectIdx = currentScroll+sectionHt/3 > sectionHt*s && currentScroll < sectionHt*(s+1) ? s : overSectIdx
                    currSectIdx = activeSectOffset > sectionHt*s && activeSectOffset < sectionHt*(s+1) ? s : currSectIdx
                }
            /*    if (overSectIdx !== currSectIdx) { 
                    setRoute(overSectIdx) 
                    currSectIdx = overSectIdx
                }*/
                setSCrollNav(windowScrollHt,currentScroll)
                this.setState({
                    scrollPosition: currentScroll,
                    sectOffset: sectionHt,
                    atTop: currentAtTop,
                    atBottom: currentAtBottom,
                    activeSectIdx: currSectIdx,
                    sectInViewIdx: overSectIdx,
                })
                _animationScroll = false;
            })
            _animationScroll = true;
        }
    }

    render() {
        return(
            <Router>
                <Header handler={this.toggleNavBtn} nameHandler={() => setRoute(0)} atTop={this.state.atTop} logos={this.state.logos} links={this.state.links}> 
                    <Nav handler={this.handleNavClick} atTop={this.state.atTop} links={this.state.links} sectOffset={this.state.sectOffset} activeSectIdx={this.state.activeSectIdx} sectInViewIdx={this.state.sectInViewIdx} />
                </Header>
                <main id="main">
                    <section><Route exact path='/' component={Home} /></section>
                    <section><Route exact path='/history' component={History} /></section>
                    <section><Route exact path='/resume' component={Resume} /></section> 
                </main>
                <Footer atTop={this.state.atTop} atBottom={this.state.atBottom} />
            </Router>
        )
    }
}

export default MainWrapper


