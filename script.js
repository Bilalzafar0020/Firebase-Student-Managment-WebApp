// Initialize Firebase
var firebaseConfig = {
    // Your Firebase configuration details
      apiKey: "AIzaSyCsB8WkZBzz0aYfXdAxeO8EemQW90vcURU",
    authDomain: "student-managment-webapp.firebaseapp.com",
    projectId: "student-managment-webapp",
    storageBucket: "student-managment-webapp.appspot.com",
    messagingSenderId: "812500721519",
    appId: "1:812500721519:web:e2442ab1be71818e97129a"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var form = document.getElementById('#form');
  let button = document.getElementById('addstudent')
  var resultTable = document.getElementById('result');
  
  button.addEventListener('click', function(event) {
    event.preventDefault();
  
    var name = document.getElementById('name').value;
    var className = document.getElementById('class').value;
    var id = document.getElementById('id').value;
  
    var database = firebase.database();
    var studentsRef = database.ref('students');
  
    var student = {
      name: name,
      class: className,
      id: id
    };
  
    studentsRef.push(student);
  });
  
  function updateTable(snapshot) {
    resultTable.innerHTML = '';
  
    snapshot.forEach(function(childSnapshot) {
      var student = childSnapshot.val();
  
      var row = document.createElement('tr');
  
      var nameCell = document.createElement('td');
      nameCell.textContent = student.name;
      row.appendChild(nameCell);
  
      var classCell = document.createElement('td');
      classCell.textContent = student.class;
      row.appendChild(classCell);
  
      var idCell = document.createElement('td');
      idCell.textContent = student.id;
      row.appendChild(idCell);
  
      var actionsCell = document.createElement('td');
      actionsCell.textContent = 'Some actions'; // Add your desired actions here
      row.appendChild(actionsCell);
  
      resultTable.appendChild(row);
    });
  }
  
  var studentsRef = firebase.database().ref('students');
  studentsRef.on('value', updateTable);
  














// // Initialize Firebase with your project's configuration
// var firebaseConfig = {
//     // Your Firebase configuration details
//     apiKey: "AIzaSyCsB8WkZBzz0aYfXdAxeO8EemQW90vcURU",
//     authDomain: "student-managment-webapp.firebaseapp.com",
//     projectId: "student-managment-webapp",
//     storageBucket: "student-managment-webapp.appspot.com",
//     messagingSenderId: "812500721519",
//     appId: "1:812500721519:web:e2442ab1be71818e97129a"
//   };
  
//   firebase.initializeApp(firebaseConfig);
//   var db = firebase.firestore();
  
//   // Function to add a student to Firestore
//   function addStudentToFirestore(name, className, id) {
//     db.collection("students")
//       .add({
//         name: name,
//         class: className,
//         id: id
//       })
//       .then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//         // You can perform additional actions here, such as updating the table
//       })
//       .catch(function(error) {
//         console.error("Error adding document: ", error);
//       });
//   }
  
//   // Event listener for form submit
//   var form = document.getElementById("form");
//   form.addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent the default form submission
  
//     // Get the input values
//     var nameInput = document.getElementById("name");
//     var classInput = document.getElementById("class");
//     var idInput = document.getElementById("id");
//     var name = nameInput.value;
//     var className = classInput.value;
//     var id = idInput.value;
  
//     // Add the student to Firestore
//     addStudentToFirestore(name, className, id);
  
//     // Clear the form inputs
//     nameInput.value = "";
//     classInput.value = "";
//     idInput.value = "";
//   });
  
//   // Function to render students from Firestore to the table
//   function renderStudentsTable() {
//     var table = document.getElementById("result");
  
//     // Clear existing table rows
//     while (table.rows.length > 0) {
//       table.deleteRow(0);
//     }
  
//     // Get all students from Firestore
//     db.collection("students")
//       .get()
//       .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//           var row = table.insertRow(-1);
//           var nameCell = row.insertCell(0);
//           var classCell = row.insertCell(1);
//           var idCell = row.insertCell(2);
//           var actionsCell = row.insertCell(3);
  
//           // Populate the table cells with student data
//           nameCell.textContent = doc.data().name;
//           classCell.textContent = doc.data().class;
//           idCell.textContent = doc.data().id;
  
//           // Add action buttons (e.g., Edit, Delete) to the actions cell
//           // Example: Add an Edit button
//           var editButton = document.createElement("button");
//           editButton.textContent = "Edit";
//           actionsCell.appendChild(editButton);
  
//           // Example: Add a Delete button
//           var deleteButton = document.createElement("button");
//           deleteButton.textContent = "Delete";
//           actionsCell.appendChild(deleteButton);
//         });
//       })
//       .catch(function(error) {
//         console.error("Error getting documents: ", error);
//       });
//   }
  
//   // Call the renderStudentsTable function to populate the initial table
//   renderStudentsTable();
  