//list link이동
function link(item){
    let listId = item;
    location.href = location.origin + "/view?board_id="+listId;
}


function listSearch(){
  let searchValue = document.getElementById('search').value
  searchValue ? location.href = location.origin + "/listview?search=" + searchValue : '';
}