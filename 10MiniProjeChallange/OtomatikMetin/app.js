const myText = `Merhaba!
Ben bir web geliştiricisiyim.`;
const divWrapper = document.getElementById('wrapper');

let index = 0;

writeText = () => {
    divWrapper.innerText = myText.slice(0,index);
    index++;
    if(index > myText.length)
    {
        index = 0;
    }
}

setInterval(writeText, 100);