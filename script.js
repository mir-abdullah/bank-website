'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header =document.querySelector('.header');
console.log(header);


//cookie message attempt
/*
const message =document.createElement('div');
message.classList.add('cookie-message');
message.textContent='we use cookies for better experience';
message.innerHTML='we use cookies for better experience <button class-name="btnbtn--close-cookie">GOT IT!</button>';
header.append(message);


document.querySelector('.btn--close-cookie').addEventListener('.click',function(){
  //message.remove();
  message.parentElement.removeChild(message); 
})

message.style.backgroundColor='orange';*/

const section1 = document.querySelector('#section--1');
const btnScrollTo =document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click',function(e){
  e.preventDefault();
  section1.scrollIntoView({behavior:'smooth'});
})
//scrolling event delegation
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if (e.target.classList.contains('nav__link')){
    const id =e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
    }
  });

  //tabs container
  const tabs =document.querySelectorAll('.operations__tab');
  const tabContainer =document.querySelector('.operations__tab-container');
  const content =document.querySelectorAll('.operations__content');

  tabContainer.addEventListener('click',function(e){
    const clicked =e.target.closest('.operations__tab');

    if(!clicked) return;

    tabs.forEach(t =>t.classList.remove('operations__tab--active'));
    content.forEach(c=>c.classList.remove('operations__content--active'))

    clicked.classList.add('operations__tab--active');

    document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');


  })

  // fade animation
  const nav = document.querySelector('.nav');

  const handleHover = function(e,opacity){
    if (e.target.classList.contains('nav__link')){
      const link = e.target;
      const sib =link.closest('.nav').querySelectorAll('.nav__link');
      const logo =link.closest('.nav').querySelector('img');

      sib.forEach(el => {
        if (el !== link ) el.style.opacity=this});
        logo.style.opacity=this;

      }

    }


    nav.addEventListener("mouseover",handleHover.bind(0.5));
    nav.addEventListener("mouseout",handleHover.bind(1));


    //sticky nvigation
    const navHeight = nav.getBoundingClientRect().height;
    console.log(navHeight);

    const stickyNav = function(entries){
      const [entry] =entries;
      
      if(!entry.isIntersecting) nav.classList.add('sticky');
      else nav.classList.remove('sticky');
    }

    const headerObserver = new IntersectionObserver(stickyNav,{
      root: null,
      threshold:0,
      rootMargin:`-${navHeight}px`,
    });
    headerObserver.observe(header);

    //reveal sections

    const allSections = document.querySelectorAll('.section');

    const revealSection = function(entries,obserer){
      const  [entry] =entries;
      if (!entry.isIntersecting)return;

      entry.target.classList.remove('section--hidden');


      obserer.unobserve(entry.target);
     
    }


    const sectionObserver = new IntersectionObserver(revealSection,{
      root:null,
      threshold:0.10,
        });

        allSections.forEach(function(section){
          sectionObserver.observe(section);
          section.classList.add('section--hidden');
        });

  const imgTargets =document.querySelectorAll('img[data-src]');

  const imgLoad =function(entries,obserer){
    const [entry] =entries;

    if(!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load',function(){
      entry.target.classList.remove('lazy-img');
    })

    obserer.unobserve(entry.target);

  }


  
  const imgObserver = new IntersectionObserver(imgLoad,{
    root:null,
    threshold:0,
    rootMargin:'200px',
  });

  imgTargets.forEach(img =>imgObserver.observe(img))

  //slider implementation

const dotContainer= document.querySelector('.dots');
  const slides =document.querySelectorAll('.slide');

  const btnLeft =document.querySelector('.slider__btn--left');
  const btnRight =document.querySelector('.slider__btn--right');

  let curSlide =0;
  const maxSlide = slides.length;
  

  const createDots = function(){
    slides.forEach(function(_,i){
      dotContainer.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${i}">
      </button>`);
    });
  }
 

  const activateDot = function(slide){
    document.querySelectorAll(`.dot__dot`).forEach
    (dot => dot.classList.remove('dots__dot--active'));
 
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).
    classList.add('dots__dot--active');

  }

  const goToSlide = function(slide){
    slides.forEach((s,i)=> (s.style.transform =
     `translateX(${100 * (i- slide)}%)`));
  };



  const nextSlide = function(){
    if (curSlide == maxSlide-1){
      curSlide =0;
    }else{
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function(){
    if (curSlide==0){
      curSlide =maxSlide-1;
    }else{
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function(){
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();
///event listners
  btnRight.addEventListener('click',nextSlide);
  btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
 if (e.key =='ArrowLeft') prevSlide();
 e.key =='ArrowRight'  && nextSlide();
 
})

dotContainer.addEventListener('click',function(e){
if(e.target.classList.contains('dots__dot')){
  const {slide} =e.target.dataset;
  goToSlide(slide);
  activateDot(slide);
}
});




