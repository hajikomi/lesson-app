
window.onload = function(){
    var top = document.getElementById('top');
    var htmlTop = "";
    htmlTop += '<div class="container"><h1 class="title">*Entry System*</h1><h4>レッスンサイト</h4></div>'; 
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
};


//document.addEventListener('DOMContendLoaded',function(){
    //ログイン画面のボタンクリック
    document.getElementById('btn').addEventListener('click',function(){
        var id = document.getElementById('id');
        var password = document.getElementById('password');
        var result = document.getElementById('result');
        var alia = document.getElementById('alia');    
        var req_data = {};
        req_data.id = id.value;
        req_data.password=password.value;
    
        var xhr = new XMLHttpRequest();
        var url = 'http://localhost:3000/login';
    
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var data = JSON.parse(xhr.responseText);
                    if (data.name === null){
                        result.textContent = 'IDまたはPASSWORDに誤りがあります';
                        //アカウント作成画面の表示
                        if (alia.getElementsByTagName('a').length == 0) {
                            getAccount();
                        }
                    } else {
                        console.log(data);
                        //ログイン成功時に、イベントを表示
                        club_list(data);                                       
                    }
                }else {
                    result.textContent ='サーバーエラーが発生しました';
                }
            } else {
                result.textContent = '通信中・・・';
            }
        };
        xhr.open('POST',url,true);
        xhr.setRequestHeader('content-type','application/json');
        //xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send(JSON.stringify(req_data));
        console.log(req_data);        
    },false);
//},false);
//ログイン失敗時に、アカウント作成ボタン⇒アカウント作成画面⇒登録
function getAccount(){
    //アカウント作成anchor作成
    var anchor = document.createElement('a');
    anchor.textContent='アカウントを作成する';
    anchor.id = 'account';
    anchor.href = 'javascript:void(0)';
    alia.appendChild(anchor);

    //アカウント作成ボタンクリック時の処理
    document.getElementById('account').addEventListener('click',function(){
        var title = document.getElementById('title');
        var form_list = document.getElementById('form_list');
        var table_list = document.getElementById('table_list');
        var result = document.getElementById('result');
        var account = document.getElementById('account');
        title.textContent = "アカウントの作成";
        //アカウント登録フォーム作成
        var htmlStr = "";
        htmlStr +='<table id="table_list"><tr><th>ID</th><td><input id="id" type="text" name="id"></td></tr>';
        htmlStr +='<tr><th>パスワード</th><td><input id="password" type="password" name="password"></td></tr>';
        htmlStr +='<tr><th>ユーザ名</th><td><input id="name" type="text" name="name"></td></tr>';
        htmlStr +='<tr><th>チーム名</th><td><input id="team" type="text" name="team"></td></tr>';
        htmlStr +='<tr><th>コメント</th><td><input id="comment" type="text" name="comment"></td></tr></table>';
        var input =document.createElement('input');
        input.type = 'button';
        input.id = 'myBtn';
        input.value='　送　信　';
        form_list.innerHTML=htmlStr;
        form_list.appendChild(input);
        result.textContent="";
        account.textContent ="";
        var backInd = document.createElement('a');
        backInd.textContent='ログイン画面に戻る';
        backInd.href = '/';
        alia.appendChild(backInd);
        //送信ボタンクリック⇒アカウントのmysql登録
        document.getElementById('myBtn').addEventListener('click',function(){
            var id = document.getElementById('id');
            var password = document.getElementById('password');
            var name = document.getElementById('name');
            var team = document.getElementById('team');
            var comment = document.getElementById('comment');
            var req_data = {};
            req_data.id = id.value;
            req_data.password=password.value;
            req_data.name=name.value;
            req_data.team=team.value;
            req_data.comment=comment.value;
            if (req_data.id === "" || req_data.password === "" || req_data.name ==="" || req_data.team==="") {
                window.alert('入力内容に誤りがあります');
            } else {        
                var reTeam = req_data.team;
                req_data.team = reTeam.toLowerCase();
                var xhr = new XMLHttpRequest();
                var url = 'http://localhost:3000/account';
                xhr.onreadystatechange = function(){
                    if (xhr.readyState === 4){
                        if (xhr.status === 200){
                            var data = JSON.parse(xhr.responseText);
                            if (data.name === null){
                                result.textContent = '入力内容に誤りがあります';
                            } else {
                                console.log(data);
                                result.textContent = 'アカウントが作成されました';
                            }
                        }else {
                            result.textContent ='サーバーエラーが発生しました';
                        }
                    }else{
                        result.textContent = '通信中・・・';
                    }
                }; 
                xhr.open('POST',url,true);
                //application/json
                xhr.setRequestHeader('content-type','application/json');
                //xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8');
                xhr.send(JSON.stringify(req_data));
                console.log('OK！');
            }            
        });
    });
};
//参加可能イベントの一覧表示（callback関数）
function club_list(resdata) {
    var res_name = resdata[0].name;
    var res_team = resdata[0].team;
    var res_comment = resdata[0].comment;
    var title = document.getElementById('title');
    var form_list = document.getElementById('form_list');
    var result = document.getElementById('result');

    title.textContent = "エントリーリスト";
    var myName = document.createElement('p');
    myName.textContent = `ようこそ、${res_name}さん`;
    myName.className='size';
    var myTeam = document.createElement('p');
    myTeam.textContent = `あなたのチームは、${res_team}です`;
    myTeam.className='size';
    title.appendChild(myName);
    title.appendChild(myTeam);
    alia = document.getElementById('alia');
    alia.removeChild(form_list);
    var htmlStr = ""
    var no =0;
    for (var i=0,len=resdata.length;i<len;i++) {
        var b = resdata[i];
        var m = new Date(b.date);
        var myYear = m.getFullYear();
        var myMonth = m.getMonth() +1;
        var myDate = m.getDate();
        var eventDay = myYear+'年'+myMonth+'月'+myDate+'日';
        no++;
        htmlStr +='<table><tr><th>イベント No'+no+'</th><td>' + b.title + '</td></tr><tr><th>日時</th><td>' + eventDay +
        '</td></tr><tr><th>場所</th><td>' + b.place + '</td></tr><tr><th>コメント</th><td>' + b.mycomment +
        '</td></tr></table>';
    }
    alia.innerHTML=htmlStr;
    var backInd = document.createElement('a');
    backInd.textContent='ログイン画面に戻る';
    backInd.href = '/';
    alia.appendChild(backInd);
};   


    


