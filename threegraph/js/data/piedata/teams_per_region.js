// ****************************************************************************
// Number of teams per region

var schema = {
    cols: [],
	rows: []
};
dataValues = [];
dataVals = [];
function loadCSV(file) {
	var request;
	if (window.XMLHttpRequest) {
	// IE7+, Firefox, Chrome, Opera, Safari
		request = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // load
    request.open('GET', file, false);
    request.send();
    parseCSV(request.responseText);
}

function parseCSV(data) {
    //replace UNIX new lines
    data = data.replace(/\r\n/g, "\n");
    //replace MAC new lines
    data = data.replace(/\r/g, "\n");
    //split into rows
    var cRows = data.split("\n");

    // loop through all rows
	var col = 0;
	var colors = ["4ac725", "0715cd", "d90000", "ff4d00", "00deff", "fbf96d"];
	//["4ac725", "0715cd", "d90000", "E28105"];

    for (var i = 1; i < cRows.length; i++) {
        // this line helps to skip empty rows
        if (cRows[i]) {
            // our columns are separated by comma
            var column = cRows[i].split(",");	
			schema.cols.push({ 
					"name" : column[0].toString().replace(/["']/g, ""),
					"color": colors[col]
			});
			dataVals[i-1] = parseInt(column[1].toString().replace(/["']/g, ""));
			col = col + 1;
        }
    }
	schema.rows.push({ 
		"name" : "Row 1"
	});

	for( var i=0; i < schema.cols.length; i++ ){
		dataValues[i] = [];
		for (var j=0; j < schema.rows.length; j++ ){
			dataValues[i][j] = dataVals[i];			
		}
	}
}

loadCSV("data/teams/teams_per_region.csv");