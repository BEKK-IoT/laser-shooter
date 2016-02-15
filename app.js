import { firebase, five } from 'devices-core';
import keypress from 'keypress';
const TEAM = 'laser-tagger';
const fb = new firebase(TEAM);
const board = new five.Board();

board.on("ready", function() {
  keypress(process.stdin);

  var laser = new five.Led(9);
  var endGameTimer = null;

  // listen for the "keypress" event
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      fb.send('laser-tag', false);
      process.exit()
    }

    if (key && key.name == 'return'){
      //maybe end the previous game
      fb.send('laser-tag', false);
      if (endGameTimer) clearTimeout(myVar);

      console.log("Game started");
      fb.send('laser-tag', true);

      var endGameTimer = setTimeout(function() { stopGame(); }, 10000);
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

});

fb.on('stats', `users/laser-target`, function(value){
 if (!value) return;
 console.log(`Score: ${value.hits}, Accuracy: ${Math.round(value.hits * 100/value.count)} %, Tots: ${value.count}`)
});


function stopGame(){
  console.log("Game end");
  fb.send('laser-tag', false);
}
