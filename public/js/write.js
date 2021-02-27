//게시글등록
function boardBtn(){
    const board_title = document.getElementById('board_title').value;
    const board_comment = document.getElementById('board_comment').value;
    const board_name = document.getElementById('board_name').value;
    const board_password = document.getElementById('board_password').value;

    if(board_title === ""){
        alert('제목을 입력하세요');
        document.getElementById('board_title').focus()
        return
    }
    if(board_comment === ""){
        alert('내용을 입력하세요');
        document.getElementById('board_comment').focus()
        return
    }
    if(board_name === ""){
        alert('작성자를 입력하세요');
        document.getElementById('board_name').focus()
        return
    }
    if(board_password === ""){
        alert('패스워드를 입력하세요');
        document.getElementById('board_password').focus()
        return
    }

    $.ajax({
      url: '/api/board/save',
      type: 'POST',
      data: {
        name : board_name,
        password : board_password,
        title : board_title,
        content : board_comment,
      },
      success: function(data) {
        console.log(data)
        location.href = location.origin + "/view?board_id="+data.data.board._id;
      },
      error: function(err){
        console.log(err)
      }
    });
  }

//게시글수정
function boardModifyBtn(){
  $.ajax({
    url: '/api/board/update',
    type: 'PUT',
    data: {
      board_id : location.search.split('=')[1],
      title : document.getElementById('board_title').value,
      content : document.getElementById('board_comment').value,
    },
    success: function(data) {
      console.log(data);
      location.href = location.origin + "/view" + location.search;
    },
    error: function(err){
      console.log(err)
    }
  });
}