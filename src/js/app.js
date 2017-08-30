$(() => {

  const $shotClock = $('.shotClock');
  const $ball = $('#ball');
  const $launch = $('#launch');
  const $frame = $('.box');
  const $target = $('.target');
  const $score = $('.score');
  const $playAgain = $('.playAgain');
  const $bar = $('.bar');
  //


  function reset() {
    timeRemaining = 60;
    ballHiddenCount = 0;
  }

  let timeRemaining = 60;
  let counter = null;

  function startClock() {
    timeRemaining = timeRemaining - 1;
    if (timeRemaining <= 0) {
      clearInterval(counter);

      $playAgain.on('click', reset());

      $playAgain.fadeIn();
    }
    if (timeRemaining === 45) {
      $frame.animate({ left: '95%'}, {
        duration: 30000
      });
      // if (timeRemaining === 30) {
      //   $frame.animate({ left: '20%'}, {
      //     duration: 3000
      //   });
      //}

      console.log('yo');
    }
    $shotClock.text(timeRemaining);
  }

  let ballHiddenCount = 0;

  function checkCollision () {
    const ballPos = $ball.offset();
    const targetPos = $target.offset();
    const targetRightPos = targetPos.left + $target.width();
    const framePos = $frame.offset();

    const ballRightPos = ballPos.left + $ball.width();
    const frameTopPos = framePos.top;
    const frameBottomPos = framePos.top + $frame.height();
    const ballTopPos = ballPos.top;
    const ballBottomPos = ballPos.top + $ball.height();


    if(
      ballRightPos >= targetPos.left && ballPos.left <= targetRightPos &&
      ballTopPos >= frameTopPos && ballBottomPos <= frameBottomPos
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
      $bar.width(duration / 10 + '%');
    }, 10);
    console.log(duration);
  });

  function resetDuration() {
    Duration = 1000;
  }

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
      complete: resetBall, resetDuration
    });
  });

}); // closing tag for DOM content loaded - leave here
