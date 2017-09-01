$(() => {

  function audioLun() {
    const luniz = new Audio('/public/audio/Igot5.mp3');
    luniz.autoplay = true;
    luniz.loop = true;
    luniz.play();

  }
  audioLun();

  const $shotClock = $('.shotClock');
  const $ball = $('#ball');
  const $launch = $('#launch');

  const $target = $('.target');
  const $score = $('.score');
  const $playAgain = $('.playAgain');
  // const $bar = $('.bar');
  const $level2 = $('.LEVEL2');
  const $level3 = $('.LEVEL3');
  const $level4 = $('.LEVEL4');
  const $intro = $('.intro');
  const $shoot = $('.shooters');
  const $ballin = $('.ballin');
  const $level5 = $('.LEVEL5');
  const $win = $('.win');

  let currentLevel = 1;
  let timeRemaining = 20;

  $playAgain.on('click', nextLevel);

  //
  // function reset() {
  //   timeRemaining = 60;
  //   $shotClock.text(timeRemaining);
  //   ballHiddenCount = 0;
  //   $score.text(ballHiddenCount);
  //   counter = null;
  //   $playAgain.fadeOut();
  //   $target.removeAttr('style');
  //
  // }

  function nextLevel() {
    currentLevel++;

    switch(currentLevel) {
      case 1:
        timeRemaining = 20;
        $level4.fadeOut();
        $level3.fadeOut();
        $level2.fadeOut();
        $playAgain.fadeOut();
        $intro.fadeIn();
        $shoot.fadeOut();
        $ballin.fadeOut();
        $level5.fadeOut();
        $win.fadeOut();

        break;
      case 2:
        timeRemaining = 50;
        $intro.fadeOut();
        $level2.fadeIn();
        $target.animate({ left: '95%'}, {
          duration: 30000
        });
        break;
      case 3:
        timeRemaining = 5;
        $level2.fadeOut();
        $level3.fadeIn();
        $shoot.fadeIn();
        break;
      case 4:
        timeRemaining = 15;
        $shoot.fadeOut();
        $ballin.fadeIn();
        $level3.fadeOut();
        $level4.fadeIn();
        $target.animate({ left: '95%'}, {
          duration: 15000
        });
        break;
      case 5:
        timeRemaining = 60;
        $target.removeAttr('style');
        $level4.fadeOut();
        $ballin.fadeOut();
        $level5.fadeIn();
        $target.animate({ left: '95%'}, {
          duration: 30000,
          complete: () => {
            $target.animate({ left: '50%'}, {
              duration: 30000
            });
          }
        });

        break;
      default: timeRemaining = 20;
    }

    $shotClock.text(timeRemaining);
    ballHiddenCount = 0;
    $score.text(ballHiddenCount);
    counter = null;
    $target.removeAttr('style');
  }

  let counter = null;

  function startClock() {
    timeRemaining = timeRemaining - 1;
    if (timeRemaining <= 0) {
      clearInterval(counter);
      if (currentLevel === 1 && ballHiddenCount >= 10) {
        nextLevel();
      } else if (currentLevel === 2 && ballHiddenCount >= 20) {
        nextLevel();
      } else if (currentLevel === 3 && ballHiddenCount >= 3) {
        nextLevel();
      } else if (currentLevel === 4 && ballHiddenCount >= 8) {
        nextLevel();
      } else if (currentLevel === 5 && ballHiddenCount >=30) {
        $win.fadeIn();
        $playAgain.fadeIn();
        currentLevel = 0;
      } else {
        $playAgain.fadeIn();

        currentLevel = 0;
      }
    }
    $shotClock.text(timeRemaining);

  }
  let ballHiddenCount = 0;

  function checkCollision () {
    const ballPos = $ball.offset();
    const targetPos = $target.offset();
    const targetRightPos = targetPos.left + $target.width();


    const ballRightPos = ballPos.left + $ball.width();
    const targetTopPos = targetPos.top;
    const targetBottomPos = targetPos.top + $target.height();
    const ballTopPos = ballPos.top;
    const ballBottomPos = ballPos.top + $ball.height();


    if(
      ballRightPos >= targetPos.left && ballPos.left <= targetRightPos &&
      ballTopPos >= targetTopPos && ballBottomPos <= targetBottomPos
    ) {
      ballHiddenCount++;
      $score.text(ballHiddenCount);
      console.log('hit');
      $ball.hide();
    } else {
      console.log('miss');
    }
  }


  function resetBall() {
    $ball.removeAttr('style').show();
  }


  // let duration = 1000;
  // let durationTimerId = null;
  // let durationModifier = -10;
  // $launch.mousedown(function(){
  //
  //   // durationTimerId = setInterval(() => {
  //   //   if(duration === 500) durationModifier = 10;
  //   //   if(duration === 1000) durationModifier = -10;
  //   //   duration += durationModifier;
  //   //   $bar.width(100 - (duration / 10) + '%');
  //   // }, 10);
  //   // console.log(duration);
  // });

  // $launch.mouseup(function() {
  //   clearInterval(durationTimerId);
  // });

  $launch.click(function launch() {
    // console.log(duration);
    if(!counter) counter = setInterval(startClock, 1000);
    $ball.animate({ left: '100%' }, { //mousedown after $ball
      progress: checkCollision,
      duration: 1000,
      easing: 'linear',
      complete: resetBall
    });
  });

}); // closing tag for DOM content loaded - leave here
