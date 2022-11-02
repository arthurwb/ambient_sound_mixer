console.log('js file loaded');
var audio;
var audioArray = [];
/*
    [0][0]
    first variable = name of audio being played
    second variable = 0 if not playing, 1 if playing
*/
var optionArray = [
    ['rain', 0],
    ['chatter', 0],
    ['jensyn', 0]
];

function play(input) {
    if (input == 'stop') {
        window.location.reload();
    }

    for (var i = 0; i <= 1; i++) {
        if (optionArray[i][0] == input) {   //  if audio is already playing, reset the window
            if (optionArray[i][1] == 1) {
                window.location.reload();
            }
        }
    }

    audio = new Audio('/sounds/' + input + '.mp3');
    audio.loop = true;
    audio.play();
    audioArray.push(' ' + input);

    $('#' + input + 'Button').text('PLAYING');
    $('#' + input + 'Button').addClass('playing');

    console.log('Now playing:' + audioArray);

    $('#audioPlaying').html('<div class="">Now playing:</div>' + '<div>' + audioArray + '</div>');

    for (var i = 0; i <= 1; i++) {
        if (optionArray[i][0] == input) {   //  when button is clicked, audio is set to being played
            optionArray[i][1] = 1;
        }
    }
}

//  add all on click functions here
window.onload = function(e) {
    console.log('window loaded');
    //  play rain sounds
    $('#rainButton').click(function (e) {
        play('rain');
    });
    //  play chatter sounds
    $('#chatterButton').click(function (e) {
        play('chatter');
    });
    //  play jesyn sounds
    $('#jensynButton').click(function (e) {
        play('jensyn');
    });
    //  stop audio (reload page)
    $('#stop').click(function(e) {
        play('stop');
    })
}