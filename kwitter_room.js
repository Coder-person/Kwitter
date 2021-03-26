//YOUR FIRE BASE LINKS

var firebaseConfig = {
  apiKey: "AIzaSyBQgB6VjHcaLKmwYflG0oMdb0Xnf5SRurg",
  authDomain: "kwitter-53dde.firebaseapp.com",
  databaseURL: "https://kwitter-53dde-default-rtdb.firebaseio.com",
  projectId: "kwitter-53dde",
  storageBucket: "kwitter-53dde.appspot.com",
  messagingSenderId: "24419271716",
  appId: "1:24419271716:web:1eae41a60b7ce53dd4c4b1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



user_name = localStorage.getItem("user_name");

document.getElementById("h3user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;
// writing into the database // create Main Folder
  firebase.database().ref("/").child(room_name).update({
    Mini : "testing kwitter"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_message_page.html";
}


function getData() { 
  // on function for reading from database
  // set function for writing
  // The forEach() method calls a function once for each element in an array, in order.
  // ("/") = Root Folder
  // database events : when the value changes = 'value'
// snapshot is an array that hilds the current values of the database
  firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = ""; 
      
      snapshot.forEach(function(childSnapshot) { 
        childKey  = childSnapshot.key; // key represents the key of the snapshot array
       Room_names = childKey; // childkey holds all the roomnames/mainfolders
       // room_names is an array
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' > #"+ Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();



function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_message_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
