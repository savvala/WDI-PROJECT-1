$(() => {

  console.log('oi');

  const $ball = $('#ball');
  const $launch = $('#launch');
  const $frame = $('.box');
  const $target = $('.target');

  function checkCollision () {
    const ballPos = $ball.offset();
    const targetPos = $target.offset();
    const framePos = $frame.offset();

    const ballRightPos = ballPos.left + $ball.width();
    if(ballRightPos >= targetPos.left) {
      $ball.stop();
    }
  }

  $launch.click(function launch(){
    console.log('here');
    $ball.animate({ left: '2000px' }, {
      progress: checkCollision,
      duration: 2000,
      easing: 'easeOutCubic'
    });
  });

}); // closing tag for DOM content loaded - leave here
