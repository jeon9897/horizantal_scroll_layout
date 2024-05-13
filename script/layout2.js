$(document).ready(function(){

// 1. 세로스크롤 값 출력하기
$(window).scroll(function(){
  let sposL = $(this).scrollTop();
  $('#sPos').html(sposL);
});

// 2. 메뉴 클릭시 해당 section이 부드럽게 애니메이션 되면서 스크롤됨.
  $('nav li a').click(function(){
    // 모든 메뉴서식을 제거하고
    $('nav li a').removeClass('on');
    //선택한 메뉴만 서식을 적용한다.
    $(this).addClass('on');

    //선택한 a요소의 href속성값을 가져온다.
    let id_name = $(this).attr('href');
    console.log(id_name);//#sec1, #sec2, #sec3, #sec4

    //각 href속성값에 scrollLeft값을 0으로 맞추면 해당콘텐츠가 나오게됨.
    let secOffset = $(id_name).offset().top;

    $('html, body').animate({'scrollTop':secOffset},500);
    
    return false;
  });

  // 마우스 휠이벤트를 사용하여 휠돌리면 한페이지씩 이동하기
  $('main section').each(function(){
    // 개별적으로 Wheel 이벤트 적용
    $(this).on('mousewheel',function(e){
      
      var delta = 0;
      var moveTop = null;
      var boxMax = $("main section").length - 1;
      var winEvent = "";
      console.log(boxMax);
      
      if(!winEvent) { //만약에 이벤트가 발생하지 않는다면
        winEvent = window.event; //이벤트는 없다
      }
      if(winEvent.wheelDelta) { //만약에 이벤트에서 휠데이터값이 있다면
        delta = winEvent.wheelDelta / 120; //데이터값을 저장
        if(window.opera) {
            delta = -delta;
        }
      }          
      else if(winEvent.detail) { //그렇지 않으면
        delta = -winEvent.detail / 3; 
      }
            
      // 마우스휠을 위에서 아래로 이동(처음에서 다음박스로 이동)
      if(delta < 0) {
          // 마지막 BOX 보다 순서값이 작은 경우에 실행
          if($(this).index() < boxMax) {
              console.log("▼");
              if($(this).next() != undefined) {
                  moveTop =$(this).next().offset().top;
              }
          }
          // 마지막 article보다 더 오른쪽으로 이동하려고 하는 경우 알림창 출력
          else {
              alert("마지막 페이지 입니다.");
              return false;
          }
      }
      // 마우스휠을 아래에서 위로 이동( 뒤에서 앞으로 이동)
      else {
          // 첫번째 article보다 순서값이 큰 경우에 실행
          if($(this).index() > 0) {
              console.log("▲");
              if($(this).prev() != undefined) {
                  moveTop =$(this).prev().offset().top;
              }
          }
          // 첫번째 article보다 더 위로 이동하려고 하는 경우 알림창 출력
          else {
              alert("첫번째 페이지 입니다.");
              return false;
          }
      }
        //화면 이동 0.3초(300)
        $("html,body").stop().animate({scrollTop : moveTop + "px"}, 300);
      });
  });
});