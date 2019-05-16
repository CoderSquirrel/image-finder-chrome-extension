let findImages = document.getElementById('findImages');
let findInBackground = document.getElementById('findInBackground');
let findAll = document.getElementById('findAll');




const downloadResult = (result)=> {
    console.log('result',result)
    chrome.runtime.sendMessage({option:'download', array:result});
}

findImages.addEventListener('click', () => {
    function findImages() {
        var images = Array.from(document.body.getElementsByTagName("img")).map((img)=> img.src);
        console.log(images)
        return images;
    }
    chrome.tabs.executeScript({
        code: '(' + findImages + ')();'
    },downloadResult);
});

findInBackground.addEventListener('click', () => {
    function findInBackground() {
        let images = Array.from(document.body.getElementsByTagName("*")).map((item) => {
            return item.style.backgroundImage || item.style.background.indexOf('url') != -1;
        }).filter((img) => {
            return img && img!=null && (/url\(\"([^<]+)\".+?/i).test(img);
        }).map((img)=>img.match(/url\(\"([^<]+)\".+?/i)[1]);
        console.log(images)
        return images;
    }
    chrome.tabs.executeScript({
        code: '(' + findInBackground + ')();'
    }, downloadResult);
});

findAll.addEventListener('click', () => {
    function findAll() {
        var imgs =Array.from(document.body.getElementsByTagName("img")).map((img)=> img.src);
        let bgs = Array.from(document.body.getElementsByTagName("*")).map((item) => {
            return item.style.backgroundImage || item.style.background.indexOf('url') != -1;
        }).filter((img) => {
            return img && img!=null && (/url\(\"([^<]+)\".+?/i).test(img);
        }).map((img)=> img.match(/url\(\"([^<]+)\".+?/i)[1]);
        return [...imgs, ...bgs];
    }
    chrome.tabs.executeScript({
        code: '(' + findAll + ')();'
    },downloadResult);
});
