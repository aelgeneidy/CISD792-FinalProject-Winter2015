// ****************************************************************************
// Best Young Players of Countries

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

    for (var i = 1; i < cRows.length; i++) {
        // this line helps to skip empty rows
        if (cRows[i]) {
            // our columns are separated by comma
            var column = cRows[i].split(",");	
			var color = rainBow(cRows.length - 1, i);
			schema.cols.push({ 
					"name" : column[0].toString().replace(/["']/g, ""),
					"color": color
			});
			dataVals[i-1] = parseInt(column[1].toString().replace(/["']/g, ""));
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

function rainBow(numOfRows, step) {
    var red, green, blue;
    var h = step / numOfRows;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch (i % 6) {
        case 0: red = 1, green = f, blue = 0; break;
        case 1: red = q, green = 1, blue = 0; break;
        case 2: red = 0, green = 1, blue = f; break;
        case 3: red = 0, green = q, blue = 1; break;
        case 4: red = f, green = 0, blue = 1; break;
        case 5: red = 1, green = 0, blue = q; break;
    }
    var color = ("00" + (~ ~(red * 255)).toString(16)).slice(-2) + ("00" + (~ ~(green * 255)).toString(16)).slice(-2) + ("00" + (~ ~(blue * 255)).toString(16)).slice(-2);
    return (color);
}

loadCSV("data/awards/best_young_player_countries.csv");