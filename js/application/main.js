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

jQuery.easing.def = 'easeInOutQuart';

// Bind to StateChange Event
History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
  Fanton.state = History.getState(); // Note: We are using History.getState() instead of event.state
  console.log('statechange - state: ', Fanton.state);

  if(Fanton.state.url == Fanton.homeUrl || Fanton.state.data.state == 'home') {
    var closeButtons = [
      '.close-button',
      '.information__close-button'
      ];
    $(closeButtons.join(',')).trigger('click');
  } else {
    if(Fanton.stateInitiated) return;

    if(Fanton.state.data.stateUrl && $('.home-page-nav a[href="'+Fanton.state.data.stateUrl+'"]').length) {
      $('.home-page-nav a[href="'+Fanton.state.data.stateUrl+'"]').trigger('click');
    } else if (Fanton.state.title == 'Information') {
      $('.information-link').trigger('click');
    }
  }

  Fanton.stateInitiated = false;
});

//
// DOCUMENT READY
//

$(function() {
  Fanton.backgroundCheckInit();
});

//
// OPEN PROJECT
//

$(document).on('click', '.home__post-title-link', function(e) {
  e.preventDefault();

  if(Fanton.transitionInProgress()) return;
  Fanton.stateInitiated = true;
  if( $(this).hasClass('active') || ($('body').hasClass('single-project-loaded') && $(this).hasClass('home__post-title-link--grid-mode')) ) return;
  console.log('Open project');

  var $link = $(this);
  var $wrapper = $link.closest('.home__post-title-wrapper');
  if(!$wrapper.length) $wrapper = $link.closest('.home__post-title-wrapper--grid');
  var url = $link.attr('href');
  var title = $link.attr('data-title');

  $wrapper.addClass('active');
  $('html').addClass('transitioning');

  if($link.hasClass('home__post-title-link--grid-mode')) {
    $('#ajax-wrapper').addClass('grid-mode-active');
    $wrapper.find('.home__post-image--grid').transition({opacity: 1}, Fanton.ttLong, Fanton.easing, function() {
      afterOpeningTransitionCallbacks();
    });
  } else {
    $wrapper.find('.home__post-image').transition({}, Fanton.ttLong, Fanton.easing, function() {
      afterOpeningTransitionCallbacks();
    });
    // $wrapper.find('.home__post-image').transition({x: -(100- Fanton.gutterSize) + '%'}, Fanton.ttLong, Fanton.easing, function() {
    //   afterOpeningTransitionCallbacks();
    // });
  }

  History.pushState({stateUrl: url}, title, url);

  $('#ajax-wrapper').load(url + ' .content', function(response, status, xhr) {
    $('body').addClass('single-project-loaded');
  });

  var colorScheme = $link.attr('data-color-scheme');
  Fanton.setColorScheme(colorScheme);

  function afterOpeningTransitionCallbacks() {
    $('html').removeClass('transitioning');
    Fanton.backgroundCheckInit();
  }
});

//
// CLOSE PROJECT
//

$(document).on('click', '.close-button', function() {
  console.log(Fanton);
  Fanton.closeProject();
});


$(document).on('click', '.site-title', function(e) {
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
  if(Fanton.transitionInProgress()) return;
  Fanton.stateInitiated = true;
  console.log('Open information');

  var $wrapper = $(this).closest('.information-link-wrapper');
  var url = $(this).attr('href');
  var title = 'Information';

  $wrapper.addClass('active');
  $('html').addClass('transitioning');

  History.pushState({stateUrl: url}, title, url);

  $('body').addClass('information-open');
  $wrapper.transition({y: '-100vh'}, Fanton.ttLong, Fanton.easing, function() {
    $('html').removeClass('transitioning');
  });

  e.preventDefault();
});

//
// CLOSE FOOTER INFORMATION
//

$(document).on('click', '.information__close-button', function() {
  Fanton.closeInformation();
});

//
// OPEN SINGLE POST INFORMATION
//

$(document).on('click', '.read-button', function() {
  if(Fanton.transitionInProgress()) return;
  Fanton.stateInitiated = true;
  console.log('Open post information');

  $('html').addClass('transitioning');
  $('body').addClass('showing-post-information');
  $('.post__information').scrollTop(0);
  $('.post__information-wrapper').css({opacity: 0}).transition({opacity: 1}, Fanton.ttLong, function() {
    $('html').removeClass('transitioning');
  });
});

//
// CLOSE SINGLE POST INFORMATION
//

