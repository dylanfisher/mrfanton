$ = jQuery;

//
// Namespace
//

var Fanton = {};
Fanton.state   = History.getState();
Fanton.homeUrl = $('html').attr('data-root-url');
Fanton.tt      = 400;
Fanton.ttLong  = 800;
Fanton.easing  = 'cubic-bezier(0.23, 1, 0.32, 1)';
Fanton.stateInitiated = false;
Fanton.scrollTop = $(window).scrollTop();
Fanton.gutterSize = 1.75; // Gutter size in VW, match this to the CSS value

Fanton.isMobile = function() {
  if($(window).width() < 768){
    Fanton.tt = 0;
    Fanton.ttLong = 0;
    return true;
  } else {
    return false;
  }
};

Fanton.isNotMobile = function() {
 return !Fanton.isMobile();
};

jQuery.easing.def = 'easeInOutQuart';

if(Fanton.isNotMobile()) {
  // Bind to StateChange Event
  History.Adapter.bind(window, 'statechange', function(e) { // Note: We are using statechange instead of popstate
    Fanton.state = History.getState(); // Note: We are using History.getState() instead of event.state
    console.log('statechange - state: ', Fanton.state);

    if(Fanton.state.url == Fanton.homeUrl || Fanton.state.url == Fanton.homeUrl + '?list' || Fanton.state.data.state == 'home') {
      var closeButtons = [
        '.close-button',
        '.information__close-button'
        ];
      $(closeButtons.join(',')).trigger('click');
    } else {
      if(Fanton.stateInitiated) return;

      if(Fanton.state.data.stateUrl && $('.home-page-nav a[href="'+Fanton.state.data.stateUrl+'"]').length) {
        $('.home-page-nav a[href="'+Fanton.state.data.stateUrl+'"]').first().trigger('click');
      } else if (Fanton.state.title == 'Information') {
        $('.information-link').trigger('click');
      }
    }

    Fanton.stateInitiated = false;
  });
}

//
// DOCUMENT READY
//

$(function() {
  // Fanton.backgroundCheckInit();
  Fanton.setIframeHeight($('.single-post-content'));
});

//
// HOVER ON LIST PROJECT
//

$(document).on('mouseenter', '.home-page-nav-item--list', function() {
  if(Fanton.isNotMobile()) {
    $('body').addClass('is-hovering-on-list-item');
  }
});

$(document).on('mouseleave', '.home-page-nav-item--list', function() {
  if(Fanton.isNotMobile()) {
    $('body').removeClass('is-hovering-on-list-item');
  }
});

//
// OPEN PROJECT
//

$(document).on('click', '.home__post-title-link', function(e) {
  if(Fanton.isMobile()) return;

  e.preventDefault();

  if(Fanton.transitionInProgress()) return;
  $('html').addClass('js-transitioning');

  Fanton.stateInitiated = true;
  if( $(this).hasClass('js-active') || ($('body').hasClass('single-project-loaded') && $(this).hasClass('home__post-title-link--grid-mode')) ) return;
  console.log('Open project');
  console.log($(this));

  var $link = $(this);
  var $wrapper = $link.closest('.home__post-title-wrapper');
  if(!$wrapper.length) $wrapper = $link.closest('.home__post-title-wrapper--grid');
  var featuredImageUrl = $link.closest('.home-page-nav-item').find('[data-background-image]').attr('data-background-image');
  console.warn(featuredImageUrl);
  var featuredImageHTML = '<div class="col-sm-12"><div class="featured-image-as-background" style="background-image: url(' + featuredImageUrl + ');"></div></div>';
  var url = $link.attr('href');
  var title = $link.attr('data-title');

  $wrapper.addClass('js-active');

  if($link.hasClass('home__post-title-link--grid-mode')) {
    // GRID MODE
    $('#ajax-wrapper')
      .addClass('grid-mode-js-active')
      .css({
        opacity: 0,
        display: 'block',
        width: '100%',
        height: '100%',
      })
      .transition({
        opacity: 1
      }, Fanton.ttLong, Fanton.easing);

    $wrapper.find('.home__post-image--grid').transition({opacity: 1}, Fanton.ttLong, Fanton.easing, function() {
      afterOpeningTransitionCallbacks();
    });
  } else {
    // LIST MODE
    $wrapper.addClass('active');
    $('html').addClass('transitioning');
    $wrapper.find('.home__post-image').transition({}, Fanton.ttLong, Fanton.easing, function() {
      afterOpeningTransitionCallbacks();
    });
    // $wrapper.find('.home__post-image').transition({x: -(100- Fanton.gutterSize) + '%'}, Fanton.ttLong, Fanton.easing, function() {
    //   afterOpeningTransitionCallbacks();
    // });
  }

  History.pushState({stateUrl: url}, title, url);

  $('#ajax-wrapper #ajax-wrapper__featured-image').html(featuredImageHTML);

  $('#ajax-wrapper #ajax-wrapper__post').load(url + ' .content', function(response, status, xhr) {
    $('body').addClass('single-project-loaded');

    if($('.single-page-previous-post-buttons').length) {
      var originalPrev = $('.controls__bottom-controls').find('.previous-button');
      var originalNext = $('.controls__bottom-controls').find('.next-button');
      var newPrev = $('.single-page-previous-post-buttons').find('.previous-button');
      var newNext = $('.single-page-previous-post-buttons').find('.next-button');
      console.log('newPrev', newPrev);
      console.log('newNext', newNext);
      originalPrev.replaceWith(newPrev);
      originalNext.replaceWith(newNext);
    }
  });

  var colorScheme = $link.attr('data-color-scheme');
  Fanton.setColorScheme(colorScheme);

  function afterOpeningTransitionCallbacks() {
    $('html').removeClass('js-transitioning transitioning');
    Fanton.setIframeHeight($('.single-post-content'));
    // Fanton.backgroundCheckInit();
  }
});

