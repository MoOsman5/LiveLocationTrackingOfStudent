// Sample data - replace with your actual data
let faculties = [];
let departments = {};
let facultyId = null;

// Fetch faculty data from the server
fetch('http://localhost:3000/faculty/allfaculties')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    faculties = data.data; // Assign fetched data to faculties
    
    // Populate the faculties dropdown
    const facultySelect = document.getElementById("facultySelect");
    facultySelect.innerHTML = ""; // Clear existing options
    
    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Faculty";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    facultySelect.appendChild(defaultOption);
    
    // Add options for each faculty
    faculties.forEach((faculty, index) => {
      const option = document.createElement("option");
      option.value = faculty._id;
      option.textContent = `${faculty.name}`;
      facultySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching faculty data:', error);
  });

// Event listener for the faculty select dropdown
const facultySelect = document.getElementById("facultySelect");
facultySelect.addEventListener('change', function() {
  facultyId = this.value; // Update facultyId when a faculty is selected
  
  // Fetch departments based on the selected faculty ID
  fetch(`http://localhost:3000/department/getByFacultyId/${facultyId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the data here
      console.log('Departments:', data);
      departments = data.data;
      // Assuming the response data is an array of department objects
      // You can populate the departments dropdown here
      const departmentSelect = document.getElementById("departmentSelect");
      departmentSelect.innerHTML = ""; // Clear existing options
      
      // Add default option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select Department";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      departmentSelect.appendChild(defaultOption);
      
      // Add options for each department
      departments.forEach((department, index) => {
        const option = document.createElement("option");
        option.value = department._id; // Assuming department objects have _id property
        option.textContent = department.departmentname; // Assuming department objects have departmentname property
        departmentSelect.appendChild(option);
      });
      
      // Show the department section after departments are fetched
      document.getElementById("departmentSection").style.display = "block";
    })
    .catch(error => {
      console.error('Error fetching departments:', error);
    });
});

function populateRooms(rooms) {
  const roomSection = document.getElementById("roomSection");
  roomSection.innerHTML = ""; // Clear existing options
  
  // Add room elements for each room
  rooms.forEach(room => {
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room");
    
    const roomNameDiv = document.createElement("div");
    roomNameDiv.textContent = room.roomname; // Assuming room objects have roomName property
    roomDiv.appendChild(roomNameDiv);
    
    const enrollBtn = document.createElement("div");
    enrollBtn.classList.add("e-btn");
    enrollBtn.textContent = "Enroll";
    enrollBtn.onclick = function() {
      enrollRoom(room._id); // Assuming room objects have _id property
    };
    roomDiv.appendChild(enrollBtn);
    
    roomSection.appendChild(roomDiv);
  });
  
  // Show the room section after rooms are fetched
  roomSection.style.display = "flex";
  document.getElementById("registerBtn").style.display = "block";
}

// Event listener for the department select dropdown
const departmentSelect = document.getElementById("departmentSelect");
departmentSelect.addEventListener('change', function() {
  const selectedDepartmentId = this.value; // Get the selected department ID
  
  // Fetch rooms based on the selected department ID
  fetch(`http://localhost:3000/rooms/getByDepartmentId/${selectedDepartmentId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Process the data here
      console.log('Rooms:', data.data);
      const rooms = data.data;
      populateRooms(rooms); // Populate rooms with enroll buttons
    })
    .catch(error => {
      console.error('Error fetching rooms:', error);
    });
});

  // Function to handle room enrollment
  function enrollRoom(roomId) {
    // Implement your logic to enroll in the selected room using the roomId
    console.log("Enrolling in room:", roomId);
  }

// Event listeners
// You can add event listener for the register button to perform registration logic

function enrollRoom(btn) {
  // Change background color to green
  btn.style.backgroundColor = "green";
  // Change button text to 'Enrolled'
  btn.textContent = "Enrolled";
  // Disable button after enrollment
  btn.disabled = true;
  const co = document.cookie;
  console.log(co);
}

function logout() {
  // Set the expiration date of the token cookie to the past

  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Function to get the user ID from the JWT token stored in the cookie
function getUserIdFromCookie() {
  // Get the user_id from the cookie
  const cookie = getCookie('user_id');
  
  if (!cookie) {
    // If cookie is not found, return null
    return null;
  }
  
  return cookie;
}


// Function to get cookie value by name
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Example usage
const userId = getUserIdFromCookie();
console.log('User ID:', userId);

//registration

//  catch element
let nameField = document.getElementById("name-feild");
let title = document.getElementById("title");
let signUp = document.getElementById("signUp");
let logIn = document.getElementById("logIn");
let role = document.getElementById("role");
let formFeild = document.getElementById("form-box");
let lostPass = document.getElementById("lost-pass");

// change style of register and signin
