function parseDate1(str) {
	var dateArr = str.split("/");
	var serjDate = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
	return serjDate;
}
function parseDate(str) {
    var parts = str.split("/");
    var dt = new Date(parseInt(parts[2], 10),
            parseInt(parts[1], 10) - 1,
            parseInt(parts[0], 10));
    return dt;
}
function getyesterdaydate() {
    var today = '';
    /*
     * var today = new Date(); var
     * yesterday=today.setDate(today.getDate()-1); console.log(yesterday);
     */
    var todayTimeStamp = new Date(); // Unix timestamp in milliseconds
    var oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
    var diff = todayTimeStamp - oneDayTimeStamp;
    var yesterdayDate = new Date(diff);

    var dd = yesterdayDate.getDate();
    var mm = yesterdayDate.getMonth() + 1; // January is 0!

    var yyyy = yesterdayDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return today = dd + '/' + mm + '/' + yyyy;

}
function getoneweekdate() {

    var today = '';
    // var today = new Date();
    var todayTimeStamp = new Date(); // Unix timestamp in milliseconds
    var oneDayTimeStamp = (1000 * 60 * 60 * 24) * 6; // Milliseconds in a day
    var diff = todayTimeStamp - oneDayTimeStamp;
    var yesterdayDate = new Date(diff);

    var dd = yesterdayDate.getDate();
    var mm = yesterdayDate.getMonth() + 1; // January is 0!

    var yyyy = yesterdayDate.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return today = dd + '/' + mm + '/' + yyyy;

}

function gettodaydate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return today = dd + '/' + mm + '/' + yyyy;

}

function transpose(arr) {
    return Object.keys(arr[0]).map(function (c) {
        return arr.map(function (r) {
            return r[c];
        });
    });
}

Array.prototype.unique = function () {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}
function getPivotArray(dataArray, rowIndex, colIndex, dataIndex) {
    // Code from http://techbrij.com
    var result = {}, ret = [];
    var newCols = [];
    for (var i = 0; i < dataArray.length; i++) {

        if (!result[dataArray[i][rowIndex]]) {
            result[dataArray[i][rowIndex]] = {};
        }
        result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

        // To get column names
        if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
            newCols.push(dataArray[i][colIndex]);
        }
    }

    newCols.sort();
    var item = [];

    // Add Header Row
    item.push('Item');
    item.push.apply(item, newCols);
    ret.push(item);

    // Add content
    for (var key in result) {
        item = [];
        item.push(key);
        for (var i = 0; i < newCols.length; i++) {
            item.push(result[key][newCols[i]] || "-");
        }
        ret.push(item);
    }
    return ret;
}

function getMonthName(day) {
    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    return monthNames[day];
}

function convert(str) {
    var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
}

function convert2(str) {
    var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2),
            hours = ("0" + date.getHours()).slice(-2),
            minutes = ("0" + date.getMinutes()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/") + " " + [hours, minutes].join(":");
}


function getCurrentFiscalYear() {
    //get current date
    var today = new Date();

    //get current month
    var curMonth = today.getMonth();
    var yr;
    var fiscalYr = "";
    if (curMonth >= 3) { //
        var nextYr1 = (today.getFullYear() + 1).toString();
        yr = nextYr1;
        fiscalYr = today.getFullYear().toString() + "-" + nextYr1.charAt(2) + nextYr1.charAt(3);
    } else {
        var nextYr2 = today.getFullYear().toString();
        yr = nextYr2;
        fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2.charAt(2) + nextYr2.charAt(3);
    }
    var finyr = {
        yr: yr,
        finyr: fiscalYr
    };
    return finyr;
}

function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '')
                line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}