//
// CLOSE PROJECT
//

$(document).on('click', '.close-button', function() {
  // if(Fanton.isMobile()) return;
  console.log(Fanton);
  Fanton.closeProject();
});


$(document).on('click', '.site-title', function(e) {
  if(Fanton.isMobile()) {
    window.location = Fanton.homeUrl;
    return;
  }
  console.log(Fanton.isViewingSingleProject());
  if(Fanton.isViewingSingleProject()) {
    Fanton.closeProject();
    e.preventDefault();
  } else if(Fanton.isViewingInformation()) {
    Fanton.closeInformation();
    e.preventDefault();
  }
});

//
// OPEN FOOTER INFORMATION
//

$(document).on('click', '.information-link', function(e) {
  if(Fanton.isMobile()) return;
  if(Fanton.transitionInProgress()) return;
  $('html').addClass('js-transitioning');
  Fanton.stateInitiated = true;
  console.log('Open information');

  var $wrapper = $(this).closest('.information-link-wrapper');
  var url = $(this).attr('href');
  var title = 'Information';

  $wrapper.addClass('js-active');

  History.pushState({stateUrl: url}, title, url);

  $('body').addClass('information-open');
  $wrapper.transition({y: '-100vh'}, Fanton.ttLong, Fanton.easing, function() {
    $('html').removeClass('js-transitioning transitioning');
  });

  e.preventDefault();
});

//
// CLOSE FOOTER INFORMATION
//

$(document).on('click', '.information__close-button', function() {
  if(Fanton.isMobile()) {
    window.location = Fanton.homeUrl;
    return;
  }

  Fanton.closeInformation();
});

//
// OPEN SINGLE POST INFORMATION
//

$(document).on('click', '.read-button', function() {
  if(Fanton.transitionInProgress()) return;
  $('html').addClass('js-transitioning');
  Fanton.stateInitiated = true;
  console.log('Open post information');

  Fanton.lastScrollTop = $(window).scrollTop();

  $('body').addClass('showing-post-information');
  $('.post__information').scrollTop(0);
  $('.post__information-wrapper').css({opacity: 0}).transition({opacity: 1}, Fanton.ttLong, Fanton.easing, function() {
    $('html').removeClass('js-transitioning transitioning');
  });
});

//
// CLOSE SINGLE POST INFORMATION
//

$(document).on('click', '.images-button', function() {
  // if(Fanton.isMobile()) return;
  if(Fanton.transitionInProgress()) return;
  $('html').addClass('js-transitioning');
  Fanton.stateInitiated = true;
  console.log('Close post information');

  $('html').addClass('post-information-transition-out');
  $('.post__information-wrapper').transition({opacity: 0}, Fanton.ttLong, Fanton.easing, function() {
    $('body').removeClass('showing-post-information');
    $('html').removeClass('js-transitioning post-information-transition-out transitioning');
  });

  if(Fanton.isMobile()) {
    $(window).scrollTop(Fanton.lastScrollTop);
    console.warn('Fanton.lastScrollTop', Fanton.lastScrollTop);
  }
});

//
// ON SINGLE PROJECT: CLICK ARROW TO GO DOWN TO PROJECT
//

$(document).on('click', '.down-button', function() {
  $('html, body').animate({scrollTop: $('.post__images__image-wrapper').first().offset().top}, 600);
});

