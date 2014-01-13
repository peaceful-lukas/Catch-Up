$(document).ready(function(){
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