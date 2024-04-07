// Sample data - replace with your actual data
let faculties = [];
let departments = {};
let facultyId = null;

// Fetch faculty data from the server
fetch("http://localhost:3000/faculty/allfaculties")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
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
  .catch((error) => {
    console.error("Error fetching faculty data:", error);
  });

// Event listener for the faculty select dropdown
const facultySelect = document.getElementById("facultySelect");
facultySelect.addEventListener("change", function () {
  facultyId = this.value; // Update facultyId when a faculty is selected

  // Fetch departments based on the selected faculty ID
  fetch(`http://localhost:3000/department/getByFacultyId/${facultyId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Process the data here
      console.log("Departments:", data);
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
    .catch((error) => {
      console.error("Error fetching departments:", error);
    });
});

// Function to populate rooms with enroll buttons based on selected department
function populateRooms(rooms) {
  const roomSection = document.getElementById("roomSection");
  roomSection.innerHTML = ""; // Clear existing options
  
  // Add room elements for each room
  rooms.forEach(room => {
    const roomDiv = document.createElement("div");
    roomDiv.classList.add("room");
    roomDiv.id = `room-${room._id}`; // Assign CSS ID with room ID
    
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
}


// Event listener for the department select dropdown
const departmentSelect = document.getElementById("departmentSelect");
departmentSelect.addEventListener("change", function () {
  const selectedDepartmentId = this.value; // Get the selected department ID

  // Fetch rooms based on the selected department ID
  fetch(`http://localhost:3000/rooms/getByDepartmentId/${selectedDepartmentId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Process the data here
      console.log("Rooms:", data.data);
      const rooms = data.data;
      populateRooms(rooms); // Populate rooms with enroll buttons
    })
    .catch((error) => {
      console.error("Error fetching rooms:", error);
    });
});

// Function to handle room enrollment
function enrollRoom(roomId) {
  // Make a POST request to enroll in the selected room
  const enrolledRoom = document.getElementById(`room-${roomId}`);
  const enrollBtn = enrolledRoom.querySelector(".e-btn"); // Find the e-btn element within the room div
  const userid = getUserIdFromCookie();
  
  // Check if the button is already enrolled
  if (enrollBtn.style.backgroundColor === "red") {
    // Make a request to leave the room
    fetch(`http://localhost:3000/rooms/LeaveFromRoom/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        students: userid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You left From Room Successfully") {
          enrollBtn.style.backgroundColor = ""; // Reset background color
          enrollBtn.textContent = "Enroll"; // Change button text back to "Enroll"
        } else {
          console.error("Error leaving room:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error leaving room:", error);
      });
  } else {
    // If the button is not enrolled, enroll in the room
    fetch(`http://localhost:3000/rooms/enrollToRoom/${roomId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        students: userid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Student Enrolled Successfully") {
          enrollBtn.style.backgroundColor = "red";
          enrollBtn.textContent = "Leave Room";
        } else {
          console.error("Error enrolling in room:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error enrolling in room:", error);
      });
  }
}


function logout() {
  // Set the expiration date of the token cookie to the past

  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to get the user ID from the JWT token stored in the cookie
function getUserIdFromCookie() {
  // Get the user_id from the cookie
  const cookie = getCookie("user_id");

  if (!cookie) {
    // If cookie is not found, return null
    return null;
  }

  return cookie;
}

// Function to get cookie value by name
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Example usage
const userId = getUserIdFromCookie();
console.log("User ID:", userId);

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
