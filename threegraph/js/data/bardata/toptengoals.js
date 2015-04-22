var schema = {
    cols: [],
	rows: []
};
dataValues = [];
dataVals = [];

var years = [];
var countrys = [];
var start = "";
var end = "";

function getRange() {
     
     start = document.getElementById('start-date').value;
     end = document.getElementById('end-date').value;
	 loadCSV("data/toptenresults/toptengoals.csv");
}

function getCountryValue(year, country, rows) {
	var found = false;
	var value = 0;
	
	for (var k = 1; k < rows.length; k++) {
		var column = rows[k].split(",");
				
		var curr_year = column[2].toString().replace(/["']/g, "");
		var curr_country = column[1].toString().replace(/["']/g, "");
				
		if ( (curr_year == year) && (curr_country == country) ) {
			found = true;
			break;
		}
	}
			
	if (found) {
		value = parseInt(column[3].toString().replace(/["']/g, ""));
	}
	
	return value;
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
     
     // Loop through the rows to construct the years and countrys arrays
     var yr_idx = 0;
     var ct_idx = 0;
     for (var i = 1; i < cRows.length; i++) {
           var line = cRows[i].split(",");
           
           var year = line[2].toString().replace(/["']/g, "");
           var countryCon = line[0].toString().replace(/["']/g, "") + ". " + line[1].toString().replace(/["']/g, "");
           var country = line[1].toString().replace(/["']/g, "");
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
           
           // Insert country if one was not inserted
           found = false;
           for (var j = 0; j < countrys.length; j++) {
                if (countrys[j] == country) {
                     found = true;
                     break;
                }
           }
           
           if (!found) {
                countrys[ct_idx] = country;
                ct_idx++;
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
     
     for (var j = 0; j < countrys.length; j++) {
           schema.rows.push({ 
                "name" : countrys[j]
           });
     }
           
     // Initialize data array
     for (var m = 0; m < cRows.length - 1; m++) {
           dataValues[m] = [];
     }
     
     // Construct the data 
     for (var yr = 0; yr < years.length; yr++) {
           for (var ct = 0; ct < countrys.length; ct++) {
                dataValues[yr][ct] = getCountryValue(years[yr], countrys[ct], cRows);
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

getRange();