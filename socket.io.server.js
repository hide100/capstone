﻿// 모듈을 추출합니다.
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

// 웹 서버를 생성합니다.
var server = http.createServer(function (request, response) {
    // HTMLPage.htm 파일을 읽습니다.
    fs.readFile('HTMLPage.htm', function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
    });
});
server.listen(80);

// 소켓 서버를 생성 및 실행합니다.
var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
    // rint 이벤트
    socket.on('rint', function (data) {
        // 클라이언트가 전송한 데이터를 출력합니다.
        console.log('Client Send Data:', data);
        // 클라이언트에게 smart 이벤트를 발생시킵니다.
        socket.emit('smart', data);
    });
});