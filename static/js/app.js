// global dom
let socket = null;
let cnn_dom = document.querySelector('.connect');
let msg_dom = document.querySelector('.msg');
let out_dom = document.querySelector('.out');

// app functions
function log(msg){
  out_dom.innerHTML += `${msg}<br>`;
}
function send_message(){
  if(msg_dom.value){
    log('[send] ' + msg_dom.value);
    socket.emit('echo', msg_dom.value);
    msg_dom.value = '';
    msg_dom.focus();
  }
}

// bind dom events
cnn_dom.addEventListener('click', (evt) => {
  if(socket == null){ // first connect
    socket = io.connect('http://localhost:5000/test');
    socket.on('connect', () => {
      cnn_dom.value = 'Disconnect';
      msg_dom.focus();
    });
    socket.on('disconnect', () => {
      cnn_dom.value = 'Connect';
    });
    socket.on('echo', (result) => {
      log('[rcve] ' + result);
    });
  }
  else if(socket.disconnected){ // re-connect
    socket.connect();
  }
  else {
    socket.disconnect();
  }
});
msg_dom.addEventListener('keydown', (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    send_message();
  }
});
document.querySelector('.sub').addEventListener('click', () => {
  send_message();
});
