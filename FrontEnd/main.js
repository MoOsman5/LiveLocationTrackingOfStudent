// Sample data - replace with your actual data
const faculties = {
  faculty1: ["Department 1", "Department 2", "Department 3"],
  faculty2: ["Department A", "Department B", "Department C"],
};

const departments = {
  "Department 1": ["Room 1", "Room 2", "Room 3"],
  "Department 2": ["Room 101", "Room 102", "Room 103"],
  "Department 3": ["Room 201", "Room 202", "Room 203"],
  // Add more departments and rooms as needed
};

// Function to populate departments dropdown based on selected faculty
function populateDepartments() {
  const selectedFaculty = document.getElementById("facultySelect").value;
  const departmentSelect = document.getElementById("departmentSelect");
  departmentSelect.innerHTML = "";
  faculties[selectedFaculty].forEach((department) => {
    const option = document.createElement("option");
    option.text = department;
    departmentSelect.add(option);
  });
  document.getElementById("departmentSection").style.display = "block";
}

// Function to populate rooms dropdown based on selected department
function populateRooms() {
  const selectedDepartment = document.getElementById("departmentSelect").value;
  const roomSelect = document.getElementById("roomSelect");
  roomSelect.innerHTML = "";
  departments[selectedDepartment].forEach((room) => {
    const option = document.createElement("option");
    option.text = room;
    roomSelect.add(option);
  });
  document.getElementById("roomSection").style.display = "block";
  document.getElementById("registerBtn").style.display = "block";
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
  const co = localStorage.getItem("access_token");
  console.log(co);
}

function logout() {
  // Set the expiration date of the token cookie to the past

  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}


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
