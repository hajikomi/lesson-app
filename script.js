
//var result = document.getElementById('result'); 
//result.textContent = "komiyama shouichirou";

/*document.addEventListener('DOMContendLoaded',function(){
    document.getElementById('btn').addEventListener('click',function(){
        var result = document.getElementById('result'); 
        result.textContent = "komiyama shouichirou";
        window.alert('実行されてます');
    });
});*/

//document.addEventListener('DOMContendLoaded',function(){
    document.getElementById('btn').addEventListener('click',function(){
        var id = document.getElementById('id');
        var password = document.getElementById('password');
        var req_data = {};
        req_data.id = id.value;
        req_data.password=password.value;

        var xhr = new XMLHttpRequest();
        var url = 'http://localhost:3000/ajax';

        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                    var data = JSON.parse(xhr.responseText);
                    if (data.name === null){
                        result.textContent = 'IDまたはPASSWORDに誤りがあります。'
                    } else {
                        console.log(data);
                        club_list(data);               
                        //for (var i in data) {
                           //result.textContent += data[i];
                       //}                         
           
                    }
                }else {
                    result.textContent ='通信中・・・';
                }
            }
        };
        xhr.open('POST',url,true);
        //application/json
        xhr.setRequestHeader('content-type','application/json');
        //xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send(JSON.stringify(req_data));
        console.log(req_data);
    },false);
//},false);

function club_list(resdata) {
    var res_name = resdata[0].name;
    var res_team = resdata[0].team;

    var res_comment = resdata.comment;

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
    result.textContent = resdata.date;
}