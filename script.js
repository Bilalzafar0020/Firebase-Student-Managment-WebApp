// web app's Firebase configuration  
const firebaseConfig = {
    apiKey: "AIzaSyCKu8oeqHdYVB8GCF-DHRREz0ntiNgH25k",
    authDomain: "student-managment-webapp1.firebaseapp.com",
    projectId: "student-managment-webapp1",
    storageBucket: "student-managment-webapp1.appspot.com",
    messagingSenderId: "923621203026",
    appId: "1:923621203026:web:263f8988f92bb823a6d38b"
  };


// Initializing Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const addButton = document.getElementById("addstudent");

// Handling button click event
addButton.addEventListener("click", async () => {
    // Geting input field values
    const nameInput = document.getElementById("name");
    const classInput = document.getElementById("class");
    const idInput = document.getElementById("id");

    // Creating data object from input values
    const data = {
        name: nameInput.value,
        class: classInput.value,
        id: idInput.value
    };

    /*------------------------------------ Adding to database functunality       ----------------------------------------------*/

    try {
        // Adding data to Firestore collection
        await db.collection("User1").add(data);
        console.log("Document added successfully");

        // Clearing input fields after successful submission
        nameInput.value = "";
        classInput.value = "";
        idInput.value = "";
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});



/*------------------------------------ geting back data from database functunality       ----------------------------------------------*/


// Function to retrieve data from Firestore and update table
const retrieveDataAndUpdateTable = async () => {
  const querySnapshot = await db.collection("User1").get();
  const resultTable = document.getElementById("result");

  // Clearing previous content
  resultTable.innerHTML = "";

  let maxWidths = {}; // Object to store the maximum widths of each column

  querySnapshot.forEach((doc) => {
      const rowData = doc.data();

      // Creating table row for each document
      const row = document.createElement("tr");
      // Creating table cells
      const nameCell = document.createElement("td");
      nameCell.textContent = rowData.name;
      const classCell = document.createElement("td");
      classCell.textContent = rowData.class;
      const idCell = document.createElement("td");
      idCell.textContent = rowData.id;
      const actionsCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.style.background = '#23aeb7';
      editButton.style.border = 'none';
      editButton.style.outline = 'none';
      editButton.style.borderRadius = '5px';
      editButton.style.width = '40px';
      editButton.style.height = '30px';
      editButton.style.marginLeft = '20px'
      editButton.style.cursor = 'pointer';
      editButton.style.color = '#f3f3f3ff';
      editButton.classList.add('editable_transform')

editButton.addEventListener('click',function(){
  Swal.fire({
    title: 'Fill inputs to Edit this Student data',
  html:
    '<input id="swal-input1" class="swal2-input" placeholder=" Enter Name " >' +
    '<input id="swal-input2" class="swal2-input" placeholder=" Enter Class ">'+
    '<input id="swal-input3" class="swal2-input" placeholder=" Enter Roll No " type="Number" >',
  focusConfirm: false,
  showCancelButton: true,
  confirmButtonColor: "#2ded27",
  confirmButtonText: "Yes, Edit",
  cancelButtonText: "No, cancel",
  preConfirm: () => {
    return [
      document.getElementById('swal-input1').value,
      document.getElementById('swal-input2').value,
      document.getElementById('swal-input3').value
    ]
  }

  }).then(( result) =>{

    if(result.isConfirmed){
     
      // updating the table td's values according to user input // 

      nameCell.textContent = result.value[0];
      classCell.textContent = result.value[1];
      idCell.textContent = result.value[2];


/*--------------------------- edit user again input in database functionality               ------------------------------------------------*/ 

  let documentId = doc.id; 
  
  db.collection("User1").doc(documentId).update({

    name: result.value[0],
    class: result.value[1],
    id: result.value[2]

})
.then(() => {
   // edit successful popup
   Swal.fire({
    icon: "success",
    title: "Edited",
    confirmButtonText: "OK",
    confirmButtonColor: "#0d86ff",
});
})

.catch(() => {

  // alert('database updating problem' , error)
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "database updating problem",
    footer: "Please Retry !",
    confirmButtonColor: "#0d86ff",
    confirmButtonText: "OK",
});
})


    }   

  })


});


      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.background = '#cc2144';
      deleteButton.style.border = 'none';
      deleteButton.style.outline = 'none';
      deleteButton.style.borderRadius = '05px';
      deleteButton.style.width = '50px';
      deleteButton.style.height = '30px';
      deleteButton.style.marginLeft = '15px'
      deleteButton.style.cursor = 'pointer';
      deleteButton.style.color = '#f3f3f3ff';
      deleteButton.classList.add('delete_transform');

deleteButton.addEventListener('click',function(){
  
    swal.fire({
      title: "Are you sure?",
      text: ("This Student Data will be removed"),
      showCancelButton: true,
      confirmButtonColor: "#e82235",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "No, cancel",
      icon: "warning",
      dangerMode: true,
  })
  .then( (result) =>  {

if(result.isConfirmed){
/*------------------------------------ Delete functunality       ----------------------------------------------*/

let docId = doc.id; // document id which we have to delete (document of firebase )

        db.collection("User1").doc(docId).delete().then(() => {

          let wholeRow = deleteButton.parentNode.parentNode; // deletebutton parent and it's parent
          wholeRow.remove() 
        })

.then( () =>{

  Swal.fire({
    icon: "success",
    title: "Deleted",
    confirmButtonText: "OK",
    confirmButtonColor: "#0d86ff",
});

})

   .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: " Does not delete",
      footer: "Please Retry !",
      confirmButtonColor: "#0d86ff",
      confirmButtonText: "OK",
  });

      });

}

  })

  
 })

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);

      row.appendChild(nameCell);
      row.appendChild(classCell);
      row.appendChild(idCell);
      row.appendChild(actionsCell);

      resultTable.appendChild(row);


   

