
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
        var errors = 0

        // var statusStr = `Date: ${date}\nThe Network is Up\nThere are ${errors} error(s).`
      
        console.log(body);
      

        body.response.forEach(dev => {
            if (dev.errorDescription !== null) {
                var status = `Date:  + ${date}\nDevice: ${dev.type}\nError: ${dev.errorDescription}`;
                errors ++
                ("Alert!\n" + status)
            } else {
            // console.log(status)
            }
        });

    //  var statusStr = `Date: ${date}\nThe Network is Up\nThere are ${errors} error(s).`

    //  console.log(statusStr);

    
    });
});

}

Network();