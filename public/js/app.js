const formData = document.querySelector('form');
const search = document.querySelector('input');
let messageone = document.querySelector('#message-one');
let messagetwo = document.querySelector('#message-two');
formData.addEventListener('submit', (e) => {
    e.preventDefault()
    let city = search.value;
    messageone.textContent = "Loading Please Wait....";
    messagetwo.textContent="";
    if(search.value === '')
    {
        city = 'Karachi'
    }
    const mainDiv = document.querySelector('.main-div')
    mainDiv.innerHTML='';
    fetch('http://localhost:3000/weather?city='+city)
    .then(res => {
        res.json()
        .then(info => {
            messageone.textContent = 'Country:     '+info.Country+', '+ info.Region;
            messagetwo.textContent = 'Temperature: '+info.temperature;
            info.data.map(data => {
                var div1 = document.createElement('div');
                div1.className = 'ui items block header';

                var div2 = document.createElement('div');
                div2.className = 'item';
                div1.appendChild(div2);

                var div3 = document.createElement('div');
                div3.className = 'ui small image';
                var img = document.createElement('img');
                img.setAttribute('alt', 'picture');
                img.setAttribute('src', data.urlToImage)
                div3.appendChild(img);
                div2.appendChild(div3);

                var div4 = document.createElement('div');
                div4.className = 'content';

                var div5 = document.createElement('div');
                div5.className = 'header';
                div5.textContent = data.title;
                div4.appendChild(div5);

                var div6 = document.createElement('div');
                div6.className = 'description';

                var para1= document.createElement('p');
                para1.textContent=data.description;

                var para2 = document.createElement('p');
                para2.textContent=data.publishedAt;

                div6.appendChild(para1);
                div6.appendChild(para2);
                div4.appendChild(div6);
                div2.appendChild(div4);


                mainDiv.appendChild(div1);
            })
            search.value = '';
        })
    })
    
})




