chrome.runtime.onMessage.addListener(function(message, callback) {
    var myAudio = new Audio();
    myAudio.src = "Remember Me.mp3"; // assign the audio file to its src
    myAudio.play();    
});