//
// ON SINGLE PROJECT: ARROW KEYS NAVIGATE BETWEEN IMAGES
//

$(document).keydown(function(e) {
  if (!Fanton.isViewingSingleProject()) return;

  var images = [];
  $('.post__images .post__images__image-wrapper').each(function(){
    images.push(this.offsetTop);
  });

  var url = false;
  var dir = false;
  var targetUp = -1;

  switch (e.keyCode) {
    case 37: // Left arrow
      if(Fanton.isViewingSingleProject()) {
        if($('.controls__bottom-controls .previous-button a').length) {
          url = $('.controls__bottom-controls .previous-button a').attr('href');
        }
      }
    break;

    case 39: // Right arrow
      if(Fanton.isViewingSingleProject()) {
        if($('.controls__bottom-controls .next-button a').length) {
          url = $('.controls__bottom-controls .next-button a').attr('href');
        }
      }
    break;

    case 38: // Up arrow
      dir = -1;
    break;

    case 40: // Down arrow
      dir = 1;
    break;

    default:
    return;
  }

  if (url) {
    window.location = url;
  }

  if (dir) {
    e.preventDefault();
    winUp = window.scrollY;
    $.each(images, function(i, v){
      if ((dir == 1 && winUp < v && targetUp < 0) || (dir == -1 && winUp > v)) {
        targetUp = v;
      }
    });

    if (targetUp >= 0) {
      $('html, body').stop().animate({scrollTop: targetUp}, 600);
    } else if (dir == -1) {
      $('html, body').stop().animate({scrollTop: 0}, 600);
    }
  }
});

//
// SCROLL EVENTS
//

if(Fanton.isNotMobile()) {
  $(window).on('scroll', function() {
    Fanton.scrollTop = $(window).scrollTop();
    if(Fanton.scrollTop > 0) {
      $('html').addClass('js-has-scrolled');
    } else {
      $('html').removeClass('js-has-scrolled has-scrolled');
    }
  });
}

//
// RESIZE EVENTS
//

$(window).resize(function() {
  Fanton.setIframeHeight($('.single-post-content'));
});

//
// HOVER EVENTS ON GRID ITEMS
//

$(document).on('mouseenter', '.grid-item a', function() {
  if(Fanton.isMobile()) return;
  var $gridItem = $(this).closest('.grid-item');
  $gridItem.addClass('grid-item--hover');
});

$(document).on('mouseleave', '.grid-item a', function() {
  if(Fanton.isMobile()) return;
  var $gridItem = $(this).closest('.grid-item');
  $gridItem.removeClass('grid-item--hover');
});

// Global functions

Fanton.setSinglePost = function() {
  if(Fanton.isMobile()) return;
  console.log('Fanton.setSinglePost');
  Fanton.state.data.stateUrl = window.location.href;
};

Fanton.removeColorScheme = function() {
  console.log('Fanton.removeColorScheme');
  $('body').removeClass(function(index, css) {
    return (css.match (/(^|\s)color-scheme--\S+/g) || []).join(' ');
  });
};

Fanton.setColorScheme = function(forceColorScheme) {
  Fanton.removeColorScheme();
  console.log('Fanton.setColorScheme');
  var colorScheme;

  if(forceColorScheme) {
    colorScheme = forceColorScheme;
  } else {
    colorScheme = $('[data-color-scheme]').attr('data-color-scheme');
  }

  $('body').addClass('color-scheme--' + colorScheme);
};

Fanton.transitionInProgress = function() {
  // return false;
  if($('html').hasClass('js-transitioning')) {
    return $('html').hasClass('js-transitioning');
  } else {
    $('html').removeClass('js-transitioning');
    return false;
  }
};

Fanton.isViewingSingleProject = function() {
  return $('body').hasClass('single-project-loaded');
};

Fanton.isViewingInformation = function() {
  return $('body').hasClass('information-open');
};

Fanton.isViewingSingleProjectInformation = function() {
  return $('body').hasClass('showing-post-information');
};

