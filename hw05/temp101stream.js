#!/usr/bin/env 

// Read two temp sensors and push their data to the cloud
// Bo Pang, CM1222

var i2c     = require('i2c');
var fs      = require('fs');
var request = require('request');
var util    = require('util');

var jason_path = "/var/lib/cloud9/PB/hw05/keys_PB_temp.json";
var keys = JSON.parse(fs.readFileSync(jason_path));
console.log("Using: " + jason_path);
console.log("Title: " + keys.title);
console.log(util.inspect(keys)); 

//Load temp sensors
var bus = 2;
var temp1 = new i2c(0x48, {
    device: '/dev/i2c-2'
});
var temp2 = new i2c(0x49, {
    device: '/dev/i2c-2'
});
var temp1value;
var temp2value;

var urlBase = keys.inputUrl + "/?private_key=" + keys.privateKey 
                + "&temp1=%s&temp2=%s";

//Every time this things is called,
//it will read the data and push it to cloud.
function updateTEMP(){
    temp1.readBytes(0x00, 1, function(err, data) {
        temp1value = data[0];
        temp2.readBytes(0x00, 1, function(err, data) {
            temp2value = data[0];
            updateData();
        });
    });
}

//Data pushing helper
function updateData(){
    console.log("Right Temp: " + temp1value);
    console.log("Left Temp: " + temp2value);
    var url = util.format(urlBase, temp1value, temp2value);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body); 
        } else {
            console.log("error=" + error + " response=" + JSON.stringify(response));
        }
    });
}

//Push once every minute
setInterval(updateTEMP, 60000);