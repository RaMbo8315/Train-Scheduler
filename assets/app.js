var config = {
    apiKey: "AIzaSyDdceN01iWJ9cOMvNYCPmgQ1ViqUcDzfQY",
    authDomain: "project-938a4.firebaseapp.com",
    databaseURL: "https://project-938a4.firebaseio.com",
    projectId: "project-938a4",
    storageBucket: "project-938a4.appspot.com",
    messagingSenderId: "408554082507"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train").val().trim();
    var destinationRole = $("#destination").val().trim();
    var firstTrain = $("#first").val().trim()
    var frequencyTime = $("#frequency").val().trim();

    var newTrain = {
        train: trainName,
        destination: destinationRole,
        first: firstTrain,
        frequency: frequencyTime
    };

    database.ref().push(newTrain);

    $("#train").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");

})

database.ref().limitToLast(20).on("child_added", function (snapshot) {

    var trainSnap = snapshot.val();

    var newRail = trainSnap.train;
    
    var newDestination = trainSnap.destination;
    
    var newFirst = trainSnap.first;
    
    var newFrequency = trainSnap.frequency;
    
    var convertFirstTime = moment(newFirst, 'hh:mm').subtract(1, "years");
    
    var timeDiff = moment().diff(moment(convertFirstTime), "minutes");
    
    var timeRemainder = timeDiff % newFrequency;
    
    var tMinutesTillTrain = newFrequency - timeRemainder;
    
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    var trainTime = moment(nextTrain).format('hh:mm A');
    
    var newRow = `<tr><td>${newRail}</td><td>${newDestination}</td><td>
    
    ${newFrequency}</td><td>${trainTime}</td><td>${tMinutesTillTrain}</td></tr>`;

    $("#train-table > tbody").append(newRow);

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});