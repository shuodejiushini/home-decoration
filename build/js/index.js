$(function(){
	let bannerSwiper = new Swiper('.swiper-cooperative-partner', {
        loop: true,
        // autoplay: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })


    var rectangleSwiper = new Swiper(".swiper-rectangle-swiper", {
        slidesPerView: 3,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
      });
    
	
    // let rectangleSwiper = new Swiper('.swiper-rectangle-swiper', {
    //     slidesPerView: 3,
    //     // spaceBetween: 88,
    //     loop: true,
    //     // autoplay: true,
    //     pagination: {
    //         el: '.swiper-pagination',
    //         clickable: true,
    //     }
    // })
})