/*   Chat Gpt solution below this keep the dynamicclay creating th,td width equal to heading */


      // Update the maximum width of each column
      maxWidths["name"] = Math.max(maxWidths["name"] || 0, nameCell.offsetWidth);
      maxWidths["class"] = Math.max(maxWidths["class"] || 0, classCell.offsetWidth);
      maxWidths["id"] = Math.max(maxWidths["id"] || 0, idCell.offsetWidth);
      maxWidths["actions"] = Math.max(maxWidths["actions"] || 0, actionsCell.offsetWidth);
  });

  // Set the width of dynamically created td elements
  const thElements = document.querySelectorAll(".resultinputs th");
  const tdElements = resultTable.querySelectorAll("td");
  
  for (let i = 0; i < tdElements.length; i++) {
      tdElements[i].style.width = thElements[i].offsetWidth + "px";
  }
};

  /*   chatGpt code ended */



  
// Calling the function to retrieve data and update the table
retrieveDataAndUpdateTable();

// Subscribe to real-time updates
db.collection("User1").onSnapshot(() => {
  retrieveDataAndUpdateTable();
});




/*   this is for dynmaicaly add scrollbar using javascript 
Clientwidth here is a DOM elements property which calculate the width of current or present conetnt width
scrollwidth is also a property which calculate the whole width inculading overflow content
window is a browser here 
resize is a event  that trigger when some one resize the browser 
*/

window.addEventListener('DOMContentLoaded', function() {
    let body = document.querySelector('body');
    let mainContent = document.querySelector('main.main');
    
  window.addEventListener('resize', checkOverflow());
   
    function checkOverflow() {
      if (mainContent.clientWidth < mainContent.scrollWidth) {
        body.classList.add('overflow-x-hidden');
      } else {
        body.classList.remove('overflow-x-hidden');
      }
    }
  
    
  });

/* clientWidth: It represents the inner width of an element, excluding padding but including the vertical scrollbar (if any). In other words, it is the visible width of the element's content area.

scrollWidth: It represents the total width of the element's content, including any content that overflows and is not visible within the element's defined width. It includes the content that requires horizontal scrolling.

*/

/*           Here it end                              */


