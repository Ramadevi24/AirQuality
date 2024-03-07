$(document).ready(function () {
  // 05-Feb-2024 Bannner text fadeout function start------

  var quotes = $(".quotes");
  var quoteIndex = -1;

  function showNextQuote() {
    ++quoteIndex;
    quotes.eq(quoteIndex % quotes.length)
      .fadeIn(2000)
      .delay(2000)
      .fadeOut(2000, showNextQuote);
  }

  showNextQuote();
  // Bannner text fadeout function End--------

  //  05-Feb-2024 Breath text heading animation script Start--------------

  var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.05em solid #fff }";
    document.body.appendChild(css);
  };
  // Breath text heading animation script End--------------


  //  05-Feb-2024 Footer Arrow animation script Start--------------   
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  var rootElement = document.documentElement;

  function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  scrollToTopBtn.addEventListener("click", scrollToTop);
  // Footer Arrow animation script End--------------   

  //  05-Feb-2024 Banner Arrrow animation script Start-------------- 
  $('.down-arrow-bg').click(function () {
    let currentSectionIndex = 0;
    var nextSection = $(this).closest('.down-arrow').next('section');
    if (nextSection.length > 0) {
      nextSection[currentSectionIndex].scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });
  // Banner Arrrow animation script End-------------- 

  //  05-Feb-2024 Map Search icon script Start--------------   
  $('.listSearch li').on("click", function () {
    $(".listSearch li").css("background-color", "");
    $(this).css("background-color", "rgb(57 56 56)");
    var value = $(this).text();
    //alert(value);
    $(".show-mapSearchList").show();
    $(".show-mapSearchList").html(value);
    $('.Newsearch-box').hide();
  });

  $('.show-mapSearchList').click(function () {
    $('.Newsearch-box').show();
    $(".show-mapSearchList").hide();
  });
  // Map Search icon script Start--------------   


  // 01-Feb-2024---Station Meterological dropdown Script Start -----------------------
  $(".litext").on("click", function () {
    $(".litext").css("background-color", "");
    $(this).css("background-color", "#e5e5e5");
    var value = $(this).text();
    $(".txt_basic").html(value);
    $(".treeview-dropdown").slideToggle("fast");
  });


  // 01-Feb-2024 -Station Meterological dropdown Script End ----------------------------------------------

  // 02-Feb-2024 Station Meterological dropdown Script Start ------------------------
  var isContentVisible = true;

  function toggleContent() {
    if (isContentVisible) {
      // Change the content when it's visible
      $('.treeview-childtext span').html('arrow_drop_down');
    } else {
      // Change it back to the original text when it's not visible
      $('.treeview-childtext span').html('arrow_right');
    }

    // Toggle the state
    isContentVisible = !isContentVisible;
  }


  $(".treeview-childtext").on("click", function () {
    $(this).next().slideToggle("fast");
    toggleContent();
  });

  $(".treeview-dropdown").hide();
  //$(".treeview-dropdownchild").hide();
  $(".treeview-btn").on("click", function () {
    $(".treeview-dropdown").slideToggle("fast");
  });


  // End 02-Feb-2024 Station Meterological dropdown Script End------------------

  // 23-Jan-2024 Start this modified this section-------------------------
  // Like button Animation Start---------------------
  $(".icon-like").click(function () {
    //$(this).children('i, span').toggleClass("press animated tada go", 1000);
    $('.icon-like, .spanLike').toggleClass("press animated tada go", 1000);

  });
  // Like button Animation End---------------------
});

//  05-Feb-2024 Station Meterological Section Graph digit animation Start---------------
var animationTriggered = false;
// Hiding Nav some page scroll
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 600 && !animationTriggered) {
    animationTriggered = true;
    $('.apexcharts-datalabel-value').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
  } else {
    return false;
  }
});
// Station Meterological Section Graph digit animation End---------------


//// 08-JAN-2024--Mobile Menu---------------------------
$('.navmobile-new').click(function () {
  $('#hamburger').toggleClass('open');
  $('#overlay').toggleClass('menu');
});

//// 08-JAN-2024----Mobile Menu-------------------------
$('.mobile-menu a').click(function () {
  $('.mobile-menu a').removeClass("active");
  $(this).addClass("active");
  $('#hamburger').removeClass('open');
  $('#overlay').removeClass('menu');
});

