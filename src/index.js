import './styles/main.scss'
import './styles/main.less'
import 'popper.js'
import 'bootstrap'
import 'babel-polyfill'
import 'ekko-lightbox'
import Stickyfill from 'stickyfilljs'
import $ from 'jquery'
window.jQuery = $
window.$ = $

var elements = document.querySelectorAll('.sticky')
Stickyfill.add(elements)

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

  // Assign active class to nav links while scolling
  $('.page-section').each(function (i) {
    if ($(this).position().top <= scrollDistance) {
      $('.navigation a.active').removeClass('active')
      $('.navigation a').eq(i).addClass('active')
    }
  })
}).scroll()

$(document).ready(function () {
  var animationElements = $.find('.animation-element')
  var webWindow = $(window)
  function checkIfInView () {
    var windowHeight = webWindow.height()
    var windowTopPosition = webWindow.scrollTop()
    var windowBottomPosition = (windowTopPosition + windowHeight)
    $.each(animationElements, function () {
      var element = $(this)
      var elementHeight = $(element).outerHeight()
      var elementTopPosition = $(element).offset().top
      var elementBottomPosition = (elementTopPosition + elementHeight)
      if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {
        element.addClass('in-view')
      } else {
        element.removeClass('in-view')
      }
    })
  }
  $(window).on('scroll resize', function () {
    checkIfInView()
  })
  $(window).trigger('scroll')
})
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
  event.preventDefault()
  $(this).ekkoLightbox()
})

// Navegação Nav Fixed e Botão Voltar para o topo.
var btn = $('#button')
var navsec = $('.navsec')
$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show')
    navsec.addClass('show')
  } else {
    btn.removeClass('show')
    navsec.removeClass('show')
  }
})

btn.on('click', function (e) {
  e.preventDefault()
  $('html, body').animate({scrollTop:0}, '300')
})

// Habilitando Tooltip no site.
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
