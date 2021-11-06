const express = require('express');
const app = express();

app.listen(1008, function(){
  console.log('listening on 1008');
});

app.get('/pet', function(req, rsp){
  rsp.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/beauty', function(req, rsp){
  rsp.send('화장품을 쇼핑할 수 있는 페이지입니다.');
})

app.get('/', function(req, rsp){
  rsp.sendFile(__dirname + '/index.html');
})