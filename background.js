if (!Array.prototype.groupBy)
    Array.prototype.groupBy = function (fn) {
        var self = this;
        var me = this.map(fn);
        me = me.filter(function (item, pos, arr) {
            return arr.indexOf(item) == pos;
        });
        var g = [];
        me.forEach(function (item) {
            var filtered = self.filter(function (f) {
                return fn(f) == item;
            });
            g.push({
                [item]: filtered
            });
        });
        return g;
    };


var separateByType = (array) => {
    return array.groupBy((item) => {
        return item.split('.')[item.split('.').length - 1]
    });

};

var createText = (values) => {
    var text = 'Arquivos Encontrados \r\n\r\n\r\n -------------------------- \r\n\r\n\r\n\r';
    values.forEach((item) => {
        var type = Object.keys(item)[0];
        text += type;
        text += '\r\n\r\n';
        item[type].forEach((i) => {
            text += i;
            text += '\r\n\r\n';
        });
        text += '----------------------------';
        text += '\r\n\r\n';
    });
    return text;
};

chrome.runtime.onMessage.addListener(
    function (arg, sender, sendResponse) {
        if (arg && arg.option && arg.option === 'download') {

            if (arg.file) {
                if (arg.array && arg.array.length && arg.array[0].length) {
                    var separated = separateByType(arg.array[0]);
                    var text = createText(separated);
                    var uri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
                    chrome.downloads.download({
                        url: uri,
                        filename: 'images.txt',
                        saveAs: false
                    });
                }
                return;
            }
            arg.array.forEach((item) => {
                item.forEach((image) => {
                    if ((/data\:image\/[^<]+;base6.+?/i).test(image)) {

                        var url = image.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
                        chrome.downloads.download({
                        url: url,
                        filename: ("Image."+/data\:image\/[^<]+;/i.exec(image)[0].split("/")[/data\:image\/[^<]+;/i.exec(image)[0].split("/").length-1]).replace(";", ""),
                        saveAs: false
                    });
                        return;
                    }

                    chrome.downloads.download({
                        url: image,
                        filename: image.split('/')[image.split('/').length - 1],
                        saveAs: false
                    });
                })

            })

        }
    });