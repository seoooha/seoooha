let board_id = location.search.split('=')[1];
let selCommentList; //select comentlist

//보드 수정/삭제 시 패스워드 확인
function passwrodCheck(value, index){
    document.getElementById('pwdCheckError').style.display = 'none';

    const board_confirm_btn = document.getElementById('board_confirm_btn')
    board_confirm_btn.innerHTML = value.getAttribute('val') === 'modi' || value.getAttribute('val') === 'comment_modi' ? '수정하기' : '삭제하기'

    board_confirm_btn.setAttribute('val',value.getAttribute('val'))
    board_confirm_btn.setAttribute('_id',value.getAttribute('_id'))

    document.getElementById('passwordCheck').value = "";
    document.getElementById('background').style.display = "block";
    document.getElementById('PwdCheck').style.display = "block";
    document.getElementById('body').style.overflow="hidden";
    document.getElementById('passwordCheck').focus()

    if(index){ selCommentList = Number(index) } //클릭한 요소 index
    console.log(selCommentList)
}


function board_confirm_btn(onthis){
  let val = onthis.getAttribute('val');
  let _id = onthis.getAttribute('_id');
  let url = (val == 'del' || val == "modi") ? '/api/board/confirm' : '/api/comment/confirm';

  let data = {
    board_id : board_id,
    password : document.getElementById('passwordCheck').value
  }

  if(val=='comment_del' || val=="comment_modi"){
    data.comment_id = _id
  }

    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function(data) {
        console.log(data)
        if(data.status == 400){ // 비밀번호 일치 하지 않을 때 
          document.getElementById('pwdCheckError').style.display = 'block';
          document.getElementById('passwordCheck').value = '';
          document.getElementById('passwordCheck').focus();
        }else if(data.status == 200){
          document.getElementById('body').style.overflow = 'auto';
          if(val=='del'){ 
            // 게시글 삭제 완료
            board_delete();
          }else if(val == "modi"){
            // 게시글 수정으로 이동 미완성
            location.href = location.origin + "/write" + location.search;
          }else if(val == "comment_modi"){
            // 코멘트 수정되게 이동 완성
            document.getElementById('background').style.display = "none";
            document.getElementById('PwdCheck').style.display = "none";
            commentModifyReady()
          }else if(val == "comment_del"){
            // 코멘트 삭제 완료
            comment_delete(_id);
            
          }
        }
      },
      error: function(err){
        console.log(err)
      }
    });
    
  }

// 게시글 삭제
function board_delete(){
  $.ajax({
    url: '/api/board/remove',
    type: 'DELETE',
    data: {
      board_id : board_id
    },
    success: function(data) {
      if(data.status == 200 )location.href = location.origin + "/listview";
    },
    error: function(err){
      console.log(err)
    }
  });
}

// 코멘트 삭제
 function comment_delete(_id){
  $.ajax({
    url: '/api/comment/remove',
    type: 'DELETE',
    data: {
      board_id : board_id,
      comment_id : _id,
    },
    success: function(data) {
      location.reload();
    },
    error: function(err){
      console.log(err)
    }
  });
}


//댓글등록시
function commentBtn(){
  const name = document.getElementById('comment_name').value;
  const password = document.getElementById('comment_password').value;
  const content = document.getElementById('comment_content').value;
  if(!name || !password || !content ){
    alert('입력정보를 확인하세요.');
    return;
  }
  $.ajax({
    url: '/api/comment/save',
    type: 'POST',
    data: {
      board_id : board_id,
      name : name,
      password : password,
      content : content,
    },
    success: function(data) {
      location.reload()
    },
    error: function(err){
      console.log(err)
    }
  });
}

//댓글수정준비
function commentModifyReady(){
  const commentListArray = document.getElementsByClassName('commentList');

  commentListArray[selCommentList].childNodes[5].style.display = 'none'// 수정 삭제 박스

  const textBox = commentListArray[selCommentList].childNodes[3];
  textBox.childNodes[3].style.display = 'none'; //writeDay
  textBox.childNodes[5].style.display = 'none'; //textContent
  textBox.childNodes[7].style.display = 'block'; //txtareaBox
  textBox.childNodes[9].style.display = 'block'; //btnbox

  textBox.childNodes[7].childNodes[1].value = textBox.childNodes[5].innerText;
  textBox.childNodes[7].childNodes[1].focus()
}

//댓글수정완료
function commentModifySuccess(Id,Index){
  const commentListArray = document.getElementsByClassName('commentList');
  const textareaValue = commentListArray[Index].childNodes[3].childNodes[7].childNodes[1].value;
  if(!textareaValue){
    alert('내용을 입력하세요.');
    return ;
  }
  $.ajax({
    url: '/api/comment/update',
    type: 'PUT',
    data: {
      board_id : location.search.split("=")[1],
      comment_id : Id,
      content : textareaValue,
    },
    success: function(data) {
      console.log(data);
      location.reload();
    },
    error: function(err){
      console.log(err)
    }
  });

}

//댓글수정취소
function commentModifyCancel(Index){
  const commentListArray = document.getElementsByClassName('commentList');
  commentListArray[Index].childNodes[5].style.display = 'block'// 수정 삭제 박스

  const textBox = commentListArray[Index].childNodes[3];
  textBox.childNodes[3].style.display = 'block'; //writeDay
  textBox.childNodes[5].style.display = 'block'; //textContent
  textBox.childNodes[7].style.display = 'none'; //txtareaBox
  textBox.childNodes[9].style.display = 'none'; //btnbox
}