$(document).on('click', '.images-button', function() {
  if(Fanton.transitionInProgress()) return;
  Fanton.stateInitiated = true;
  console.log('Close post information');

  $('html').addClass('transitioning post-information-transition-out');
  $('.post__information-wrapper').transition({opacity: 0}, Fanton.ttLong, function() {
    $('body').removeClass('showing-post-information');
    $('html').removeClass('transitioning post-information-transition-out');
  });
});

//
// ON SINGLE PROJECT: CLICK ARROW TO GO DOWN TO PROJECT
//

$(document).on('click', '.down-button', function() {
  $('html, body').animate({scrollTop: $(window).height()}, 600);
});

//
// ON SINGLE PROJECT: ARROW KEYS NAVIGATE BETWEEN IMAGES
//

$(document).keydown(function(e) {
  if (!Fanton.isViewingSingleProject()) return;

  var images = [];
  $('.post__images img').each(function(){
    images.push(this.offsetTop);
  });

  var dir = false,
  targetUp = -1;

  switch (e.keyCode) {
    case 38:
    dir = -1;
    break;

    case 40:
    dir = 1;
    break;

    default:
    return;
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

$(window).on('scroll', function() {
  Fanton.scrollTop = $(window).scrollTop();
  if(Fanton.scrollTop > 0) {
    $('html').addClass('js-has-scrolled');
  } else {
    $('html').removeClass('js-has-scrolled');
  }
});

//
// HOVER EVENTS ON GRID ITEMS
//

$(document).on('mouseenter', '.grid-item a', function() {
  var $gridItem = $(this).closest('.grid-item');
  $gridItem.addClass('grid-item--hover');
});

$(document).on('mouseleave', '.grid-item a', function() {
  var $gridItem = $(this).closest('.grid-item');
  $gridItem.removeClass('grid-item--hover');
});

// Global functions

Fanton.setSinglePost = function() {
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
  return false;
  // return $('html').hasClass('transitioning');
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
  if(Fanton.transitionInProgress()) return;
  Fanton.stateInitiated = true;
  console.log('Close project');

  History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

  $('body').addClass('closing single-project-closing');
  $('html').addClass('transitioning');

  $('html, body').scrollTop(0);

  if( Fanton.isViewingSingleProjectInformation() && !$('body').hasClass('grid-mode') ) {
    console.warn('Fanton.isViewingSingleProjectInformation() TRANSITION FADE');
    $('#ajax-wrapper').transition({opacity: 0}, Fanton.ttLong, Fanton.easing, function() {
      $('#ajax-wrapper').empty().css('opacity', 1);
      afterProjectTransitionClose();
      $('.home__post-image').css({transition: ''});
      $('body').removeClass('showing-post-information');
    });

    $('.home__post-image').css({transition: '0s'});

    $('body').removeClass('single-project-loaded background--dark background--light background--complex');
    $('.home__post-title-wrapper, .home__post-title-wrapper--grid').removeClass('active');
  } else {
    if ($('body').hasClass('grid-mode')) {
      console.warn('TRANSITION FADE');
      $('#ajax-wrapper').transition({opacity: 0}, Fanton.ttLong, Fanton.easing, function() {
        $('#ajax-wrapper').empty().css('opacity', 1);
        afterProjectTransitionClose();
      });

      $('.home__post-image--grid').css({opacity: 0});
    } else {
      console.warn('TRANSITION SLIDE');
      $('#ajax-wrapper').transition({x: $(window).width()}, Fanton.ttLong, Fanton.easing, function() {
        $('#ajax-wrapper').empty().css('transform', '');
        afterProjectTransitionClose();
      });

      $('.home__post-title-wrapper.active .home__post-image').transition({x: '0%'}, Fanton.ttLong, Fanton.easing, function() {
        $('.home__post-title-wrapper .home__post-image').css('transform', '');
      });
    }

    $('body').removeClass('single-project-loaded showing-post-information background--dark background--light background--complex');
    $('.home__post-title-wrapper, .home__post-title-wrapper--grid').removeClass('active');
  }

  Fanton.removeColorScheme();

  function afterProjectTransitionClose() {
    $('body').removeClass('closing single-project-closing background--dark background--light background--complex');
    $('html').removeClass('transitioning');
  }
};

Fanton.closeInformation = function() {
  if(Fanton.transitionInProgress()) return;
  Fanton.stateInitiated = true;
  console.log('Close information');

  History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

  var $wrapper = $('.information-link-wrapper');
  $wrapper.removeClass('active');
  $('html').addClass('transitioning');
  $('body').removeClass('information-open');
  $wrapper.transition({y: '0'}, Fanton.ttLong, Fanton.easing, function() {
    $('html').removeClass('transitioning');
  });
};

Fanton.backgroundCheckInit = function() {
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
