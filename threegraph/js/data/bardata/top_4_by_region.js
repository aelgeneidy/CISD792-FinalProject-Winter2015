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
	
    // Replace UNIX new lines
    data = data.replace(/\r\n/g, "\n");

    // Replace MAC new lines
    data = data.replace(/\r/g, "\n");
	
    // Split into rows
    var cRows = data.split("\n");

    // Loop through all rows
	var col = 0;
	var colors = ["4ac725", "0715cd", "d90000", "00bfff"];
	var k = 0;
	var l = 0;
	
    for (var i = 0; i < cRows.length; i++) {
        // Skip empty rows
        if (cRows[i]) {
            // Columns are separated by comma
            var column = cRows[i].split(",");	
			
			if (i == 0) {
				for (var j = 1; j < column.length; j++) {
					/*
					schema.cols.push({ 
						"name" : column[j].toString().replace(/["']/g, ""), 
						"color": colors[j-1]
					});
					*/
					schema.rows.push({ 
						"name" : column[j].toString().replace(/["']/g, ""), 
					});
				}
			}
			else {
				for (var j = 0; j < column.length; j++) {
					if (j == 0) {
						/*
						schema.rows.push({ 
						"name" : column[j].toString().replace(/["']/g, "")
						});
						*/
						schema.cols.push({ 
							"name" : column[j].toString().replace(/["']/g, ""),
							"color": colors[l]
						});
						l = l + 1;
					}
					else {
						//dataValues[k][l] = parseInt(column[j].toString().replace(/["']/g, ""));
						//dataValues[k][l] = column[j];
						dataVals[k] = parseInt(column[j].toString().replace(/["']/g, ""));
						k++;
					}
				
					//dataVals[0] = parseInt(column[1].toString().replace(/["']/g, ""));
				}
			}
        }
    }

	var k = 0;
	for( var i=0; i < schema.cols.length; i++ ){
		dataValues[i] = [];
		for (var j=0; j<schema.rows.length; j++ ){
			dataValues[i][j] = dataVals[k];
			k = k + 1;
		}
	}
	
}

loadCSV("data/awards/combined_top_4_awards.csv");
