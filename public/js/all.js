//header영역
window.addEventListener('load',function(){
    if(location.pathname !== '/write'){
        let scrollLocation = document.documentElement.scrollTop;
        scrollLocation > 0 ? document.getElementById('header').classList.add('on') :  document.getElementById('header').classList.remove('on') 
    }
});

window.addEventListener( 'scroll', function () {
    if(location.pathname !== '/write'){
        let scrollLocation = document.documentElement.scrollTop;
        scrollLocation > 0 ? document.getElementById('header').classList.add('on') :  document.getElementById('header').classList.remove('on') 
    }
});

//모달창 닫기
function modalClose(){
    document.getElementById('background').style.display = "none";

    const modal = document.getElementsByClassName("modal");
    for(let i = 0; i<modal.length; i++){
        modal[i].style.display = "none"; 
    }

    document.getElementById('body').style.overflow="auto";
}

//background으로 닫기
document.getElementById('background').addEventListener('click',function (){
    modalClose();
})

//close버튼으로 닫기
document.getElementById('modalCloseBtn').addEventListener('click',function (){
    modalClose();
});
