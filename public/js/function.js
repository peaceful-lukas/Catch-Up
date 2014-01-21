


// var params = { allowScriptAccess: 'always', autoplay: 1 };
// var atts = { id: 'myytplayer', class: 'intro' };
// var vid = 'yjQG-vq8Q7I';

// swfobject.embedSWF('http://www.youtube.com/v/' + vid + '?enablejsapi=1&playerapiid=ytplayer&version=3', 'player', '425', '356', '8', null, null, params, atts);


// function onYouTubePlayerReady(playerId) {
//   ytplayer = document.getElementById("myytplayer");
//   ytplayer.playVideo();
// }

// function onPlayerStateChange(event) {
//   console.log(event);
  
//   if(newState === 0) {
//     window.location = '/';
//   }
// }


 var tag = document.createElement('script');
 tag.src = "//www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
 

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: $('#player').attr('vid'),
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// autoplay video
function onPlayerReady(event) {
  event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {        
  if(event.data === 0) {            
    window.location = '/';
  };
}


$(document).ready(function() {
  
//   $(".before").on({
//     touchstart : function(){
//       $(this).find("img").addClass("before2")
//     },
//     touchend : function(){
//       $(this).find("img").removeClass().addClass("before");
//     }
// });

  $('.skip_red').click(function(){
    window.location = '/';
  })

  $('.works').click(function(){
    window.location = '/';
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
  
  $('.bu_blind').click(function(){
    $('.blurred').show();
    $('.popup').show();
   
    // $(window).resize(function(){
    //   var width = $(window).width();
    //   $('.frame').width(width-100);
    //   $('.frame').width(height-100);
    // });

    $(function() {
      $(window).on('resize', function resize()  {
        $(window).off('resize', resize);
        setTimeout(function () {
          // ifrmae position & size
          var frame = $('.frame');
          var top = (window.innerHeight - frame.height()) / 2;
          var width = $(window).width();
          var height = $(window).height();
          $('.frame').width(width-100);
          $('iframe').height(height/2);
          frame.css('top', Math.max(0, top) + 'px');
          $(window).on('resize', resize);
        }, 50);
      }).resize();
    });
    // var windowWidth = $(window).width();
    // var windowHeight = $(window).height();
    // $('.frame').css({top:windowHeight/2,left:windowWidth/2,margin:'-'+($('.frame').height() / 2)+'px 0 0 -'+($('.frame').width() / 2)+'px'});
    var nth = this.getAttribute('data-nth');
    $('.popup').attr('data-nth',nth);
    $('.youtube_player').attr('src', vidURLs[nth-1]);
    $('.youtubeplayer_nth').text(nth);
    
    // 타이틀 변경
    var title = $(this).parent().attr('title');
    $('h2.title').html(title);
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
  });
  
});