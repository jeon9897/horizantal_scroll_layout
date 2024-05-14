$(document).ready(function(){

  // 1. 세로스크롤 값 출력하기
  $(window).scroll(function(){
    let scrT = $(this).scrollTop();
    $('#sPos').html(scrT);

    //내비게이션 서식 적용

    // 1. 모든 메뉴서식을 제거하고
    $('nav li a').removeClass('on');

    //2. 해당 section이 보이면(위로 올라오면)
    //해상 section메뉴에 addClass한다.
    //$('nav li').eq(n).find('a').addClass('on');

    //각 section별 브라우저 상단으로부터 떨어져있는 값
    // let sec1_Offset = $('#sect1').offset().top;
    // let sec2_Offset = $('#sect2').offset().top;
    // let sec3_Offset = $('#sect3').offset().top;
    // let sec4_Offset = $('#sect4').offset().top;

    // console.log(sec1_Offset, sec2_Offset, sec3_Offset, sec4_Offset);//0, 902, 1804, 2706

    //방법1. 조건문을 통해 범위를 선정하여 a요소에 각각 해당 서식을 적용
    // if(scrT>=sec1_Offset&&scrT<sec2_Offset){ //0~902
    //   $('nav li').eq(0).find('a').addClass('on');
    // }else if(scrT>=sec2_Offset&&scrT<sec3_Offset){//902~1804
    //   $('nav li').eq(1).find('a').addClass('on');
    // }else if(scrT>=sec3_Offset&&scrT<sec4_Offset){//1804~2706
    //   $('nav li').eq(2).find('a').addClass('on');
    // }else if(scrT>=sec4_Offset){ //2706이상
    //   $('nav li').eq(3).find('a').addClass('on');
    // }

    //방법2. 
    // let h = $('section').height(); //902
    // console.log(h); //902

    // if(scrT>=h*0&&scrT<h*1){//0~902
    //   $('nav li').eq(0).find('a').addClass('on');
    // }else if(scrT>=h*1&&scrT<h*2){
    //   $('nav li').eq(1).find('a').addClass('on');
    // }else if(scrT>=h*2&&scrT<h*3){
    //   $('nav li').eq(2).find('a').addClass('on');
    // }else if(scrT>=h*3){
    //   $('nav li').eq(3).find('a').addClass('on');
    // }

    //방법3. each함수
    $('section').each(function(i){ //section 각각 n번째에 해당기능을 적용
      let top = $(this).offset().top;

      if(scrT>=top){
        $('nav li a').removeClass('on');
        $('nav li').eq(i).find('a').addClass('on');
      }
    });
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
              //alert("마지막 페이지 입니다.");
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
              //alert("첫번째 페이지 입니다.");
              return false;
          }
      }
        //화면 이동 0.3초(300)
        $("html,body").stop().animate({scrollTop : moveTop + "px"}, 300);
      });
  });
});