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
                if (textSearch > -1) {
                    console.log("♩♪ Remember me ♫♩");
                    playAudio();
                }
            }
        }
    }
}

function playAudio() {
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    });
}

