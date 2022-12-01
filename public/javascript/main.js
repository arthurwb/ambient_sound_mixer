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

// audio player
function playAudio(input) {
    if (input == "stop") {
        /*
            TODO: change to a loop to use howler to stop all the audio
                reloading the page closes all of the dropdowns and the page reloading is kinda weird
        */
        window.location.reload();
    }
    for (var i = 0; i < audioObjects.length; i++) {
        console.log(audioObjects[i])
        if (audioObjects[i][0] == input) {
            if (audioObjects[i][1] == 1) {
                // stop the playing audio
                console.log("stopping audio: " + input);
                audioObjects[i][1] = 0;
                eval(input).stop();

                // delete the element from the playing bar
                $('#' + input + 'PlayingButton').remove();

                // change stop icon to play icon
                $("#" + input + "PlayIcon").addClass("fa-play").removeClass("fa-stop");
                $("#" + input + "Button").addClass("audio-box").removeClass("playing-audio-box");
            } else {
                // play the audio
                console.log("playing audio: " + input);
                audioObjects[i][1] = 1;
                eval(input).play();

                // add the audio to the playing bar
                var playingAudio = $("<div id='" + input + "PlayingDiv'><button class='playing-audio-box' id='" + input + "PlayingButton' onclick='play(`" + input + "`)'><i class='play-icon fa-solid fa-stop'></i> " + input + "</button></div>");
                $('#playingAudioColumn').append(playingAudio);

                // TODO: add volume bars
                // var volumeBar = $("<button class='volume-button'></button>")
                // $("#" + input + "PlayingDiv").append(volumeBar);

                // change play icon to stop icon
                $("#" + input + "PlayIcon").addClass("fa-stop").removeClass("fa-play");
                $("#" + input + "Button").addClass("playing-audio-box").removeClass("audio-box");
                $("#" + input + "Button").css('width', '350px');
            }
        }
    }
    console.log("\n");
}

function play(input) {
    playAudio(input);
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

    // non audio buttons
    $('#dropdown1').click(function (e) { 
        dropdown('column1');
    });
    $('#dropdown2').click(function (e) { 
        dropdown('column2');
    });
    $('#dropdown3').click(function (e) { 
        dropdown('column3');
    });
}