
function mobilecheck() {
  var check = false;
  (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

var youtubeWidth = $(window).width() < 640 ? $(window).width() : 640;
var youtubeHeight = youtubeWidth * 3/4;

var player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    width: youtubeWidth,
    height: youtubeHeight,
    videoId: $('#player').attr('vid'),
    playerVars: { 'showinfo': 0 },
    events: {
      'onError': onPlayerError,
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerError(event) {
  console.log(event.data);
}

// autoplay video
function onPlayerReady(event) {
  if( !mobilecheck() ) {
    event.target.playVideo();
  }
}

// when video ends
function onPlayerStateChange(event) {        
  if(event.data === 0) {            
    window.location = '/main';
  };
}

function resizeYoutubeVideoClip() {
  var wrapperTop = 0;
  if( $(window).width() <= 320)       wrapperTop = 29;
  else if( $(window).width() <= 400 ) wrapperTop = 36;
  else if( $(window).width() <= 500 ) wrapperTop = 49;
  else if( $(window).width() <= 600 ) wrapperTop = 62;
  else                                wrapperTop = 62;

  var wrapperBottom = 0;
  if( $(window).width() <= 320)       wrapperBottom = 34;
  else if( $(window).width() <= 400 ) wrapperBottom = 41;
  else if( $(window).width() <= 500 ) wrapperBottom = 54;
  else if( $(window).width() <= 600 ) wrapperBottom = 67;
  else                                wrapperBottom = 67;

  $('.white-wrapper-top').css('height', wrapperTop);
  $('.white-wrapper-bottom').css('height', wrapperBottom);
}


$(document).ready(function() {
  
  resizeYoutubeVideoClip();

  $('.skip_press').hide();
  $('.skip_red').click(function(){
    $('.skip_press').show();
    $('.skip_red').hide();
  })


  $('.skip_red').click(function(){
    window.location = '/main';
  })

  $('.works').click(function(){
    window.location = '/main';
  })

  $('.about').click(function(){
    window.location = '/about';
  })
  
  var vidURLs = [];
  var vidTitles = [];
  
  var $videoInfo = $('li.video-info') || [];
  for(var i=0; i<$videoInfo.length; i++) {
    var videoId = $($videoInfo[i]).attr('vid');
    var youtubeUrl = 'http://www.youtube.com/embed/' + videoId + '?showinfo=0';
    vidURLs.push(youtubeUrl);
    
    var videoTitle = $($videoInfo[i]).attr('title')
    vidTitles.push(videoTitle);
  }
  
  
  $('.youtubeplayer_total').text(vidURLs.length);
  
  
  
  
  
  function positioning() {
    // ifrmae position & size
    var $frame = $('.frame');
    
    var WINDOW_WIDTH = $(window).width();
    var WINDOW_HEIGHT = $(window).height();

    $frame.width(WINDOW_WIDTH-100);
    $('iframe').height(WINDOW_HEIGHT/2);

    var top = (WINDOW_HEIGHT - $frame.height()) / 2;
    var left = (WINDOW_WIDTH - $frame.width()) / 2;
    
    $frame.css('top', Math.max(0, top));
    $frame.css('left', Math.max(0, left));
  }
  positioning();

  $(window).on('resize', positioning);
  
  
  $('.bu_blind').click(function(){
    $('.blurred').show();
    $('.popup').show();
    
    var nth = this.getAttribute('data-nth');
    $('.popup').attr('data-nth',nth);
    $('.youtube_player').attr('src', vidURLs[nth-1]);
    $('.youtubeplayer_nth').text(nth);
    
    // 타이틀 변경
    var title = $(this).parent().attr('title');
    $('h2.title').html(title);
    positioning();
  });
  
  
  $('.close2').click(function(){
    $('.blurred').hide();
    $('.popup').hide();
    $('iframe.youtube_player').attr('src', '');
  });
  
  
  $('.before2').click(function(){
    var nth = $('.popup').attr('data-nth');
    nth = Number(nth);
    if(nth < 2){
        nth = vidURLs.length;
    }
    else {
      nth = nth - 1;
    }
    $('.popup').attr('data-nth', nth);
    $('.youtubeplayer_nth').text(nth);
    $('.youtube_player').attr('src', vidURLs[nth-1]);
    
    // 타이틀 변경
    $('h2.title').html( vidTitles[nth-1] );
    positioning();
  });


  
  
  $('.after2').click(function(){
    var nth = $('.popup').attr('data-nth');
    nth = Number(nth);
    if(nth >= vidURLs.length){
        nth = 1;
    }
    else {
      nth = nth + 1;
    }
  
    $('.popup').attr('data-nth', nth);
    $('.youtubeplayer_nth').text(nth);
    $('.youtube_player').attr('src', vidURLs[nth-1]);
    
    // 타이틀 변경
    $('h2.title').html( vidTitles[nth-1] );
    positioning();
  });

  if(!mobilecheck()) {
    $('.before').on('mouseover', function() {
      $('.before').css('opacity', 0);
    });
    $('.before').on('mouseleave', function() {
      $('.before').css('opacity', 1);
    });
    
    $('.before2').on('mouseover', function() {
      $('.before2').css('opacity', 1);
    });
    $('.before2').on('mouseleave', function() {
      $('.before2').css('opacity', 0);
    });


    $('.after').on('mouseover', function() {
      $('.after').css('opacity', 0);
    });
    $('.after').on('mouseleave', function() {
      $('.after').css('opacity', 1);
    });

    $('.after2').on('mouseover', function() {
      $('.after2').css('opacity', 1);
    });
    $('.after2').on('mouseleave', function() {
      $('.after2').css('opacity', 0);
    });

  }
});