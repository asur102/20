const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;

    const ws = new WebSocket('ws://localhost:3000');
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = event => {
      console.log('Received message:', event.data);
      // Here, you would handle incoming video streams from other users
    };

    // Send your stream to the server
    ws.send(stream);
  })
  .catch(error => {
    console.error('Error accessing media devices.', error);
  });
