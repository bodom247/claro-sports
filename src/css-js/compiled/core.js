var root;

root = typeof exports !== "undefined" && exports !== null ? exports : typeof window !== "undefined" && window !== null ? window : this;

root.init = function() {
  var comparar, core, cronometro, desktop, firstScriptTag, inicio, mobile, setSize, tag, url, windowAlto;
  tag = document.createElement('script');
  tag.src = '//www.youtube.com/iframe_api';
  firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  url = 'http://' + document.location.hostname + '/';
  core = null;
  windowAlto = $(window).outerHeight();
  comparar = null;
  if ($(window).width() <= 767) {
    core = true;
  } else {
    core = false;
  }
  setSize = function() {
    var anchura;
    windowAlto = $(window).outerHeight();
    anchura = $(window).width();
    if (anchura <= 767) {
      if (core === true) {
        core = false;
        mobile();
      }
    } else if (anchura >= 768) {
      if (core === false) {
        core = true;
        desktop();
      }
    }
  };
  desktop = function() {};
  mobile = function() {};
  this.videoYoutube = function() {
    $('.codigoYoutube').each(function(i) {
      var videoId;
      videoId = $(this).attr('data-youtube');
      window['player' + [i]] = new YT.Player($('.codigoYoutube')[i], {
        videoId: videoId,
        height: '100%',
        width: '100%'
      });
    });
  };
  cronometro = function() {
    var contadorMinutos, day, diaFinal, dias, diff, horas, minutos, now, oneDay, segundos, start;
    now = new Date;
    start = new Date(now.getFullYear(), 0, 0);
    diff = now - start;
    oneDay = 1000 * 60 * 60 * 24;
    day = Math.floor(diff / oneDay);
    diaFinal = 242 - day;
    dias = diaFinal;
    horas = 24 - now.getHours();
    minutos = 59 - now.getMinutes();
    segundos = 59 - now.getSeconds();
    $('#dias').html(diaFinal);
    $('#horas').html(horas);
    $('#minutos').html(minutos);
    $('#segundos').html(segundos);
    contadorMinutos = setInterval((function() {
      if (segundos === 0) {
        segundos = 59;
        $('#segundos').html(59);
        if (minutos === 1) {
          minutos = 59;
          $('#minutos').html(59);
          if (horas === 0) {
            horas = 24;
            $('#horas').html(23);
            $('#dias').html(--diaFinal);
          } else {
            $('#horas').html(--horas);
          }
        } else {
          $('#minutos').html(--minutos);
        }
      } else {
        $('#segundos').html(--segundos);
      }
    }), 1000);
  };
  $('.video').on('click', function() {
    var imagen, video;
    imagen = $(this).find('.img');
    video = $(this).find('video');
    imagen.velocity('fadeOut', 0);
    video.velocity('fadeIn', 350);
    jQuery(video).trigger('play');
  });
  $('.circulo').on('click', function() {
    var codigo;
    codigo = $(this).attr('data-codigo');
    if (comparar !== codigo) {
      $('.promo .multimedia').empty();
      $('.promo .multimedia').append('<div class="codigoYoutube" data-youtube=' + codigo + '></div>');
      videoYoutube();
      console.log(codigo);
      comparar = codigo;
    }
    if (!$(this).children('.img').hasClass('activo')) {
      $('.circulo .img').removeClass('activo');
    }
    $(this).children('.img').toggleClass('activo');
  });
  inicio = function() {
    setSize();
    cronometro();
  };
  $(window).resize(function() {
    setSize();
  });
  $(window).on('scroll', function() {});
  inicio();
  $(window).on('load', function() {
    videoYoutube();
    $('.nd-Slider video').prop('muted', true);
  });
};

init();
