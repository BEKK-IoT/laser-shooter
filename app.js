import { firebase, five } from 'devices-core';
const TEAM = 'laser-tagger';
const fb = new firebase(TEAM);
const board = new five.Board();

board.on("ready", function() {
  var laser = new five.Led(9);
  console.log("Game started");

  fb.send('laser-tag', true);

  setTimeout(function() { stopGame(); }, 10000);
  
  fb.on('stats', `users/laser-target`, function(value){
   //write value to terminal
   if (!value) return;
   console.log(`Score: ${value.hits}, Accuracy: ${Math.round(value.hits * 100/value.count)} %, Tots: ${value.count}`)
  });
});


function stopGame(){
  console.log("Game end");
  fb.send('laser-tag', false);
}
