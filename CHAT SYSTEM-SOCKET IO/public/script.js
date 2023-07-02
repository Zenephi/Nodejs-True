const socket = io();

    function joinRoom() {
      const room = document.getElementById('room').value;
      const name = document.getElementById('name').value

      

      myname.textContent = name;
      myroom.textContent = room;


      socket.emit('join', room, name,myname);
      document.getElementById('room-form').style.display = 'none';
      document.getElementById('chat-form').style.display = 'block';

      
    }

    function sendMessage() {
      const message = document.getElementById('message').value;
      socket.emit('message', message);
      document.getElementById('message').value = '';
    }

    function scrollToBottom() {
      const chatMessages = document.getElementById('message-box');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    socket.on('message', (message) => {
      const messageElement = document.createElement('li');
      messageElement.textContent = message;
       

      const sender = message.split(': ')[0].trim();
      const currentName = myname.textContent;

      if (sender === currentName) {
        messageElement.classList.add('sent-message');
      } else {
         messageElement.classList.add('received-message');
      }


      document.getElementById('messages').appendChild(messageElement);
      scrollToBottom();
    });

    socket.on('onlineCount', (count) => {
      document.getElementById('online-count').textContent = count;
    });



    // socket.on('message', (data) => {
    //   const { sender, message } = data;

    //   const messageElement = document.createElement('li');
    //   messageElement.textContent = message;

    //   if (sender === 'You') {
    //     messageElement.classList.add('own-message'); /* Added class to align own messages */
    //   } else {
    //     messageElement.classList.add('other-message'); /* Added class to align other messages */
    //   }

    //   document.getElementById('messages').appendChild(messageElement);
    //   scrollToBottom();}


    // socket.on('message', (data) => {
    //   const { sender, message } = data;

    //   const messageElement = document.createElement('li');
    //   messageElement.textContent = message;

    //   if (sender === 'You') {
    //     messageElement.classList.add('own-message');
    //   } else {
    //     messageElement.classList.add('other-message');
    //   }

    //   document.getElementById('messages').appendChild(messageElement);
    //   scrollToBottom(); // Scroll to the bottom
    // });

   