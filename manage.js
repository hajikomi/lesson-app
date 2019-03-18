window.onload = function(){
    var top = document.getElementById('top');
    var htmlTop = "";
    htmlTop += '<div class="container"><h1 class="title">*Entry System*</h1><h4>管理者サイト</h4></div>'; 
    top.innerHTML =htmlTop;
    var login = document.getElementById('login');
    htmlLogin ="";
    htmlLogin +='<div class="container"><h2 class="title" id="title">ログイン</h2><div id="alia">';
    htmlLogin += '<form id="form_list"><table id="table_list"><tr><th>ID</th>';
    htmlLogin +='<td><input id="id" type="text" name="id"></td></tr><tr><th>パスワード</th>';
    htmlLogin +='<td><input id="password" type="password" name="password"></td></tr></table>';
    htmlLogin +='<input id= "btn" type="button" data-ajax="login" value="ログイン"></form>';
    htmlLogin +='<div id="result"></div></div></div>';
    login.innerHTML=htmlLogin;
    document.getElementById('btn').addEventListener('click', clickLogin, false);
};

//document.addEventListener('DOMContentLoaded',function(){
    //document.getElementById('btn').addEventListener('click',function(){
    function clickLogin(){
        var id = document.getElementById('id');
        var password = document.getElementById('password');
        var alia = document.getElementById('alia');
        var result = document.getElementById('result');
        var req_manage = {};
        req_manage.id = id.value;
        req_manage.password = password.value;
        if (req_manage.id !=="" && req_manage.password !=="" ){
            var xhr = new XMLHttpRequest();
            var url = 'http://localhost:3000/manager';
            xhr.addEventListener('loadstart',function(){
                result.textContent = '通信中・・・';
            },false);
            xhr.addEventListener('load',function(){
                var data = JSON.parse(xhr.responseText);
                if (data.flag == '1'){
                    eventAdd();
                }else if(data.flag == '2'){
                    result.textContent = 'IDまたはパスワードに誤りがあります'
                }else{
                    result.textContent ='管理者権限がありません';
                }
            },false);
            xhr.addEventListener('error',function(){
                result.textContent = 'サーバーエラーが発生しました';
            },false);
            xhr.open('POST',url,true);
            xhr.setRequestHeader('content-type','application/json');
            xhr.send(JSON.stringify(req_manage));
            console.log(req_manage);
        } else {
            window.alert('ID及びパスワードを入力してください');
        }
    };
    //},false);
//},false);

function eventAdd(){
    var title = document.getElementById('title');
    var alia = document.getElementById('alia');
    var form_list = document.getElementById('form_list');
    title.textContent = 'イベントの追加';
    var htmlEvent = '';
    htmlEvent += '<table id="table_list"><tr><th>チーム名</th><td><input id="myteam" type="text" name="myteam" size="40"></td></tr>'
    htmlEvent += '<tr><th>タイトル</th><td><input id="mytitle" type="text" name="mytitle" size="40"></td></tr>'
    htmlEvent += '<tr><th>開催日</th><td><input id="mydate" type="date" name="mydate"></td></tr>'
    htmlEvent += '<tr><th>場所</th><td><textarea id="myplace" rows="5" cols="40">開催場所に関する情報</textarea></td></tr>'
    htmlEvent += '<tr><th>コメント</th><td><textarea id="mycomment" rows="5" cols="40">その他コメント</textarea></td></tr></table>'
    var input = document.createElement('input');
    input.type='button';
    input.id='mybtn';
    input.value='　送　信　';
    form_list.innerHTML=htmlEvent;
    form_list.appendChild(input);
    var backInd = document.createElement('a');
    var br = document.createElement('br');
    backInd.textContent='ユーザーログイン画面に戻る';
    backInd.href = '/';
    alia.appendChild(backInd);
    alia.appendChild(br);
    var backLog = document.createElement('a');
    backLog.textContent='管理者ログイン画面に戻る';
    backLog.href ='/manage.html';
    alia.appendChild(backLog);
    result.textContent='';
    document.getElementById('mybtn').addEventListener('click', clickEvent, false);
};

function clickEvent(event){
    var alia = document.getElementById('alia');
    var form_list = document.getElementById('form_list');
    var myTeam = document.getElementById('myteam');
    var myTitle = document.getElementById('mytitle');
    var myDate = document.getElementById('mydate');
    var myPlace = document.getElementById('myplace');
    var myComment = document.getElementById('mycomment');
    var atAdd = document.createElement('p');
    if (alia.getElementsByTagName('p').length > 0) {
        alia.removeChild(alia.firstChild);
    }
    if (myTeam.value == "") {
        atAdd.textContent = "チーム名を入力してください";
    } else if (myTitle.value == "") {
        atAdd.textContent = "タイトルを入力してください";
    } else if (myDate.value == "") {
        atAdd.textContent = "開催日を入力してください";
    } else {
        atAdd.textContent = "";
    }

    if (atAdd.textContent !== "") {
        atAdd.className='attend';
        alia.insertBefore(atAdd,form_list);
        atAdd.scrollIntoView(true);
    } else {
        if (alia.getElementsByTagName('p').length > 0) {
            alia.removeChild(alia.firstChild);
        }
        var reqData = {};
        reqData.myteam = myTeam.value.toLowerCase();
        reqData.title = myTitle.value;
        reqData.date = myDate.value;
        reqData.place = myPlace.value;
        reqData.mycomment = myComment.value;
        var xhr = new XMLHttpRequest();
        var url = 'http://localhost:3000/event';
        xhr.addEventListener('loadstart',function(){
            result.textContent = '通信中・・・';
        },false);
        xhr.addEventListener('load',function(){
            var data = JSON.parse(xhr.responseText);
            if (data.myteam === null){
                result.textContent = '入力内容に誤りがあります';
            } else {
                console.log(data);
                result.textContent = 'イベントが登録されました';
            }
        },false);
        xhr.addEventListener('error',function(){
            result.textContent = 'サーバーエラーが発生しました';
        },false);
        xhr.open('POST',url,true);
        xhr.setRequestHeader('content-type','application/json');
        xhr.send(JSON.stringify(reqData));
        console.log(reqData);

    }
    


    
    
};