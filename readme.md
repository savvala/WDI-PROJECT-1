# SH**T

### Description

SH**T is a one player shooting game. The aim of the game is to get a certain amount of points by hitting the moving paddle in a specified time. The time and points required are changed every level to vary difficulty for the player.

### Technologies Used
The list of the languages, frameworks, lib used in the project: HTML, SASS, JavaScript (ES6), jQuery, Gulp, NPM, Git, Github, Heroku.

### Approach
Initially I wanted to have a rotating box where the player had to shoot the ball into to score points, however, I found this difficult to implement with the technologies I had at my disposal. Ultimately, I realised that the game I wanted to create was based around the timing of the shot and the reaction time of the player. Hence the idea of a moving paddle was formed. To find the collision between the ball and the paddle I used .position() on each element. This allowed me to compare the positions of both elements and register a 'hit' only when the positions were the same.

### Challenges
Some challenges I faced were the collision detection and finding a suitable speed for the ball and the paddle. 
