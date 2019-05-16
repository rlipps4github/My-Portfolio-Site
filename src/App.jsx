import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'

import Header from './components/header'
import Nav from './components/nav'
import About from './components/about'
import Samples from './components/samples'
import Resume from './components/resume'
import Footer from './components/footer' 

let xDown = null, yDown = null // touch listeners

let _scrollTimeout = null, _scrolling = false // to enforce proper event control

let slideCnt = null

    /* NON-CLICK ROUTING */

function triggerRoute(navIdx) {
    document.getElementById('nav').getElementsByTagName('a')[navIdx].click() // trigger click router links
    if (document.getElementsByClassName('modal, pop').length) document.getElementsByClassName('modal, pop').classList.remove('pop') // close any modals if they exist
}

    /* MAIN APP */

class MainWrapper extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            device: 'mobile',
        // header
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
            atSection: 0,
        // slider
            slideIdx: 0,
            slideCount: 0,
            swipeDirection: null,
        // modal
            showText: false,
            showModal: '',
        // footer
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
        document.addEventListener('touchstart', this.handleTouchStart, false)       
        document.addEventListener('touchmove', this.handleTouchMove, false)     
        document.addEventListener('touchend', this.handleTouchEnd, false)   
        document.addEventListener('wheel', this.handleMouseWheel, false)
    }

    componentWillUnmount() {
        clearTimeout(_scrollTimeout)
        window.removeEventListener('resize')
        document.removeEventListener('touchstart')     
        document.removeEventListener('touchmove')     
        document.removeEventListener('touchend')   
        document.removeEventListener('wheel')
    }  

    customResponse = () => { // provides section & componenent level awareness for response
        let breakPoints = {desktop: 1500, laptop: 900, tablet: 600}
        let responsiveElements = document.getElementsByClassName('container')
        let currentWidth = window.innerWidth
        let currentHeight = window.innerHeight
        let currentDevice = null
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
            device: currentHeight >= breakPoints['tablet'] ? currentDevice : 'mobile',
        })
        for (let el=0; el<responsiveElements.length; el++) {
            let thisElement = responsiveElements[el]
            let thisWidth = thisElement.offsetWidth
            let thisHeight = thisElement.offsetHeight
            thisElement.classList.remove('desktop','laptop','tablet','mobile')
            switch (true) {
                case thisWidth >= breakPoints['desktop'] && currentHeight > breakPoints['tablet']: 
                    thisElement.classList.add('desktop')
                    break
                case thisWidth >= breakPoints['laptop'] && currentHeight > breakPoints['tablet']: 
                    thisElement.classList.add('laptop')
                    break
                case thisWidth >= breakPoints['tablet']:
                    if (thisHeight >= breakPoints['tablet']) thisElement.classList.add('tablet')
                    else thisElement.classList.add('mobile')
                    break
                default:
                    thisElement.classList.add('mobile')
            } 
        }
    }

        /* WHEEL EVENTS */

    handleMouseWheel = (e) => {
        if (e.target.classList.contains('scrl-nav')) { 
            const atLinkLen = this.state.links.length - 1
            let direction = null
            if (e.deltaY < 0) {         console.log('scroll up')
                direction = 'up'
            } else {                    console.log('scroll down')
                direction = 'down'
            }
            this.handleScrollSwipeNav(direction,1000)
        }
    }

        /* TOUCH EVENTS */

    getTouches = (e) => {
        return e.touches || e.originalEvent.touches
      }

    handleTouchStart = (e) => {
        const firstTouch = this.getTouches(e)[0]                                    
        xDown = firstTouch.clientX                                   
        yDown = firstTouch.clientY   
        this.setState( () => ({
            swipeDirection: null
        }))                                     
    };                                                
    
    handleTouchMove = (e) => {
        if ( ! xDown || ! yDown ) return
        var xUp = e.touches[0].clientX                                  
        var yUp = e.touches[0].clientY    
        var xDiff = xDown - xUp
        var yDiff = yDown - yUp
        if ( Math.abs( xDiff ) > 10 && Math.abs( yDiff ) < 10 ) {
            this.setState( () => ({
                swipeDirection: xDiff > 0 ? 'right' : 'left'
            }))                    
        } else if ( Math.abs( xDiff ) < 10 && Math.abs( yDiff ) > 10 ) {
            this.setState( () => ({
                swipeDirection: yDiff > 0 ? 'down' : 'up'
            }))                    
        } 
        xDown = null
        yDown = null                                           
    };

    handleTouchEnd = (e) => {
        if (this.state.swipeDirection) {
            const foundSlider = document.getElementsByClassName('row-scroll').length ? document.getElementsByClassName('row-scroll')[0] : null
            const isVert = this.state.swipeDirection === 'left' || this.state.swipeDirection === 'right'
            if (isVert && foundSlider) document.querySelectorAll('[data-dir="'+ this.state.swipeDirection +'"]')[0].click()
            if (! isVert) this.handleScrollSwipeNav(this.state.swipeDirection,1000)
        }
    }; 

    handleScrollSwipeNav = (direction,timeout) => { // take mousewheel or swipe direction, route accordingly
        if (! _scrolling) { 
            _scrolling = true
            const atLinkLen = this.state.links.length - 1
            if (direction === 'up') {   // console.log('swipe up')
                this.setState( prevState => ({
                    atTop: prevState.atSection === 0 ? true : false,
                    atSection: prevState.atSection-1 >= 0 ? prevState.atSection-1 : prevState.atSection,
                }));
            } else {                    // console.log('swipe down')
                this.setState( prevState => ({
                    atTop: false,
                    atSection: ! prevState.atTop && prevState.atSection+1 <= atLinkLen ? prevState.atSection+1 : prevState.atSection,
                }));

            }
            triggerRoute(this.state.atSection)
        }
        _scrollTimeout = setTimeout(() => { _scrolling = false },timeout)
    } 

    /* CLICK EVENTS */

    handleNameClick = (e) => { // clicks on site name badge 
        e.stopPropagation()
        this.setState({
            atTop: true,
        })
        document.getElementById('nav').classList.remove('open')
        document.getElementById('navBtn').classList.remove('open')
        triggerRoute(0)
    }
    
    handleNavClick = (e) => { // update our state on main nav item click
        e.stopPropagation()
        const clickIdx = parseInt(e.target.getAttribute('data-idx'))
        this.setState( () => ({
            atSection: clickIdx,
            slideIdx: 0,
        }))
        document.getElementById('nav').classList.remove('open')
        document.getElementById('navBtn').classList.remove('open')
    }
    
    toggleNavBtn = (e) => { // mobile nav hamburger toggle on click
        e.stopPropagation()
        const theNav = document.getElementById('nav')
        const theNavBtn = document.getElementById('navBtn')
        if (theNav.classList.contains('open') || theNavBtn.classList.contains('open')) {
            theNav.classList.remove('open')
            theNavBtn.classList.remove('open')
        } else {
            theNav.classList.add('open')
            theNavBtn.classList.add('open')
        }
    }

    sliderArrowClick = (e) => {
        e.stopPropagation()
        slideCnt = document.getElementsByClassName('row-scroll').length ? document.getElementsByClassName('row-scroll')[0].children.length : null
        const direction = e.target.getAttribute('data-dir')
        if (direction === 'left') {
            this.setState( prevState => ({ 
                slideIdx: prevState.slideIdx > 0 ? prevState.slideIdx-1 : 0,
                slideCount: prevState.slideCount !== slideCnt ? slideCnt : prevState.slideCount,
            }))
        } else {
            this.setState( prevState => ({ 
                slideIdx: prevState.slideIdx < slideCnt-1 ? prevState.slideIdx+1 : slideCnt-1,
                slideCount: prevState.slideCount !== slideCnt ? slideCnt : prevState.slideCount,
            }))
        }
    }

    invokeText = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.target.classList.toggle('active')
    }

    invokeModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const name = e.target.getAttribute('data-video') || null
        if (name) {
            this.setState(() => ({
                showModal: name,
            }))
        }
    }

    clearModal = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            showModal: '',
        })
    }

    handleWelcomeClick = (e) => { // dismiss welcome screen 
        e.stopPropagation()
        this.setState({
            atTop: false,
        })
    }

    render() {
        return(
            <Router>

                <Header 
                    toggleNavBtn={this.toggleNavBtn} 
                    handleNameClick={this.handleNameClick} 
                    atTop={this.state.atTop} 
                    logos={this.state.logos} 
                    links={this.state.links} 
                    device={this.state.device}
                > 
                    <Nav 
                        handleNavClick={this.handleNavClick} 
                        atTop={this.state.atTop} 
                        atSection={this.state.atSection} 
                        links={this.state.links} 
                    />
                </Header>

                <main id="main">

                    <article 
                        className={this.state.atTop ? 'container' : 'container rollupTop'} 
                        onClick={this.handleWelcomeClick} 
                    >
                        <div className="row row-pad">
                            <div className="col col-mob-12 column-pad text-center">
                                <header>
                                    <h1>Thanks for visiting!</h1>
                                    <p> My name is Ron and I am a Web Developer <br />specializing in Front End development.<br />I like PM's with a great sense of humor and long walks on the beach...</p>
                                    <p> Scroll or click to see more!</p>
                                    <button className="welcomeButton fas fa-2x fa-arrow-circle-down"></button>
                                </header>
                            </div>
                        </div>
                    </article>

                    <section>
                        <AnimatedSwitch
                            atEnter={{opacity:0}}
                            atLeave={{opacity:0}}
                            atActive={{opacity:1}}
                            className="switch-wrap"
                        >
                            <Route exact path='/' key="about" render={() => (
                                <About 
                                    device={this.state.device} 
                                    slideIndex={this.state.slideIdx} 
                                    slideCount={this.state.slideCount} 
                                    sliderArrowClick={this.sliderArrowClick} 
                                />
                            )} />
                            <Route path='/samples' key="samples" render={() => (
                                <Samples 
                                    device={this.state.device} 
                                    slideIndex={this.state.slideIdx} 
                                    slideCount={this.state.slideCount} 
                                    sliderArrowClick={this.sliderArrowClick} 
                                    invokeText={this.invokeText} 
                                    showText={this.state.showText} 
                                    invokeModal={this.invokeModal} 
                                    clearModal={this.clearModal} 
                                    showModal={this.state.showModal}  />
                            )} />
                            <Route path='/resume' key="resume" render={() => (
                                <Resume device={this.state.device} />
                            )} />
                            <Route path="/" component={About} />
                        </AnimatedSwitch>
                    </section>

                </main>

                <Footer atTop={this.state.atTop} links={this.state.footLinks} device={this.state.device} />

            </Router>
        )  
    }
}

export default MainWrapper