Fanton.closeProject = function() {
  if(Fanton.isMobile()) {
    // TODO: check if grid mode
    window.location = Fanton.homeUrl;
    return;
  }

  if(Fanton.transitionInProgress()) return;
  $('html').addClass('js-transitioning');

  Fanton.stateInitiated = true;
  console.log('Close project');

  History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

  $('body').addClass('js-closing js-single-project-closing');

  // $('html, body').scrollTop(0);

  if( Fanton.isViewingSingleProjectInformation() && !$('body').hasClass('grid-mode') ) {
    console.warn('Fanton.isViewingSingleProjectInformation() TRANSITION FADE');
    $('#ajax-wrapper')
      .css({
        display: 'block',
        width: '100%',
        height: '100%',
      }).transition({opacity: 0}, Fanton.ttLong, Fanton.easing, function() {
        afterProjectTransitionClose();
        $('.home__post-image').css({transition: ''});
        $('body').removeClass('showing-post-information');
    });

    $('.home__post-image').css({transition: '0s'});

    $('body').removeClass('single-project-loaded background--dark background--light background--complex');
    $('.home__post-title-wrapper, .home__post-title-wrapper--grid').removeClass('js-active active');
  } else {
    if ($('body').hasClass('grid-mode')) {
      console.warn('TRANSITION FADE GRID MODE');
      $('#ajax-wrapper')
        .addClass('grid-mode-js-active')
        .css({
          display: 'block',
          width: '100%',
          height: '100%',
        });
      $('#ajax-wrapper').transition({opacity: 0}, Fanton.ttLong, Fanton.easing, function() {
        afterProjectTransitionClose();
      });

      $('.home__post-image--grid').css({opacity: 0});
    } else {
      console.warn('TRANSITION SLIDE');
      $('#ajax-wrapper').transition({x: $(window).width()}, Fanton.ttLong, Fanton.easing, function() {
        $('#ajax-wrapper #ajax-wrapper__post').empty();
        $('#ajax-wrapper #ajax-wrapper__featured-image').empty();
        $('#ajax-wrapper').css('transform', '');
        afterProjectTransitionClose();
      });

      // $('.home__post-title-wrapper.js-active .home__post-image').transition({x: '0%'}, Fanton.ttLong, Fanton.easing, function() {
      //   $('.home__post-title-wrapper .home__post-image').css('transform', '');
      // });
    }

    $('body').removeClass('showing-post-information background--dark background--light background--complex');
    $('.home__post-title-wrapper, .home__post-title-wrapper--grid').removeClass('js-active active');
  }

  Fanton.removeColorScheme();

  function afterProjectTransitionClose() {
    $('body').removeClass('js-closing closing js-single-project-closing single-project-closing single-project-loaded background--dark background--light background--complex');
    $('html').removeClass('js-transitioning transitioning');

    $('#ajax-wrapper #ajax-wrapper__post').empty();
    $('#ajax-wrapper #ajax-wrapper__featured-image').empty();

    $('#ajax-wrapper')
      .css({
        opacity: '',
        width: '',
        height: '',
        display: '',
      });
  }
};

Fanton.closeInformation = function() {
  if(Fanton.isMobile()) {
    window.location = Fanton.homeUrl;
    return;
  }

  if(Fanton.transitionInProgress()) return;
  $('html').addClass('js-transitioning');
  Fanton.stateInitiated = true;

  console.log('Close information');

  History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

  var $wrapper = $('.information-link-wrapper');
  $wrapper.removeClass('js-active active');
  $('body').removeClass('information-open');
  $wrapper.transition({y: '0'}, Fanton.ttLong, Fanton.easing, function() {
    $('html').removeClass('js-transitioning transitioning');
  });
};

Fanton.backgroundCheckInit = function() {
  if(Fanton.isMobile()) return;
  BackgroundCheck.refresh();

  console.log('backgroundCheck tried to init', $('.post__images img, .home__post-image__inner'));
  if($('.post__images img, .home__post-image__inner').length) {
    console.log('backgroundCheck INIT TRUE');
    BackgroundCheck.init({
      targets: '.background-checker, .background-checker-bottom',
      changeParent: true,
      images: '.post__images img, .home__post-image__inner'
    });
  }
};

Fanton.setIframeHeight = function($parent, forceFullHeight) {
  $parent.each(function() {
    var parent  = $(this);
    var iframes = $(this).find('iframe');

    iframes.each(function() {
      if(!$(this).data('originalWidth')) {
        $(this).data({
          originalWidth: $(this).width(),
          originalHeight: $(this).height(),
        });
      }

      $(this).css({width: '', height: ''}).attr({width: '', height: ''});

      var width        = $(this).data('originalWidth');
      var height       = $(this).data('originalHeight');
      var ratio        = width / height;
      var parentWidth  = parent.width();
      var parentHeight = parent.height();
      var newWidth     = parentWidth;
      var newHeight    = parentWidth / ratio;

      if(forceFullHeight && parentHeight > newHeight) {
        newWidth = parentHeight * ratio;
        newHeight = parentHeight;
      }

      $(this).css({width: newWidth, height: newHeight});
    });
  });
};
