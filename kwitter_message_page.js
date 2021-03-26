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
  room_name = localStorage.getItem("room_name");

  function send(){
      msg = document.getElementById("input_message").value;
      firebase.database().ref(room_name).push({
          Sender:user_name,
          Likes:0,
          Message:msg
      });
      document.getElementById("input_message").innerHTML = "";
  }

  function getData() { 
    firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); 
    if(childKey != "Mini") { firebase_message_id = childKey; 
    // childKey = unique msd id i.e. subfolders 
    message_data = childData; 
    // childData = all 3 key-value pairs
    console.log(firebase_message_id);
    console.log(message_data);
    User = message_data['Sender'];
    Likes = message_data['Likes'];
    Message = message_data['Message'];

    name_with_tag = "<h4>"+user_name+"<img class='user_tick' src='tick.png'></h4>";
    message_displayed = "<h4 class='message_h4'>"+msg+"</h4>";
    like_button = "<button id="+firebase_message_id+" value="+Likes+" class='btn btn-warning' onclick='updateLikes(this.id)'>";
    span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+Likes+"</span></button><hr>";

    row = name_with_tag + message_displayed + like_button + span_tag;
    document.getElementById("output").innerHTML += row;
} }); }); } 

getData();

function updateLikes(firebase_message_id){
    console.log("Like button has been pressed; "+firebase_message_id);
    likes = document.getElementById(firebase_message_id).value;
    update_like = Number(likes) + 1;
    console.log(update_like);
    firebase.database().ref(room_name).child(firebase_message_id).update({
        Likes: update_like
    });
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}