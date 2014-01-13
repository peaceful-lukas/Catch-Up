$(document).ready(function(){
  var vidURLs = [ "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                            "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                            "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                            "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                             "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                             "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                             "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                             "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                             "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                             "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                             "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                             "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                             "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                             "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                             "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                             "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                             "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                             "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                             "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                             "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                             "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                             "http://www.youtube.com/embed/jRtN0kWGA7k?showinfo=0",
                             "http://www.youtube.com/embed/dyharafaEeA?showinfo=0",
                             "http://www.youtube.com/embed/2REkZG-dhHc?showinfo",
                             ];
  $('.youtubeplayer_total').text(vidURLs.length);
  $('.bu_blind').click(function(){
    $('.blurred').show();
    $('.popup').show();
    var nth = this.getAttribute('data-nth');
    $('.popup').attr('data-nth',nth);
    $('.youtube_player').attr('src', vidURLs[nth-1]);
    $('.youtubeplayer_nth').text(nth);
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
    });
  });