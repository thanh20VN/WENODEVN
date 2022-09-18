var express = require('express');
var app = express();
const http = require('http');
const server = http.createServer(app)
var multer = require('multer');;
const { Server } = require("socket.io");
const io = new Server(server);
app.listen(8000, () => {
    console.log('listening on *:8000');
  });

app.set('view engine', 'ejs');
app.set('views', './views');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//chatbox vn


//upload
var storage = multer.diskStorage({
    destination : (req, file, res) =>{
      res(null, './upload')
    },
    filename : (req , file , res)=>{
        res(null , file.originalname )
    }
    
});

var upload = multer({ storage : storage});

app.get('/upload' , (req , res)=>{
    res.render('upload');
});

app.post('/upload' , upload.single("tenfile") , (req, res)=>{
    console.log(req.file);
    res.send("upload thanh cong!")
});


//gui thong tin tu server len may khac

app.get('/', (req, res)=>{
    console.log('co nguoi vao trang web nemu')
    res.render('nemu')
});

app.get('/register', (req, res)=>{
    console.log('co nguoi vao trang web dang ki');
	res.render('register');
});

app.get('/login', (req, res)=>{
    console.log('co nguoi vao trang web dang nhan');
    res.render('login');
});

app.get('/thongtin', (req, res)=>{
    console.log('co nguoi vao trang web thong tin');
    res.render('thongtin');
});

app.get('/thongtin1', (req, res)=>{
    console.log('co nguoi vao trang web thong tin 1');
    res.render('thongtin1')
});
app.get('/chucnang', (req, res)=>{
    console.log('co nguoi vao trang web chuc nang');
    res.render('chucnang');
});
app.get('/chatbox', (req, res)=>{
    console.log('co nguoi vao trang web chat box');
    res.render('chatbox');
});

//nhan dua lieu tu may khac ve server
app.post('/register', urlencodedParser, (req, res)=>{
    console.log('co nguoi dang ki trang web');
    console.log('username:');
    console.log(req.body.username);
    console.log('email:');
    console.log(req.body.email);
    console.log('password:')
    console.log(req.body.password);
	res.redirect('login')
});

app.post('/login', urlencodedParser, (req, res)=>{
    console.log('co nguoi vao trang web')
    console.log("username:");
    console.log(req.body.username);
    console.log("password:");
    console.log(req.body.password)
    res.redirect('thongtin')
});

