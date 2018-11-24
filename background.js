chrome.runtime.onMessage.addListener(function(message, callback) {
    if (!message.type || message.type !== "playsound") return;
    var myAudio = new Audio();
    myAudio.src = "Remember Me.mp3"; // assign the audio file to its src
    myAudio.play();    
});