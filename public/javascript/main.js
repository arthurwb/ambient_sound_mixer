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
    loop : true,
    volume : 0.5
});
var chatter = new Howl({
    src : ['/sounds/chatter.mp3'],
    onend: function() {
        sound.play();
    },
    volume : 0.5
});
var jensyn = new Howl({
    src : ['sounds/jensyn.mp3'],
    loop : true,
    volume : 0.5
});

//audio stopper
function stopAudio(input) {
    for (let i = 0; i < audioObjects.length; i++) {
        if (audioObjects[i][1] == 1) {
            // stop the playing audio and reset the volume
            console.log("stopping audio: " + audioObjects[i][0]);
            audioObjects[i][1] = 0;
            eval(audioObjects[i][0]).stop();
            eval(audioObjects[i][0]).volume(0.5);

            // remove the stop bar
            $('#stop').addClass('hide').removeClass('display');

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
                // stop the playing audio and reset volume
                console.log("stopping audio: " + input);
                audioObjects[i][1] = 0;
                eval(input).stop();
                eval(input).volume(0.5);

                // remove stop bar
                var stopCounter = 0;
                for (let i = 0; i < audioObjects.length; i++) {
                    if (audioObjects[i][1] == 1) {
                        stopCounter++;
                    }
                }
                if (stopCounter == 0) {
                    $('#stop').addClass('hide').removeClass('display');
                }

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

                // show stop audio bar
                $('#stop').addClass('display').removeClass('hide');

                // add volume bars
                var volumeBar = $(`<button id='${input}VolumeBar' class='volume-button' onclick='volumeController("${input}")'><i id='${input}VolumeIcon'class="fa-solid fa-volume-low"></i></button>`)
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

function volumeController(input) {
    console.log(`volume input from${input}`);
    if (eval(input).volume() == 0.5) {
        eval(input).volume(1);
        $(`#${input}VolumeBar`).addClass('volume-clicked');
        $(`#${input}VolumeIcon`).addClass('fa-volume-high').removeClass('fa-volume-low');
    } else if (eval(input).volume() == 1) {
        eval(input).volume(0.5);
        $(`#${input}VolumeBar`).removeClass('volume-clicked');
        $(`#${input}VolumeIcon`).addClass('fa-volume-low').removeClass('fa-volume-high');
    }
    console.log(eval(input).volume());
}

function dropdown(column) {
    if ($('#column' + column).is(":visible")) {
        $('#column' + column).css('display', 'none');
        $('#dropdownIcon' + column).addClass('fa-caret-right').removeClass('fa-caret-down');
    } else {
        $('#column' + column).css('display', 'block');
        $('#dropdownIcon' + column).addClass('fa-caret-down').removeClass('fa-caret-right');
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
        dropdown('1');
    });
    $('#dropdown2').click(function (e) { 
        dropdown('2');
    });
    $('#dropdown3').click(function (e) { 
        dropdown('3');
    });

    // buttons
    $('#indexButton').click(function (e) { 
        location.href = '/';
    });
    $('#loginButton').click(function (e) { 
        location.href = '/login';
    });
}