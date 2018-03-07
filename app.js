$(document).ready(function() {

		// get firebase api key
		// config and connect css
	var config = {
		apiKey: // get firebase api key
	};

	firebase.initializeApp(config);
	var database = firebase.database();
	$("#submit").on("click", function(event){
		event.preventDefault();

		
	 	var trainName = $("#trainName").val().trim();
	 	var destination = $("#destination").val().trim();
	 	var firstTrain = $("#firstTrain").val().trim();
	 	var frequency = $("#frequency").val().trim();


	 	var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("years");
    	var currentTime = moment();
    	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm");
	    var diffTime = currentTime.diff(moment(firstTrainConverted), "minutes");
	    var tRemainder = diffTime % frequency;	   
	    var minutesTillTrain = frequency - timeRemainder;	   
	    var nextTrain = currentTime.add(minutesTillTrain, "minutes";
	    nextTrain = moment(nextTrain).format("hh:mm");
	   
 	
	 
	 	database.ref().push({
	 		trainName: trainName,
	 		destination: destination,
	 		firstTrain: firstTrain,
	 		frequency: frequency,
	 		minutesTillTrain: minutesTillTrain,
	 		nextTrain: nextTrain
	 	});


	 	$("#train-name").val(" ");
	 	$("#destination").val(" ");
	 	$("#first-train").val(" ");
	 	$("#frequency").val(" ");

	 });

	database.ref().on("child_added", function (child){

		var child = child.val();
		var row = $("<tr>");
		var trainName = $("<td>" + child.trainName + "</td>");
		var destination = $("<td>" + child.destination + "</td>");
		var frequency = $("<td>every " + child.frequency + " mins</td>");
		var nextArrival = $("<td>" + child.nextTrain + "</td>");


		var minutesAway = $("<td>" + child.minutesTillTrain + " mins away</td>");
		var button = ("<td><button type='button' class='btn btn-default' id='removeTrain'>Remove</button></td>");

		row.append(trainName);
		row.append(destination);
		row.append(frequency);
		row.append(nextArrival);
		row.append(minutesAway);
	

		$("#trainsRow").prepend(row);
		$("#removeTrain").on("click", function() {
			console.log("test");
			row.empty();
		});

	 });

});
