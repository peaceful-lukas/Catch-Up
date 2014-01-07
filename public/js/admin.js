
$(document).ready(function() {
  // sortable list
  $('.sortable').sortable({ connectWith: '.connected' });
  
  // thumbnailer
  $('#url').on('focusout', function(e) {
    var parser = document.createElement('a');
    parser.href = $('#url').val();
    
    var videoId = parser.search.substring(3);
    $('#vid').val(videoId);
    
    var thumbUrl = 'http://img.youtube.com/vi/' + videoId + '/0.jpg'
    $('#thumbnail').val(thumbUrl);
    $('img.vid-thumb').attr('src', thumbUrl);
  });
  
  // add video
  $('a.add-video').click(function() {
    var ajaxData = {
      vid: $('#vid').val(),
      url: $('#url').val(),
      title: $('#title').val(),
      thumbnail: $('#thumbnail').val()
    };
    
    $.ajax({
      url: '/admin/ajax',
      type: 'POST',
      data: ajaxData,
      success: function(result) {
        if(result) {
          window.location = '/admin';
        }
        else {
          alert(result.message);
        }
      },
      error: function(result) {
        if(result.status === 400) {
          alert('올바른 파라미터가 아닙니다.');
        }
        else {
          alert('서버오류. 관리자에게 문의해주세요.');
        }
      }
    });
  });
  
  
  // save list
  $('a.save-list').click(function() {
    alert('저장');
  });
  
});