import React, { Component } from 'react'

let xDown = null, yDown = null

class RDLSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideCount: this.props.children.length,
            slideIdx: 0,
            slideSwipe: null,
        }
    } 

    componentDidMount() {
        document.addEventListener('touchstart', this.handleTouchStart, false)       
        document.addEventListener('touchmove', this.handleTouchMove, false)     
        document.addEventListener('touchend', this.handleTouchEnd, false)
    }

    componentWillUnmount() {
        document.removeEventListener('touchstart')     
        document.removeEventListener('touchmove')     
        document.addEventListener('touchend')
    }

    getTouches = (evt) => {
        return evt.touches || evt.originalEvent.touches
      }

    handleTouchStart = (evt) => {
        const firstTouch = this.getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
    
    handleTouchMove = (evt) => {
        if ( ! xDown || ! yDown ) return

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;    
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            this.setState( () => ({
                slideSwipe: xDiff > 0 ? 'right' : 'left'
            }))                    
        } 
        xDown = null;                                           
    };

    handleTouchEnd = () => {
        this.arrowClick(this.state.slideSwipe)                                      
    }; 

    arrowClick(direction) {
        const sliderContainer = document.getElementsByClassName('row-scroll')[0]
        const movTarget = sliderContainer.children[0]
        const clkTargets = sliderContainer.children
        const actTargets = sliderContainer.getElementsByClassName('col active')
        while(actTargets[0]) actTargets[0].classList.remove('active')
        if (direction === 'left') {
            this.setState( prevState => ({ 
                slideIdx: prevState.slideIdx > 0 ? prevState.slideIdx-1 : 0,
            }))
        } else {
            this.setState( prevState => ({ 
                slideIdx: prevState.slideIdx < this.state.slideCount-1 ? prevState.slideIdx+1 : this.state.slideCount-1,
            }))
        }
        clkTargets[this.state.slideIdx].classList.add('active')
        
    }

    makeMe = () => {

            return (
                <>
                <div className="row row-scroll">
                    {this.props.children}
                </div>
                <div 
                    className={this.state.slideIdx === 0 ? 'row-scroll-ctrl lt' : 'row-scroll-ctrl lt active'} 
                    onClick={() => this.arrowClick('left')}
                >
                    <i className={this.props.handleView.indexOf('top') < 0 ? 'fas fa-chevron-left fa-2x' : 'fas fa-chevron-left fa-3x'}></i>
                </div>
                <div 
                    className={this.state.slideIdx === this.state.slideCount-1 ? 'row-scroll-ctrl rt' : 'row-scroll-ctrl rt active'} 
                    onClick={() => this.arrowClick('right')}
                >
                    <i className={this.props.handleView.indexOf('top') < 0 ? 'fas fa-chevron-right fa-2x' : 'fas fa-chevron-right fa-3x'}></i>
                </div>
                </>
            )

    }

    render () {
        return this.makeMe()
    }

}

export default RDLSlider