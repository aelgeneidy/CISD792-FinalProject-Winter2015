var schema = {
    cols: [],
	rows: []
};
dataValues = [];
dataVals = [];

var years = [];
var regions = [];

var start = "";
var end = "";

function getRange() {
	
	start = document.getElementById('start-date').value;
	end = document.getElementById('end-date').value;
	
	loadCSV("data/teams/regions_per_tournament.csv");
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRegionValue(year, region, rows) {
	var found = false;
	var value = 0;
	
	for (var k = 1; k < rows.length; k++) {
		var column = rows[k].split(",");
				
		var curr_year = column[0].toString().replace(/["']/g, "");
		var curr_region = column[2].toString().replace(/["']/g, "");
				
		if ( (curr_year == year) && (curr_region == region) ) {
			found = true;
			break;
		}
	}
			
	if (found) {
		value = parseInt(column[3].toString().replace(/["']/g, ""));
	}
	
	return value;
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
	
    // Replace UNIX new lines
    data = data.replace(/\r\n/g, "\n");

    // Replace MAC new lines
    data = data.replace(/\r/g, "\n");
	
    // Split into rows
    var cRows = data.split("\n");
	
	var colors = ["4ac725", "0715cd", "d90000", "c71585", "7fff00", "800000", "00bfff", "ee82ee", "ff7f50", "1e90ff", "006400", "7b68ee", "ffd700", "808080", "4169e1", "00ffff", "800080", "6a5acd", "778899", "b22222"];
	
	// Loop through the rows to construct the years and regions arrays
	var yr_idx = 0;
	var rg_idx = 0;
	for (var i = 1; i < cRows.length; i++) {
		var line = cRows[i].split(",");
		
		var year = line[0].toString().replace(/["']/g, "");
		var region = line[2].toString().replace(/["']/g, "");
		
		if ( (year >= start) && (year <= end) ) {
			
			// Insert year if one was not inserted
			var found = false;
			for (var j = 0; j < years.length; j++) {
				if (years[j] == year) {
					found = true;
					break;
				}
			}
			
			if (!found) {
				years[yr_idx] = year;
				yr_idx++;
			}
			
		}
		
		// Insert region if one was not inserted
		found = false;
		for (var j = 0; j < regions.length; j++) {
			if (regions[j] == region) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			regions[rg_idx] = region;
			rg_idx++;
		}
	}
	
	// Construct the schema	
	for (var j = 0; j < years.length; j++) {
		var color = rainBow(years.length * 2, j);
		schema.cols.push({ 
			"name" : years[j], 
			"color": color
		});	
	}
	
	for (var j = 0; j < regions.length; j++) {
		schema.rows.push({ 
			"name" : regions[j]
		});
	}
		
	// Initialize data array
	for (var m = 0; m < cRows.length - 1; m++) {
		dataValues[m] = [];
	}
	
	// Construct the data 
	for (var yr = 0; yr < years.length; yr++) {
		for (var rg = 0; rg < regions.length; rg++) {
			dataValues[yr][rg] = getRegionValue(years[yr], regions[rg], cRows);
		}
	}	
}

getRange();