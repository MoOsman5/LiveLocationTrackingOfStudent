
const io = require('socket.io-client');

const socket = io('http://localhost:3000');

// Event handler for successful connection
socket.on('connect', () => {
  console.log('Connected to server');

  // Send a 'location' event to the server with some data
  const locationData = {
    Username: 'sawsan12345',
    latitude: 55.4,
    longitude: 88
  };
  socket.emit('location', locationData);
});

// Event handler for 'locationUpdate' event received from the server
socket.on('locationUpdate', (data) => {
  console.log('Location update received:', data);
});

// Event handler for disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
