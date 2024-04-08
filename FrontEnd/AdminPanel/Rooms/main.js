document.addEventListener("DOMContentLoaded", function() {
  // Fetch rooms data from the server
  fetchRoomsData();
});

function fetchRoomsData() {
  fetch('http://localhost:3000/rooms/allRooms')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the data here
      displayRooms(data.data);
    })
    .catch(error => {
      console.error('Error fetching rooms:', error);
    });
}

function displayRooms(rooms) {
  const roomsContainer = document.getElementById('roomsContainer');

  rooms.forEach(room => {
    // Create room div
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');

    // Add room name
    const roomNameHeading = document.createElement('h2');
    roomNameHeading.textContent = room.roomname;
    roomDiv.appendChild(roomNameHeading);

    // Add department name
    const departmentParagraph = document.createElement('p');
    departmentParagraph.textContent = `Department: ${room.department?.departmentname}`;
    roomDiv.appendChild(departmentParagraph);

    // Add click event listener to navigate to student page
    roomDiv.addEventListener('click', function() {
      navigateToStudentPage(room._id); // Assuming room objects have _id property
    });

    // Append room div to container
    roomsContainer.appendChild(roomDiv);
  });
}

// Function to navigate to student page with room ID as parameter
function navigateToStudentPage(roomId) {
  window.location.href = `student_page.html?room=${roomId}`;
}
