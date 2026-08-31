let creatingOffscreenDocument;

async function ensureOffscreenDocument() {
    const offscreenUrl = chrome.runtime.getURL("offscreen.html");
    const contexts = await chrome.runtime.getContexts({
        contextTypes: ["OFFSCREEN_DOCUMENT"],
        documentUrls: [offscreenUrl]
    });

    if (contexts.length) return;

    if (!creatingOffscreenDocument) {
        creatingOffscreenDocument = chrome.offscreen.createDocument({
            url: "offscreen.html",
            reasons: ["AUDIO_PLAYBACK"],
            justification: "Play the extension notification sound"
        }).finally(function() {
            creatingOffscreenDocument = undefined;
        });
    }

    await creatingOffscreenDocument;
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.type !== "playsound") return;

    ensureOffscreenDocument()
        .then(function() {
            chrome.runtime.sendMessage({type: "playoffscreensound"});
        })
        .catch(function(error) {
            console.error("Unable to play notification sound", error);
        });
});