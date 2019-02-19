const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const mysql = require('mysql');
/*
const index_page = fs.readFileSync('./index.html','utf8');
const style_css = fs.readFileSync('./style.css','utf8');
const script_js = fs.readFileSync('./script.js','utf8');
*/
var mysql_setting = {
    host    :'localhost',
    user    :'root',
    password:'',
    database:'my-nodeapp-db'
};

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request,response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST');

    var url_parts = url.parse(request.url,true);
    console.log(url_parts.pathname);
    switch (url_parts.pathname) {
/*        case '/':
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(index_page);
            response.end();
            break;
            
        case '/style.css':
            response.writeHead(200,{'Content-Type':'text/css'});
            response.write(style_css);
            response.end();
            break;

        case '/script.js':
            response.writeHead(200,{'Content-Type':'text/javascript'});
            response.write(script_js);
            response.end();
            break;
*/        
        //ログイン
        case '/login':
            if (request.method == 'POST'){
                var body="";
                request.on('data',(data) => {
                    body += data;
                });
                request.on('end',()=>{
                    console.log(body); 
                    var post_data = JSON.parse(body);
                    console.log(post_data); 
                    var id = post_data.id;
                    var password = post_data.password;
                    //mysqlに接続
                    var connection = mysql.createConnection(mysql_setting);
                    connection.connect();
                    connection.query('SELECT * from eventdata,lessondata where eventdata.myteam = lessondata.team and lessondata.id=? and lessondata.password=?',
                    [id,password],
                        function(error,results,fields){
                            if (error == null) {
                                //var res_data = results[0];
                                if (results[0]==null) {
                                    var elog={};
                                    elog.name = null;
                                    elog.password=null;
                                    console.log(elog);
                                    response.writeHead(200,{'Content-Type':'application/json'});
                                    response.end(JSON.stringify(elog));
                                } else {
                                    res_id = results[0].id;
                                    console.log(results[0].id);
                                    response.writeHead(200,{'Content-Type':'application/json'});
                                    response.end(JSON.stringify(results));
                                }    
                            } else {
                                var elog={};
                                elog.name = null;
                                elog.password='error';
                                console.log(elog);
                                response.writeHead(200,{'Content-Type':'application/json'});
                                response.end(JSON.stringify(elog));
                            }
                        }
                    );
                    connection.end();
                });
            };
            break;

        //アカウント作成       
        case '/account':
            //console.log('通信してます');
            if (request.method == 'POST'){
                var body="";
                request.on('data',(data) => {
                    body += data;
                });
                request.on('end',()=>{
                    var post_data = JSON.parse(body);
                    console.log(post_data); 
                    //mysqlに接続
                    var connection = mysql.createConnection(mysql_setting);
                    connection.connect();
                    connection.query('INSERT INTO lessondata SET ?',post_data,
                        function(error,results,fields){
                            if (error == null) {
                                    console.log(results);
                                    response.writeHead(200,{'Content-Type':'application/json'});
                                    response.end(JSON.stringify(post_data));
                            } else {
                                var elog={};
                                elog.name = null;
                                elog.password='error';
                                console.log(elog);
                                response.writeHead(200,{'Content-Type':'application/json'});
                                response.end(JSON.stringify(elog));
                            }
                        }   
                    );
                    connection.end();
                });
            };
            break; 
        default:
            response.writeHead(200,{'Content-Type':'text/plain'});
            response.end('no page...');
            break;    
    }
};