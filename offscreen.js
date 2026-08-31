const audio = new Audio(chrome.runtime.getURL("Remember Me.mp3"));

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type !== "playoffscreensound") return;

    audio.currentTime = 0;
    audio.play().catch(function(error) {
        console.error("Unable to play notification sound", error);
    });
});
