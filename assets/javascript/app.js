// Initialize Firebase
var config = {
apiKey: "AIzaSyB84bUug_7x4sgfG3ZbiEJfv8Adn9S3MkQ",
authDomain: "bootcamp1-404ba.firebaseapp.com",
databaseURL: "https://bootcamp1-404ba.firebaseio.com",
projectId: "bootcamp1-404ba",
storageBucket: "bootcamp1-404ba.appspot.com",
messagingSenderId: "898331528420"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#start-input").val().trim(), "HH:mm").format("hh:mm");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        dest: destination,
        first: firstTrain,
        freq: frequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.first);
    console.log(newTrain.freq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;

    //Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    console.log("Current Time: " + moment().format("hh:mm"))
    console.log("First Train: " + moment(firstTrain, "HH:mm").format("hh:mm"))

    // Convert First Time to Past Date
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    // Calculate Difference Between Current Time and First Train Converted
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

    // Time Remaining
    var timeRemaining = diffTime % frequency;

    // Minutes Until Next Train
    var minutesAway = frequency - timeRemaining;

    // Time of Next Arrival
    var nextArrival = moment().add(minutesAway, "minutes");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(moment(nextArrival).format("hh:mm A")),
        $("<td>").text(minutesAway),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});