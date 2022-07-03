import { Howl } from 'howler';

const play = (tone) => {

  //console.log('play tone: ' + tone);
  var filename;

  switch(tone) {
                
    case 'next':
      filename = 'Next_Button';
      break;
    case 'game':
      filename = 'Choosing_Game';
      break;
    case 'card':
      filename = 'Select_Card';
      break;
    case 'attribute':
      filename = 'Attribute_Selection';
      break;
    case 'choose':
      filename = 'Choosing_Cards';
      break;
    case 'enter':
      filename = 'Opponent_Found';
      break;
    case 'score':
      filename = 'Score_Screen';
      break;
    case 'winner':
      filename = 'Winner_Screen';
      break;
    case 'type1':
      filename = 'typewriter-key-1';
      break;
    case 'type2':
      filename = 'typewriter-sound';
      break;
                
    default:
    console.error('audio file not found: ' + tone);
  }

  //console.log('play file: ' + filename);

  var sound = new Howl({
    src: [require('./assets/audio/' + filename + '.mp3')]
  });
  sound.play();
}

export {
  play
}
