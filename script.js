

function makeList(cardInfo) {
    return content= `
    <div class="col-sm">
        <div class="card bg-light border-secondary mb-3 modal-body" id="${cardInfo.url}">
        <img class="card-img-top" src="${cardInfo.url}" alt="Card image cap">
        <div class="card-body">
            <h6 class="card-title">${cardInfo.title}</h5>
            <p class="card-text">${cardInfo.author}</p>
            <p class="card-text">${cardInfo.upvotes}</p>
            <a href="#" class="btn btn-primary" id="${'but'+cardInfo.url}" data-toggle="modal" data-target="#aaa" >Zoom In</a>
        </div>
        </div>
    <div class="modal fade" id="aaa" >
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">${cardInfo.title}</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                ${cardInfo.author}
            </div>
            <div class="modal-footer">
                ${cardInfo.upvotes}
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
    // document.getElementById(params).style.cssText=`
    // transform: scale(1.2);
    // z-index: 1;
    // background-color: rgba(0, 0, 0, 0.61);
    // backdrop-filter: blur(5px);
    //
}