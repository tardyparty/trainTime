var firebaseConfig = {
    apiKey: "AIzaSyCSGDET0_BTeAodgwRGWqwrVt3h9tMDsag",
    authDomain: "traintime-cd28a.firebaseapp.com",
    databaseURL: "https://traintime-cd28a.firebaseio.com",
    projectId: "traintime-cd28a",
    storageBucket: "",
    messagingSenderId: "1052205768593",
    appId: "1:1052205768593:web:ad9dfdc8d843a600118430"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// variables
const data = firebase.database();

var name = '';
var dest = '';
var time = 0;
var freq = 0;


// time variables
var nextTrain = "";
var away = "";


// add train func
$(document).on("click", "#add-train", function(event){
    event.preventDefault();

    name = $("#name-input").val().trim();
    dest = $("#destination-input").val().trim();
    time = $("#starttime-input").val().trim();
    freq = $("#frequency-input").val().trim();

    // send to firebase
    data.ref().push({
        name: name,
        destination: dest,
        time: time,
        frequency: freq,
    });

    $("#name-input").val('');
    $("#destination-input").val('');
    $("#starttime-input").val('');
    $("#frequency-input").val('');

});

data.ref().on("child_added", function(snapshot){

     var date = snapshot.val().time;
     var each = snapshot.val().frequency;

     var last = moment(date, "hhmm").fromNow();

     away = last % each;

     console.log(each);
     console.log(away);
     console.log(date);
     

     console.log(last);

    $("#traintable").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().destination}</td>
            <td>${snapshot.val().frequency}</td>
            <td>${nextTrain}</td>
            <td>${away}</td>
        </tr>
    `);

});