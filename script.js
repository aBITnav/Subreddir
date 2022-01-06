

function makeList(cardInfo) {
    let target=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    return content= `
    <div class="col-sm">
        <div class="card bg-light bg-gradient border-secondary mb-3 modal-body" id="${cardInfo.url}">
        <div class="card-header winter-neva-gradient">
            <h4 class="card-text">${cardInfo.author}</h4>
        </div>
        <div class="card-body"  data-toggle="modal" data-target="${'#'+target}">
            
            <img class="card-img-bottom" src="${cardInfo.url}" alt="Card image cap">
        </div>
    </div>
    <div class="modal fade" id="${target}" >
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">${cardInfo.author}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <img class="card-img-top" src="${cardInfo.url}" alt="Card image cap">
                
            <p class="lead">${cardInfo.title}</p>
            </div>
            
            <div class="modal-footer">
                <i class="fa fa-thumbs-up fa-2x  mr-auto">
                ${cardInfo.upvotes}</i>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>
    </div>
`;    
}

function getContent(subReddit) {
    document.getElementById('myItemList').innerHTML="";
    var url="https://www.reddit.com/r/"+subReddit+".json";
    let cardInfos=[];
    fetch(url)
    .then(response => response.json())
    .then(data => {
        data.data.children.forEach(element => {
            let link=element.data.url;
            if(link.substring(0,18) === "https://i.redd.it/"){
                const cardInfo={
                    title:element.data.title,
                    author:element.data.author,
                    upvotes:element.data.ups,
                    url:link
                }
                console.log(cardInfo);
                cardInfos.push(cardInfo);
            }
        });
    })
    .then( _ => {
        cardInfos.forEach(cardInfo => {
            div = document.createElement('div');
            document.getElementById('myItemList').appendChild(div);
            div.innerHTML += makeList(cardInfo);
        });
    })
    .catch(err =>{
        console.log(err)
    });
}

function zoom(params) {
    let button=document.getElementById("but"+params);
    console.log(button.innerText)
    if(button.innerText === "Zoom In"){
        button.innerText = "Zoom Out";
        document.getElementById(params).style.cssText=`
        padding: 1%;
        `;
    } else {
        button.innerText = "Zoom In";
    }
}