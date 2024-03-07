/* REF CODE
https://codepen.io/sonamtsu/pen/OapxOd
https://codepen.io/ljubica_b/pen/aqZeWP/
https://jsfiddle.net/rajsnd08/eve8sd3g/15/
*/

$(function() {
  $.scrollify({
    section: ".panel",
    //sectionName:false,
    scrollSpeed: 1000,
    overflowScroll: false,
    interstitialSection: ".header",
    //standardScrollElements: '.content-scroll, .inner-scroll', //We can add inside scroll for perticular section
     easing: "easeOutExpo",
     offset : 1,
     //easing: "easeOutBounce",
    //  offset: 0,
    //setHeights: true,
     scrollbars: true, //This should be true then having overflow scroll
     updateHash: true, //Url #address enabled on scroll
     touchScroll: true,
    afterResize:function(){
      location.reload();
    },


     //   interstitialSection: "",
    //   offset: 0,
    //   scrollbars: true,
    //   standardScrollElements: "",
    //   setHeights: true,
    //   updateHash: true,
   
    //   before: function () { },
    //   after: function () { },
    //   afterResize: function () { },
    //   afterRender: function () { }
    before:function(i,panels) {
      var ref = panels[i].attr("data-section-name");
      $(".pagination .active").removeClass("active");
      $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
    },
    afterRender:function() {
      var pagination = "<ul class=\"pagination\">";
      var activeClass = "";
      $(".panel").each(function(i) {
        activeClass = "";
        if(i===$.scrollify.currentIndex()) {
          activeClass = "active";
        }
        pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
      });
      pagination += "</ul>";

      //$(".home").append(pagination);
      $(".pagination li a").on("click",$.scrollify.move);
    }
    

  });
  $(".circle-nav a").click(function(evn) {
    evn.preventDefault();
    if ($(this).hasClass('no-scroll') && (!$(this).closest('li').siblings('.active').find('a').hasClass('no-scroll'))) {
      $.scrollify.instantMove('#3');
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 500);
    } else {
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 500);z
    }
    $('.circle-nav').find('li').removeClass('active');
    $(this).closest('li').addClass('active');
  });
});



