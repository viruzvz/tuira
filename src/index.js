import './styles/main.scss'
import './styles/main.less'
import 'popper.js'
import 'bootstrap'
import 'babel-polyfill'
import $ from 'jquery'
window.jQuery = $
window.$ = $

$('.nav-item a').on('click', function (event) {
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== '') {
    // Prevent default anchor click behavior
    event.preventDefault()
    // Store hash
    var hash = this.hash
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({ scrollTop: $(hash).offset().top }, 800, function () {
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash
    })
  } // End if
})

$(window).scroll(function () {
  var scrollDistance = $(window).scrollTop()

  // Show/hide menu on scroll
  //if (scrollDistance >= 850) {
  //		$('nav').fadeIn('fast')
  //} else {
  //		$('nav').fadeOut('fast')
  //}

  // Assign active class to nav links while scolling
  $('.page-section').each(function (i) {
    if ($(this).position().top <= scrollDistance) {
      $('.navigation a.active').removeClass('active')
      $('.navigation a').eq(i).addClass('active')
    }
  })
}).scroll()
