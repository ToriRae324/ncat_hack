/*
Sample Response from: GET /dna/intent/api/v1/network-health
{
    "response": {
      "measuredBy": "string",
      "latestMeasuredByEntity": "string",
      "latestHealthScore": "string",
      "monitoredDevices": "string",
      "unMonitoredDevices": "string",
      "healthDistirubution": [
        {
          "category": "string",
          "totalCount": "string",
          "healthScore": "string",
          "goodPercentage": "string",
          "badPercentage": "string",
          "fairPercentage": "string"
        }
      ]
    }
  }
  */


// Post Authentication

// Get network health
// Issues using Intent APIs



var request = require("request");

// var token;

// // Token options
// var optionsToken = {
//     method: 'POST',
//     url: 'https://10.10.20.85/api/system/v1/auth/token',
//     rejectUnauthorized: false,
//     headers:
//         { Authorization: 'Basic YWRtaW46Q2lzY28xMjM0IQ==' }
// };


// Request Token    
function Network() {
    

var token;

// Token options
var optionsToken = {
    method: 'POST',
    url: 'https://10.10.20.85/api/system/v1/auth/token',
    rejectUnauthorized: false,
    headers:
        { Authorization: 'Basic YWRtaW46Q2lzY28xMjM0IQ==' }
};

 request(optionsToken, function (error, response, body) {
    if (error) throw new Error(error);
    var body = JSON.parse(body)
    token = body.Token

    // console.log(token); // Sanity Check

    
    // Device Check options
var optionsDeviceCheck = { 
    method: 'GET',
  url: 'https://10.10.20.85/api/v1/network-device',
  rejectUnauthorized: false,
  headers: 
   {
     'X-Auth-Token': token 
    } 
    };
    
    request(optionsDeviceCheck, function (error, response, body) {
        if (error) throw new Error(error);

        var body = JSON.parse(body)
        var date = Date()


      console.log(date);
      

      body.response.forEach(dev => {
          var status = dev.type + " : " + dev.reachabilityStatus;
          if (dev.reachabilityStatus === "Unreachable") {
              console.log("ERROR!: " + status)
          } else
          console.log(status)
      });

    
    });
});

}

Network();

