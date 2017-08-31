$(() => {

  // function audioLun() {
  //   const luniz = new Audio('/audio/Igot5.mp3');
  //   luniz.play();
  // }
  // audioLun();

  const $shotClock = $('.shotClock');
  const $ball = $('#ball');
  const $launch = $('#launch');

  const $target = $('.target');
  const $score = $('.score');
  const $playAgain = $('.playAgain');
  const $bar = $('.bar');
  const $level2 = $('.LEVEL2');
  const $level3 = $('.LEVEL3');
  const $level4 = $('.LEVEL4');
  const $intro = $('.intro');
  const $shoot = $('shooters');
  const $win = $('.win');
  const $ballin = $('.ballin');

  let currentLevel = 1;


  $playAgain.on('click', nextLevel);

  //
  // function reset() {
  //   // timeRemaining = 60;
  //   // $shotClock.text(timeRemaining);
  //   // ballHiddenCount = 0;
  //   // $score.text(ballHiddenCount);
  //   // counter = null;
  //   // $playAgain.fadeOut();
  //   // $target.removeAttr('style');
  //
  // }

  function nextLevel() {
    currentLevel++;

    switch(currentLevel) {
      case 1: timeRemaining = 30;
        $level4.fadeOut();
        $level3.fadeOut();
        $level2.fadeOut();
        $playAgain.fadeOut();
        $intro.fadeIn();
        $shoot.fadeOut();
        $win.fadeOut();
        $ballin.fadeOut();

        break;
      case 2: timeRemaining = 60;
        $intro.fadeOut();
        $level2.fadeIn();
        $target.animate({ left: '95%'}, {
          duration: 30000
        });
        break;
      case 3: timeRemaining = 5;
        $level2.fadeOut();
        $level3.fadeIn();
        $shoot.fadeIn();
        break;
      case 4: timeRemaining = 15;
        $ballin.fadeIn();
        $level3.fadeOut();
        $level4.fadeIn();
        $target.animate({ left: '95%'}, {
          duration: 15000
        });
        break;
      case 5: timeRemaining = 65;
        $target.removeAttr('style');
        $level4.fadeOut();
        $ballin.fadeOut();
        $target.animate({ left: '95%'}, {
          duration: 20000
        });
        break;
      default: timeRemaining = 30;
    }

    $shotClock.text(timeRemaining);
    ballHiddenCount = 0;
    $score.text(ballHiddenCount);
    counter = null;
    $target.removeAttr('style');
  }



  let timeRemaining = 30;
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


  let duration = 1000;
  let durationTimerId = null;
  let durationModifier = -10;
  $launch.mousedown(function(){

    durationTimerId = setInterval(() => {
      if(duration === 500) durationModifier = 10;
      if(duration === 1000) durationModifier = -10;
      duration += durationModifier;
      $bar.width(100 - (duration / 10) + '%');
    }, 10);
    console.log(duration);
  });

  $launch.mouseup(function() {
    clearInterval(durationTimerId);
  });

  $launch.click(function launch() {
    console.log(duration);
    if(!counter) counter = setInterval(startClock, 1000);
    $ball.mousedown().animate({ left: '100%' }, {
      progress: checkCollision,
      duration: duration,
      easing: 'linear',
      complete: resetBall
    });
  });

}); // closing tag for DOM content loaded - leave here
