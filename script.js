'use strict';


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
//Tabbed component
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

///////////////////////////////////////
// Modal window



const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal)
})



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Button scrolling
btnScrollTo.addEventListener('click', (e) => {
  e.preventDefault()
  
  section1.scrollIntoView({behavior: 'smooth'})
})


document.querySelector('.nav__links').addEventListener('click', function(e){
 
  e.preventDefault()
  
  //Matching strategy (event delegation) 
  if(e.target.classList.contains('nav__link') && e.target.getAttribute('href') !== '#' ){
   
       const id = e.target.getAttribute('href')
       document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})


//Tabbed funcionality

tabsContainer.addEventListener('click', (e) => {
  
  const clicked = e.target.closest('.operations__tab')
  
  //Guard clause
  if(!clicked) return
// Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'))
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

//Activate tab
  clicked.classList.add('operations__tab--active')

  //Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
  
})

// Faid meniu animation func

const handleNavFaid = function (e) {
  
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(s => {
      if(s !== link) s.style.opacity = this
    })
    logo.style.opacity = this

}
}

//Meniu faid animation // Passing "argument" into handler 
nav.addEventListener('mouseover', handleNavFaid.bind(0.5))

nav.addEventListener('mouseout', handleNavFaid.bind(1))


// Sticky navigation : Intersection Observer API  

const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height


const stickyNav = function(entries){
  const [entry ] = entries
  
  
  if(!entry.isIntersecting) {
    nav.classList.add('sticky')
  }else{
    nav.classList.remove('sticky')
  }
}

const headerObv = new IntersectionObserver(stickyNav,{root: null,  threshold: 0, rootMargin: `-${navHeight}px` } )

headerObv.observe(header)


//Reveal sections

const allSection = document.querySelectorAll('.section')

const revealSec = function(entries, observer){
  const [entry] = entries
  
  if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
  
    observer.unobserve(entry.target)
}

const sectionObv = new IntersectionObserver(revealSec, {root:null, threshold: 0.15})

allSection.forEach(section => {
   sectionObv.observe(section)
  //section.classList.add('section--hidden')
})

//Loading images

const imgTarget = document.querySelectorAll('img[data-src]')

const loadImg = function(entries, observe){

    const [entry] = entries
    
    if(!entry.isIntersecting) return

 entry.target.src = entry.target.dataset.src
 entry.target.addEventListener('load', function(){
  entry.target.classList.remove('lazy-img')
 })
 
  
 observe.unobserve(entry.target)
  }

const imgObv = new IntersectionObserver(loadImg, {root: null, threshold:0, rootMargin: '200px'})

imgTarget.forEach(img => imgObv.observe(img))

//img slider

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')

const btnSliderLeft = document.querySelector('.slider__btn--left')
const btnSliderRight = document.querySelector('.slider__btn--right')

let curSlide = 0 
const maxSlides = slides.length

//Slide func
const goToSlide = function(slide){
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide) }%)`
  })
}

goToSlide(0)

//next Slide func
const nextSlide = function(){

  if(curSlide === maxSlides -1 ){
    curSlide = 0
  }else{
    curSlide++
  }
  
  goToSlide(curSlide)
}

const prevSlide = function(){
  if(curSlide === 0){
    curSlide = maxSlides -1
    
  }else{
    curSlide--
   
  }
 
  goToSlide(curSlide)
}

btnSliderRight.addEventListener('click', nextSlide)
btnSliderLeft.addEventListener('click', prevSlide)

// btnSliderLeft.addEventListener('click', function(e){
  
//   curSlide++
//   slides.forEach((slide, i) => {
//     slide.style.transform = `translateX(${100 * (i - curSlide)}%)`
//   })
// })

/////////////////////////////////////////////////////

