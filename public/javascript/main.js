console.log('js file loaded');
// array of audio objects
const audioObjects = [
    ['rain', 0],
    ['chatter', 0],
    ['jensyn', 0]
]
// howler audio objects
var rain = new Howl({
    src : ['/sounds/rain.mp3'],
});
var chatter = new Howl({
    src : ['/sounds/chatter.mp3']
});
var jensyn = new Howl({
    src : ['sounds/jensyn.mp3'],
});

//audio stopper
function stopAudio(input) {
    for (let i = 0; i < audioObjects.length; i++) {
        if (audioObjects[i][1] == 1) {
            // stop the playing audio
            console.log("stopping audio: " + audioObjects[i][0]);
            audioObjects[i][1] = 0;
            eval(audioObjects[i][0]).stop();

            // delete the element from the playing bar
            $(`#${audioObjects[i][0]}PlayingButton`).remove();
            $(`#${audioObjects[i][0]}PlayingDiv`).remove();

            // change stop icon to play icon
            $(`#${audioObjects[i][0]}PlayIcon`).addClass("fa-play").removeClass("fa-stop");
            $(`#${audioObjects[i][0]}Button`).addClass("audio-box").removeClass("playing-audio-box");
        }
    }
}

// audio player
function playAudio(input) {
    for (var i = 0; i < audioObjects.length; i++) {
        console.log(audioObjects[i])
        if (audioObjects[i][0] == input) {
            if (audioObjects[i][1] == 1) {
                // stop the playing audio
                console.log("stopping audio: " + input);
                audioObjects[i][1] = 0;
                eval(input).stop();

                // delete the element from the playing bar
                $(`#${input}PlayingButton`).remove();
                $(`#${input}PlayingDiv`).remove();

                // change stop icon to play icon
                $(`#${input}PlayIcon`).addClass("fa-play").removeClass("fa-stop");
                $(`#${input}Button`).addClass("audio-box").removeClass("playing-audio-box");
            } else {
                // play the audio
                console.log("playing audio: " + input);
                audioObjects[i][1] = 1;
                eval(input).play();

                // add the audio to the playing bar
                var playingAudio = $(`<div id='${input}PlayingDiv' class='playing-row'><button class='playing-audio-box' id='${input}PlayingButton' onclick='play("${input}")'><i class='play-icon fa-solid fa-stop'></i> ${input}</button></div>`);
                $('#playingAudioColumn').append(playingAudio);

                // TODO: add volume bars
                var volumeBar = $(`<button id='${input}VolumeBar' class='volume-button'>&nbsp;</button>`)
                $("#" + input + "PlayingDiv").append(volumeBar);

                // change play icon to stop icon
                $(`#${input}PlayIcon`).addClass("fa-stop").removeClass("fa-play");
                $(`#${input}Button`).addClass("playing-audio-box").removeClass("audio-box");
                $(`#${input}Button`).css('width', '350px');
            }
        }
    }
    console.log("\n");
}

function play(input) {
    if (input == "stop") {
        stopAudio(input);
    } else {
        playAudio(input);
    }
}

function dropdown(column) {
    if ($('#' + column).is(":visible")) {
        $('#' + column).css('display', 'none');
    } else {
        $('#' + column).css('display', 'block');
    }
}

//  add all on click functions here
window.onload = function(e) {
    // audio click triggers
    console.log('window loaded');
    //  play rain sounds
    $('#rainButton').click(function (e) {
        play('rain');
    });
    $('#rainPlayingButton').click(function (e) {
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
    $('#testButton').click(function (e) {
        play('jensyn');
    });
    //  stop audio (reload page)
    $('#stop').click(function(e) {
        play('stop');
    })

    // dropdowns
    $('#dropdown1').click(function (e) { 
        dropdown('column1');
    });
    $('#dropdown2').click(function (e) { 
        dropdown('column2');
    });
    $('#dropdown3').click(function (e) { 
        dropdown('column3');
    });

    // buttons
    $('#indexButton').click(function (e) { 
        location.href = './';
    });
    $('#getURL').click(function (e) { 
        console.log(window.location.href);
    });
}