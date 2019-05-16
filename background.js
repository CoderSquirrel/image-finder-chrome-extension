chrome.runtime.onMessage.addListener(
    function(arg, sender, sendResponse) {
        if(arg && arg.option && arg.option==='download') {
            if(arg.array && arg.array.length && arg.array[0].length) {
                var text = arg.array[0].join('\n\t\n\t\n\t\n\n\t\n\t\n\t\n  \r');
                var uri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
                chrome.downloads.download({
                    url: uri,
                    filename: 'images.txt',
                    saveAs: false
                });
            }
        }
    });
