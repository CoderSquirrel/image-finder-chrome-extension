
let findAll = document.getElementById('findAll');
let download = document.getElementById('download');



const downloadResultFile = (result)=> {
    chrome.runtime.sendMessage({option:'download', array:result, file: true});
}


const downloadResultImages = (result)=> {
    chrome.runtime.sendMessage({option:'download', array:result, file: false});
}

findAll.addEventListener('click', () => {
    function findAll() {
        var imgs =Array.from(document.body.getElementsByTagName("img")).map((img)=> img.src);
        let bgs = Array.from(document.body.getElementsByTagName("*")).map((item) => {
            return getComputedStyle(item).backgroundImage || getComputedStyle(item).background.indexOf('url');
        }).filter((img) => {
            return img && img!=null && (/url\(\"([^<]+)\".+?/i).test(img);
        }).map((img)=> img.match(/url\(\"([^<]+)\".+?/i)[1]);
        return [...imgs, ...bgs];
    }
    chrome.tabs.executeScript({
        code: '(' + findAll + ')();'
    },downloadResultFile);
});

download.addEventListener('click', () => {
    function findAll() {
        var imgs =Array.from(document.body.getElementsByTagName("img")).map((img)=> img.src);
        let bgs = Array.from(document.body.getElementsByTagName("*")).map((item) => {
            return getComputedStyle(item).backgroundImage || getComputedStyle(item).background.indexOf('url');
        }).filter((img) => {
            return img && img!=null && (/url\(\"([^<]+)\".+?/i).test(img);
        }).map((img)=> img.match(/url\(\"([^<]+)\".+?/i)[1]);
        return [...imgs, ...bgs];
    }
    chrome.tabs.executeScript({
        code: '(' + findAll + ')();'
    },downloadResultImages);
});