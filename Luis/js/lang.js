$(function() {

  // Initially disable language switching button.
  $('#switch-lang').css({
    'pointer-events': 'none',
    'cursor': 'default'
  }).attr('disabled', 'disabled');

  function langButtonListen() {
    $('#switch-lang').click(function(event) {
      event.preventDefault();
      $('[lang="pt"]').toggle();
      $('[lang="en"]').toggle();
      // Switch cookie stored language.
      if ($.cookie('lang') === 'en') {
        $.cookie('lang', 'pt', {
          expires: 7
        });
      } else {
        $.cookie('lang', 'en', {
          expires: 7
        });
      }
    });
    // Enable lang switching button.
    $('#switch-lang').css({
      'pointer-events': 'auto',
      'cursor': 'pointer'
    }).removeAttr('disabled');
  }

  if ($.cookie('lang')) {
    var lang = $.cookie('lang');
    if (lang === 'en') {
      $('[lang="pt"]').hide();
      langButtonListen();
    } else {
      $('[lang="en"]').hide();
      langButtonListen();
    }
  } else {
    // geolocation IS NOT available
    $('[lang="pt"]').hide();
    $.cookie('lang', 'en', {
      expires: 7
    });
    langButtonListen();
  }

});
