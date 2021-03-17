
//ADD YOUR FIREBASE LINKS HERE

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
document.getElementById("h3User").innerHTML = "Welcome "+user_name+"!";
function addRoom(){
      room_name = document.getElementById("enter_room_name").value;
      //Creating Main/Room folder
      firebase.database().ref("/").child(room_name).update({Room: "creating a chat room"});
      localStorage.setItem("room_namekey" , room_name);
      window.location = "kwitter_message_page.html";
}



function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room_names - "+Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectRoomNames(this.id)'> #"+Room_names+"</div><hr>"
      });});}
      document.getElementById("output").innerHTML += row;

getData();


function redirectRoomNames(name){
      console.log(name);
      localStorage.setItem("room_name" , name);
      window.location = "kwitter_message_page.html";
};

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_namekey");
      window.location = "index.html";
}