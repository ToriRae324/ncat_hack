
var http = require("http");
var request = require("request");


const HOST = 'localhost';
const PORT = 7000;



// Twitter package
var Twitter = require('twitter');


// add code to read and set any environment variables with the dotenv package
require("dotenv").config();

// link keys
var keys = require("./keys.js");

var client = new Twitter(keys.twitter);


// -----------------------------------------------------


function networkCheck() {
    

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
          
            console.log(date);
          
    
            body.response.forEach(dev => {
                if (dev.errorDescription !== null) {
                    var status = `Date:  + ${date}\nDevice: ${dev.type}\nError: ${dev.errorDescription}`;
                    errors ++
                    tweetStatus("Alert!\n" + status)
                } else {
                // console.log(status)
                }
            });
          
          var statusStr = `Date: ${date}\nThe Network is Up\nThere are ${errors} error(s).`
    
          // console.log(statusStr);

          tweetStatus(statusStr);
    
        
        });
    });
    
    }

// -----------------------------------------------------


/*(1) Use a twitter account to 'tweet' an hourly network status report.  The tweet should be brief and convey only the key points, for example:

Date/Time: The network is up!  No issue detected

Date/Time: The network is up!  (2) issues detected within the past hour
*/

function tweetStatus(status) {
    client.post('statuses/update', {status: status},  function(error, tweet, response) {
        if(error) throw error;
        console.log(`${tweet.text}`);  // Tweet body.
        // console.log(response);  // Raw response object.
      });;
}

// Hourly Timeout to check status

function hourlyNetworkCheck() {
    networkCheck()
 }
 
 // setInterval(hourlyNetworkCheck, 60 * 60 * 1000); // 1 Hour total

 setInterval(hourlyNetworkCheck, 5 * 60 * 1000); //  Hour total


// -----------------------------------------------------



networkCheck()




// Server Stuff
   const server = http.createServer((req, res) => {
    res.end('Monitoring Network');
  });
  
  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
  });

