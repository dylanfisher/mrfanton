$ = jQuery;

var Fanton = {};
Fanton.state = History.getState();

// Bind to StateChange Event
History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
  Fanton.state = History.getState(); // Note: We are using History.getState() instead of event.state

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

(function($){

  Fanton.homeUrl = $('html').attr('data-root-url');

  var tt = 400;
  var ttLong = 800;
  var easing = 'cubic-bezier(0.23, 1, 0.32, 1)';

  //
  // OPEN PROJECT
  //

  $(document).on('click', '.home__post-title-link', function(e) {
    e.preventDefault();

    var $link = $(this);
    var $wrapper = $link.closest('.home__post-title-wrapper');
    var url = $link.attr('href');
    var title = $link.attr('data-title');

    $wrapper.addClass('active');
    $('html').addClass('transitioning');

    $wrapper.find('.home__post-image').transition({x: '-100%'}, ttLong, easing, function() {
      $('html').removeClass('transitioning');
    });

    History.pushState({stateUrl: url}, title, url);

    $('#ajax-wrapper').load(url + ' .content', function(response, status, xhr) {
      $('body').addClass('single-project-loaded');
      Fanton.setColorScheme();
    });
  });

  //
  // CLOSE PROJECT
  //

  $(document).on('click', '.close-button', function() {
    History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

    $('body').addClass('closing').removeClass('single-project-loaded showing-post-information');
    $('html').addClass('transitioning');

    $('#ajax-wrapper').transition({x: $(window).width()}, ttLong, easing, function() {
      $('#ajax-wrapper').empty().css('transform', '');
      $('body').removeClass('closing');
      $('html').removeClass('transitioning');
    });

    $('.home__post-title-wrapper.active .home__post-image').transition({x: '0%'}, ttLong, easing, function() {
      $('html').removeClass('transitioning');
      $('.home__post-title-wrapper .home__post-image').css('transform', '');
    });

    $('.home__post-title-wrapper').removeClass('active');

    Fanton.removeColorScheme();
  });

  //
  // OPEN INFORMATION
  //

  $(document).on('click', '.information-link', function(e) {
    var $wrapper = $(this).closest('.information-link-wrapper');
    var url = $(this).attr('href');
    var title = 'Information';

    $wrapper.addClass('active');
    $('html').addClass('transitioning');

    History.pushState({stateUrl: url}, title, url);

    $('body').addClass('information-open');
    $wrapper.transition({y: '-100vh'}, ttLong, easing, function() {
      $('html').removeClass('transitioning');
    });

    e.preventDefault();
  });

  //
  // CLOSE INFORMATION
  //

  $(document).on('click', '.information__close-button', function() {
    History.pushState({state: 'home'}, 'Home', Fanton.homeUrl);

    var $wrapper = $(this).closest('.information-link-wrapper');
    $wrapper.removeClass('active');
    $('html').addClass('transitioning');
    $('body').removeClass('information-open');
    $wrapper.transition({y: '0'}, ttLong, easing, function() {
      $('html').removeClass('transitioning');
    });
  });

  //
  // OPEN POST INFORMATION
  //

  $(document).on('click', '.read-button', function() {
    $('body').addClass('showing-post-information');
    $('.post__information').scrollTop(0);
    $('.post__information-wrapper').css({opacity: 0}).transition({opacity: 1}, ttLong);
  });

  //
  // CLOSE POST INFORMATION
  //

  $(document).on('click', '.images-button', function() {
    $('.post__information-wrapper').transition({opacity: 0}, ttLong, function() {
      $('body').removeClass('showing-post-information');
    });
  });

})(jQuery);

Fanton.setSinglePost = function() {
  console.log('Fanton.setSinglePost');
  Fanton.state.data.stateUrl = window.location.href;
};

Fanton.removeColorScheme = function() {
  $('body').removeClass(function(index, css) {
    return (css.match (/(^|\s)color-scheme--\S+/g) || []).join(' ');
  });
};

Fanton.setColorScheme = function() {
  Fanton.removeColorScheme();

  var colorScheme = $('[data-color-scheme]').attr('data-color-scheme');
  $('body').addClass('color-scheme--' + colorScheme);
};
