
$(document).ready(function() {
  
  // 헤더
  $('img.homepage-over').click(function() {
    window.location = '/intro';
  })
  
  $('img.logout-over').click(function() {
    if( confirm('정말 로그아웃 하시겠습니까?') ) {
      $.ajax({
        type: 'GET',
        url: '/admin/logout',
        success: function(result) {
          window.location = '/admin';
        },
        error: function(result) {
          alert('서버 에러입니다. 관리자에게 연락바랍니다.');
        }
      })
    }
  });
  
  // GLOBAL VARIABLES
  var YOUTUBE_THUMBNAIL_URL_PREFIX = null;
  var YOUTUBE_THUMBNAIL_URL_LIST = [];
  
  var EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX = null;
  var EDIT_YOUTUBE_THUMBNAIL_URL_LIST = [];
  
  
  // 관리자 로그인
  $('a.login-enter').click(function() {
    $('#login-form').submit();
  });
  
  
  // 관리자 화면 UI 컨트롤.
  $('.upload input.title').css('width', 900 - 64);
  $('.upload input.url').css('width', 900 - 64 - 160);
  $('.list > ul.thumbnail-list > li')
  .mouseenter(function() {
    $(this).children('.editable').css('visibility', 'visible');
  })
  .mouseleave(function() {
    $(this).children('.editable').css('visibility', 'hidden');
  });
  
  
  $('#edit input.title').css('width', 860 - 64);
  $('#edit input.url').css('width', 860 - 64 - 160);
  
  
  
  // 관리자 페이지 - UPLOAD
  $('.upload a.url-load').click(function() {
    
    // 정규표현식 검사.
    var urlRegEx = /^(http\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if( !urlRegEx.test($('#url').val()) ) {
      alert('Youtube 동영상 주소를 올바르게 입력해주세요.\nex) http://www.youtube.com/watch?v=F9z1_5CxuKg');
      return;
    }
    
    var parser = document.createElement('a');
    parser.href = $('#url').val();
    
    var videoId = parser.search.substring(3);
    
    // vid 입력.
    $('#vid').val(videoId);
    
    // 썸네일 주소 prefix 등록.
    YOUTUBE_THUMBNAIL_URL_PREFIX = 'http://img.youtube.com/vi/' + videoId + '/';
    
    // 썸네일 리스트 생성.
    YOUTUBE_THUMBNAIL_URL_LIST = [];
    YOUTUBE_THUMBNAIL_URL_LIST.push(YOUTUBE_THUMBNAIL_URL_PREFIX + '0.jpg');
    YOUTUBE_THUMBNAIL_URL_LIST.push(YOUTUBE_THUMBNAIL_URL_PREFIX + '1.jpg');
    YOUTUBE_THUMBNAIL_URL_LIST.push(YOUTUBE_THUMBNAIL_URL_PREFIX + '2.jpg');
    YOUTUBE_THUMBNAIL_URL_LIST.push(YOUTUBE_THUMBNAIL_URL_PREFIX + '3.jpg');
    
    $('#0').attr('src', YOUTUBE_THUMBNAIL_URL_LIST[0]);
    $('#1').attr('src', YOUTUBE_THUMBNAIL_URL_LIST[1]);
    $('#2').attr('src', YOUTUBE_THUMBNAIL_URL_LIST[2]);
    $('#3').attr('src', YOUTUBE_THUMBNAIL_URL_LIST[3]);
    
    // 썸네일 선택 삭제.
    $('.upload ul.thumbnail-list > li > .thumb-selected').css('visibility', 'hidden');
    $('#thumbnail').val('');
    
    // 썸네일 선택 뷰 표시.
    $('.after-url-load').css('display', 'block');
  });
  
  $('.upload ul.thumbnail-list > li').click(function() {
    var selected = $(this).children('img.upload-thumb').attr('id');
    $('.upload ul.thumbnail-list > li > .thumb-selected').css('visibility', 'hidden');
    $('.upload ul.thumbnail-list > li:eq(' + selected + ') > .thumb-selected').css('visibility', 'visible');
    
    $('#thumbnail').val(YOUTUBE_THUMBNAIL_URL_LIST[selected]);
  });
  
  $('a.upload').click(function() {
    var urlRegEx = /^(http\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    
    var title = $('#title').val();
    var url = $('#url').val();
    var vid = $('#vid').val();
    var thumbnail = $('#thumbnail').val();
    
    if( title === '' ) {
      alert('동영상 제목을 입력해주세요.');
    }
    else if( !urlRegEx.test(url) ) {
      alert('Youtube 동영상 주소를 올바르게 입력해주세요.\nex) http://www.youtube.com/watch?v=F9z1_5CxuKg');
    }
    else if( thumbnail === '' ) {
      alert('동영상 대표 이미지(썸네일)를 선택해주세요.')
    }
    else {
      $('#uploadForm').submit();
    }
  });
  
  
  
  
  // 관리자 페이지 - LIST
  $('.list a.edit').click(function() {
    var $editable = $(this).parent().parent();
    var mid = $editable.attr('mid');
    var title = $editable.attr('title');
    var url = $editable.attr('url');
    var vid = $editable.attr('vid');
    var thumbnail = $editable.attr('thumbnail');
    
    $('#edit-mid').val(mid);
    $('#edit-title').val(title);
    $('#edit-url').val(url);
    $('#edit-vid').val(vid);
    $('#edit-thumbnail').val(thumbnail);
    
    
    EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX = 'http://img.youtube.com/vi/' + vid + '/';
    
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST = [];
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '0.jpg');
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '1.jpg');
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '2.jpg');
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '3.jpg');
    
    // 썸네일 이미지 4개 표시.
    $('#edit-0').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[0]);
    $('#edit-1').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[1]);
    $('#edit-2').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[2]);
    $('#edit-3').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[3]);
    
    // 썸네일 선택 표시 초기화.
    $('#edit ul.thumbnail-list > li > .thumb-selected').css('visibility', 'hidden');
    
    // 지정된 썸네일 선택 표시.
    var index = thumbnail.substring(thumbnail.length-5, thumbnail.length-4);
    $('#edit ul.thumbnail-list > li:eq(' + index + ') > .thumb-selected').css('visibility', 'visible');
    
    $('.blurred').css('display', 'block');
    $('#edit').css('display', 'block');
  });
  
  
  $('.list a.delete').click(function() {
    
    if( confirm('정말 삭제하시겠습니까?') ) {
      var $editable = $(this).parent().parent();
      var vid = $editable.attr('vid');
      
      $.ajax({
        type: 'POST',
        url: '/admin/discard',
        data: { vid: vid },
        success: function(result) {
          window.location = '/admin';
        },
        error: function(result) {
          alert('서버에러입니다. 동영상 삭제에 실패했습니다. 관리자에게 연락바랍니다.');
        }
      });
    }
  });
  
  
  
  // 관리자 페이지 - EDIT
  $('img.close').click(function() {
    $('.blurred').css('display', 'none');
    $('#edit').css('display', 'none');
  });
  
  $('#edit a.url-load').click(function() {
    
    // 정규표현식 검사.
    var urlRegEx = /^(http\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if( !urlRegEx.test($('#edit-url').val()) ) {
      alert('Youtube 동영상 주소를 올바르게 입력해주세요.\nex) http://www.youtube.com/watch?v=F9z1_5CxuKg');
      return;
    }
    
    var parser = document.createElement('a');
    parser.href = $('#edit-url').val();
    
    var videoId = parser.search.substring(3);
    
    // vid 입력.
    $('#edit-vid').val(videoId);
    
    // 썸네일 주소 prefix 등록.
    EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX = 'http://img.youtube.com/vi/' + videoId + '/';
    
    // 썸네일 리스트 생성.
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST = [];
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '0.jpg');
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '1.jpg');
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '2.jpg');
    EDIT_YOUTUBE_THUMBNAIL_URL_LIST.push(EDIT_YOUTUBE_THUMBNAIL_URL_PREFIX + '3.jpg');
    
    $('#edit-0').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[0]);
    $('#edit-1').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[1]);
    $('#edit-2').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[2]);
    $('#edit-3').attr('src', EDIT_YOUTUBE_THUMBNAIL_URL_LIST[3]);
    
    // 썸네일 선택 삭제.
    $('#edit ul.thumbnail-list > li > .thumb-selected').css('visibility', 'hidden');
    $('#edit-thumbnail').val('');
  });
  
  $('#edit ul.thumbnail-list > li').click(function() {
    var selected = $(this).children('img.edit-thumb').attr('index');
    $('#edit ul.thumbnail-list > li > .thumb-selected').css('visibility', 'hidden');
    $('#edit ul.thumbnail-list > li:eq(' + selected + ') > .thumb-selected').css('visibility', 'visible');
    
    $('#edit-thumbnail').val(EDIT_YOUTUBE_THUMBNAIL_URL_LIST[selected]);
  });
  
  
  $('#edit a.edit-ok').click(function() {
    var urlRegEx = /^(http\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    
    var title = $('#edit-title').val();
    var url = $('#edit-url').val();
    var vid = $('#edit-vid').val();
    var thumbnail = $('#edit-thumbnail').val();
    
    if( title === '' ) {
      alert('동영상 제목을 입력해주세요.');
    }
    else if( !urlRegEx.test(url) ) {
      alert('Youtube 동영상 주소를 올바르게 입력해주세요.\nex) http://www.youtube.com/watch?v=F9z1_5CxuKg');
    }
    else if( thumbnail === '' ) {
      alert('동영상 대표 이미지(썸네일)를 선택해주세요.')
    }
    else {
      $('#edit-uploadForm').submit();
      $('.blurred').css('display', 'none');
      $('#edit').css('display', 'none');
    }
  });
  
  
});