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
  } else if(Fanton.state.data.stateUrl && $('.home-page-nav a[href="'+Fanton.state.data.stateUrl+'"]').length) {
    $('.home-page-nav a[href="'+Fanton.state.data.stateUrl+'"]').trigger('click');
  } else if (Fanton.state.title == 'Information') {
    $('.information-link').trigger('click');
  }
});

//
// OPEN PROJECT
//

$(document).on('click', '.home__post-title-link', function(e) {
  e.preventDefault();

  if(Fanton.transitionInProgress()) return;
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
      $('html').removeClass('transitioning');
    });
  } else {
    $wrapper.find('.home__post-image').transition({x: '-100%'}, Fanton.ttLong, Fanton.easing, function() {
      $('html').removeClass('transitioning');
    });
  }

  History.pushState({stateUrl: url}, title, url);

  $('#ajax-wrapper').load(url + ' .content', function(response, status, xhr) {
    $('body').addClass('single-project-loaded');
  });

  var colorScheme = $link.attr('data-color-scheme');
  Fanton.setColorScheme(colorScheme);
});

//
// CLOSE PROJECT
//

$(document).on('click', '.close-button', function() {
  if(Fanton.transitionInProgress()) return;
  console.log('Close project');

  History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

  $('body').addClass('closing single-project-closing').removeClass('single-project-loaded showing-post-information');
  $('html').addClass('transitioning');

  if($('body').hasClass('grid-mode')) {
    $('#ajax-wrapper').transition({opacity: 0}, Fanton.ttLong, Fanton.easing, function() {
      $('#ajax-wrapper').empty().css('opacity', 1);
      $('body').removeClass('closing single-project-closing');
      $('html').removeClass('transitioning');
    });

    $('.home__post-image--grid').css({opacity: 0});
  } else {
    $('#ajax-wrapper').transition({x: $(window).width()}, Fanton.ttLong, Fanton.easing, function() {
      $('#ajax-wrapper').empty().css('transform', '');
      $('body').removeClass('closing single-project-closing');
      $('html').removeClass('transitioning');
    });

    $('.home__post-title-wrapper.active .home__post-image').transition({x: '0%'}, Fanton.ttLong, Fanton.easing, function() {
      $('.home__post-title-wrapper .home__post-image').css('transform', '');
    });
  }

  $('.home__post-title-wrapper, .home__post-title-wrapper--grid').removeClass('active');

  Fanton.removeColorScheme();
});

//
// OPEN FOOTER INFORMATION
//

$(document).on('click', '.information-link', function(e) {
  if(Fanton.transitionInProgress()) return;
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
  if(Fanton.transitionInProgress()) return;
  console.log('Close information');

  History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

  var $wrapper = $(this).closest('.information-link-wrapper');
  $wrapper.removeClass('active');
  $('html').addClass('transitioning');
  $('body').removeClass('information-open');
  $wrapper.transition({y: '0'}, Fanton.ttLong, Fanton.easing, function() {
    $('html').removeClass('transitioning');
  });
});

//
// OPEN SINGLE POST INFORMATION
//

$(document).on('click', '.read-button', function() {
  if(Fanton.transitionInProgress()) return;
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
  console.log('Close post information');

  $('html').addClass('transitioning post-information-transition-out');
  $('.post__information-wrapper').transition({opacity: 0}, Fanton.ttLong, function() {
    $('body').removeClass('showing-post-information');
    $('html').removeClass('transitioning post-information-transition-out');
  });
});

// Global variables

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
