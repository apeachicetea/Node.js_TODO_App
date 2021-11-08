//라이브러리 express 사용시 기본으로 적어야 할 것. 이해x 그냥 적으셈
//서버를 만들기 위해 express라는 라이브러리가 필요함.
const express = require('express');
const app = express();
//2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함이라 
//따로 npm으로 설치할 필요가 없어졌다. 
app.use(express.urlencoded({extended: true})); 
app.set('view engine', 'ejs');
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://eodbszla:1q2w3e4r@cluster0.7lq41.mongodb.net/todoapp?retryWrites=true&w=majority',
  function(에러, client){
    if(에러) {return console.log(에러)};
    db = client.db('todoapp');
    //db중 todoapp이라는 데이터베이스에 접근한다.

    db.collection('post').insertOne({ 이름 : 'John', 나이 : 20, _id : 1 }, function(에러, 결과){
    //db중 post라는 컬렉션에 접근한다. 데이터 저장방식은 객체형식으로 저장한다.
      console.log('저장완료');
    });

    //1008 port로 웹서버를 열고 잘열리면 'listening on 1008'을 출력해주세요.
    app.listen(1008, function(){
      console.log('listening on 1008');
    });

})

//어떤 사람이 /add 경로로 post 요청을 하면 ~를 해주세요.
//input에 적은 정보는 어디있을까?? 바로 콜백함수 파라미터 req에 저장되어 있다.
app.post('/add', function(req, rsp){
  rsp.send('전송완료');
  console.log(req.body.title);
  console.log(req.body.date);
  db.collection('post').insertOne({ _id : 3, 제목 : req.body.title, 날짜 : req.body.date }, function(에러, 결과){
    console.log('저장완료');
  })
});

// /list로 GET요청으로 접속하면 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여주세요.
app.get('/list', function(req, rsp){
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과);
  });
  //db에 저장된 post라는 컬렉션안의 모든 데이터를 꺼내주세요.
  rsp.render('list.ejs', { posts : 결과 });
});


//~~경로로 들어오면 ~~를 보내줌
//.get('경로', function(요청내용, 응답할 방법){})
app.get('/pet', function(req, rsp){
  rsp.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/beauty', function(req, rsp){
  rsp.send('화장품을 쇼핑할 수 있는 페이지입니다.');
});

app.get('/', function(req, rsp){
  rsp.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, rsp){
  rsp.sendFile(__dirname + '/write.html');
});


//API 란?(웹개발시)
//Application Programming Interface
//웹서버와 고객간의 소통방법
//어떻게 해야 서버랑 통신을 할 수 있을까
//app.get('/write', function(req, rsp){
//  rsp.sendFile(__dirname + '/write.html');
// });의 get도 API이다.

//좋은 REST API
// 1.URL을 명사로 작성 추천
// 2.하위문서를 나타낼 땐 /
// 3.파일확장자(.html) 쓰지말기
// 4.띄어쓰기는 대쉬(-) 이용
// 5.자료 하나당 하나의 URL
