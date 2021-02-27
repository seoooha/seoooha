//user선택
function MakersClick(maker,name,duties){
    maker.setAttribute('class',name + ' ' + 'clickOff');

    const makers = document.getElementsByClassName("Maker_clickOn");
    for(let i = 0; i<makers.length; i++){
        makers[i].style.display = "none"; 
    }

    let title = document.getElementById('title');
    title.classList.add('clickOn');
    title.innerText = duties;

    document.getElementById('memberList').classList.add('on');
    document.getElementById(name+'Info').style.display = "block";
}

document.getElementById('SH').click();