let findImages = document.getElementById('findImages');
let findInBackground = document.getElementById('findInBackground');
let findAll = document.getElementById('findAll');

        findImages.addEventListener('click', () => {
            function findImages() {
                var images = Array.from(document.body.getElementsByTagName("img")).map((img)=> img.src);
                console.log(images);
                return images;
            }
            chrome.tabs.executeScript({
                code: '(' + findImages + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                console.log(results);
            });
        });

        findInBackground.addEventListener('click', () => {
            function findInBackground() {
                let images = Array.from(document.body.getElementsByTagName("*")).map((item) => {
                    return item.style.backgroundImage || item.style.background.indexOf('url') != -1;
                }).filter((img) => {
                    return img
                }).map((img)=>img.match(/url\(\"([^<]+)\".+?/i)[1]);
                return images;
            }
            chrome.tabs.executeScript({
                code: '(' + findInBackground + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                console.log(results);
            });
        });

        findAll.addEventListener('click', () => {
            function findAll() {
                var imgs =Array.from(document.body.getElementsByTagName("img")).map((img)=> img.src);
                let bgs = Array.from(document.body.getElementsByTagName("*")).map((item) => {
                    return item.style.backgroundImage || item.style.background.indexOf('url') != -1;
                }).filter((img) => {
                    return img
                }).map((img)=>img.match(/url\(\"([^<]+)\".+?/i)[1]);
console.log(imgs);
console.log(bgs);
            //    var images = bgs.concat(imgs);
                return {images: imgs, bgs:bgs};
            }
            chrome.tabs.executeScript({
                code: '(' + findAll + ')();' //argument here is a string but function.toString() returns function's code
            }, (results) => {
                console.log(results);
            });
        });
