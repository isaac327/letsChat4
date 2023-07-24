const config = {
    apiKey: "AIzaSyAIhd9xffqrzoAoTLQIkLZWUjjFX8mNuNg",
    authDomain: "kwitter-app-6fc9b.firebaseapp.com",
    databaseURL: "https://kwitter-app-6fc9b-default-rtdb.firebaseio.com",
    projectId: "kwitter-app-6fc9b",
    storageBucket: "kwitter-app-6fc9b.appspot.com",
    messagingSenderId: "279606652228",
    appId: "1:279606652228:web:c85d5cdd2309ea6f71bb11"
  };
  firebase.initializeApp(config);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
       
       console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message = message_data['message'];
       like = message_data['like'];
       name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
       message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
       like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
       span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: "+ like +"</span></button><hr>";

       row = name_with_tag + message_with_tag + like_button + span_with_tag;
       document.getElementById("output").innerHTML += row;
    } });  }); }
getData();

function logout()
    {
          localStorage.removeItem("user_name");
          localStorage.removeItem("room_name");
          window.location="index.html";
    }

function send()
    {
          msg = document.getElementById("msg").value;
          firebase.database().ref(room_name).push({
                name: user_name,
                message: msg,
                like: 0
          });
          document.getElementById("msg").value = "";
    }
