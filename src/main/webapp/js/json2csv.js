function convert(results) {   
    var json=results;
    // Find the largest element
    var largestEntry = 0;
    var header;
    for(var i=0; i<json.length; i++){
        if (!Object.keys) {
            Object.keys = function(obj) {
                var keys = [];
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        keys.push(i);
                    }
                }
                return keys;
            };
        }
        if(Object.keys(json[i]).length > largestEntry){
            largestEntry = Object.keys(json[i]).length;
            header = Object.keys(json[i]);
        }
    };
    // Assemble the header
    var convertedjson = "";
    if (typeof Array.prototype.forEach != 'function') {
        Array.prototype.forEach = function(callback){
          for (var i = 0; i < this.length; i++){
            callback.apply(this, [this[i], i, this]);
          }
        };
    }
    
    header.forEach(function(heading){
        if(convertedjson != "") {
            convertedjson += ",";
        }
        convertedjson += "\"";
        convertedjson += heading
        convertedjson += "\"";
    });
    
    convertedjson += "\r\n";
    // Iterate through the header for all elements
    json.forEach(function(entry){
        header.forEach(function(heading){
            convertedjson += "\"";
            convertedjson += (entry[heading] || "");
            convertedjson += "\"";
            convertedjson += ",";
        });
        convertedjson = convertedjson.substring(0, convertedjson.length - 1);
        convertedjson += "\r\n";
    });    
    return convertedjson;
}

function convertAndExport(results) {
   
    var csv =  convert(results);
    if(csv == '')
        return;
    // Exporting
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");               
    var now = new Date();
    var date = now.getDate();
    var year = now.getFullYear();
    var month = months[now.getMonth()];
    var fileName = "CSV"+year+month+date;
    var uri = 'data:text/csv;charset=utf-8,' + escape(csv);         
    var link = document.createElement("a"); 
    $(link).hide();
    link.href = uri;
    link.download = fileName + ".csv";
    $("body").append(link);
    link.click();
    $("body").remove(link);
}