////For Sorting Start------------------------------
function sortRankingTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("ranking-sorting");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {

      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;

      switchcount++;
    } else {

      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
////For Sorting End------------------------------


/////EAD MONITORING PROJECTS Slider Start---------------------

// santhu 16-dec
$(".projects-slick .img-box .read-popup-btn").click(function (e) {
  currentImg = $(this).parent().parent();
  $('.about-division .projects-box').addClass("full-view");
  //$('.overlay-transition').addClass("active");
  currentImg.addClass("show");
  currentImg.addClass("add-opacity");
  // setTimeout(function () {
  //   currentImg.addClass("show");
  //   setTimeout(function () {
  //     currentImg.addClass("add-opacity");
  //   }, 400);
  // }, 0);
});

// Hiding Image content
$(".projects-slick .img-box .close").click(function (even) {
  event.stopPropagation();
  $(this).parent('.img-box').removeClass("add-opacity");
  $('.about-division .projects-box').removeClass("full-view");
  setTimeout(function () {
    $(".projects-slick .img-box").removeClass("show");
    // setTimeout(function () {
    //   $('.overlay-transition').removeClass("active ");
    // }, 100);
  }, 0);
});

// Soil Quality Slider
function SoilQualityFunction(elem) {
  var CurrentID = $(elem).attr("id");
  //alert(CurrentID);
  $('#' + CurrentID).closest('#quality2b').addClass('highlight-content');
  // .parent('.w-100').parent('.mont-carousel').parent('.show').addClass('highlight-content');
}

$('.mont-close').click(function () {
  $('#quality2b').removeClass('highlight-content');
});

$('.montimg').click(function () {
  $('#quality2b').removeClass('highlight-content');
});

// Marine Water Quality

function MarineWaterFunction(elem) {
  var CurrentID = $(elem).attr("id");
  //alert(CurrentID);
  $('#' + CurrentID).closest('#quality2c').addClass('highlight-content');
  // .parent('.w-100').parent('.mont-carousel').parent('.show').addClass('highlight-content');
}
$('.marine-close').click(function () {
  $('#quality2c').removeClass('highlight-content');
});

$('.montimg').click(function () {
  $('#quality2c').removeClass('highlight-content');
});

// Alir Quality Slider
function AirQualityFunction(elem) {
  var CurrentID = $(elem).attr("id");
  //alert(CurrentID);
  $('#' + CurrentID).closest('#quality2a').addClass('highlight-content');
  // .parent('.w-100').parent('.mont-carousel').parent('.show').addClass('highlight-content');
}

$('.air-close').click(function () {
  $('#quality2a').removeClass('highlight-content');
});
$('.montimg').click(function () {
  $('#quality2a').removeClass('highlight-content');
});

// GroundQualityFunction Slider
function GroundQualityFunction(elem) {
  var CurrentID = $(elem).attr("id");
  //alert(CurrentID);
  $('#' + CurrentID).closest('#quality2d').addClass('highlight-content');
  // .parent('.w-100').parent('.mont-carousel').parent('.show').addClass('highlight-content');
}

$('.ground-close').click(function () {
  $('#quality2d').removeClass('highlight-content');
});
$('.montimg').click(function () {
  $('#quality2d').removeClass('highlight-content');
});


$('.mont-carousel .carousel-item').each(function () {
  var minPerSlide = 6;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next(); if (!next.length) {
      next = $(this).siblings(':first');
    } next.children(':first-child').clone().appendTo($(this));
  }
});

// $('.mont-carousel').carousel({
//   interval: false,
// });
/////EAD MONITORING PROJECTS Slider End---------------------


/////EAD MONITORING PROJECTS Slider Start---------------------
$(document).ready(function () {
  $('.items').slick({
    infinite: true,
    lazyLoad: 'ondemand',
    slidesToShow: 3,
    slidesToScroll: 3
  });

  // Santhu 16-dec
  $('.achievement-slick').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    arrows: false,
    autoplay: false,
  });

  $('.projects-slick').slick({
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    arrows: true,
    autoplay: false
  });
});
/////EAD MONITORING PROJECTS Slider End---------------------