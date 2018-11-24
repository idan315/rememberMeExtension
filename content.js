window.addEventListener("load", scanPage, false);

function scanPage(evt) {
    console.log ("loaded!")
    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var textSearch = node.nodeValue.search(/remember/i);
                if (textSearch > -1 && isElementVisible(element)) { 
                    console.log("♩♪ Remember me ♫♩");
                    playAudio();
                    blinkElement(element, 3, 500);
                }
            }
        }
    }
}

function playAudio() {
    chrome.runtime.sendMessage({type: "playsound"}, function(response) {
    });
}

function isElementVisible(element) {
    return element.offsetParent !== null;
}

function blinkElement(element, times, interval) {
    var originalVisibility = element.style.visibility;
    var hidden = false;
    var count = 0;
    var intervalId = setInterval(function() {
        hidden = !hidden;
        element.style.visibility = (hidden? 'hidden' : originalVisibility)
        if (!hidden) count++;
        if (count == times) clearInterval(intervalId);
    }, interval);
}