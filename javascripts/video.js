var request = require('request');
var APIkey = '01f7e88a41e54f8d8c4860fbb1835317'; 
var videoName = "Big Buck Bunny"; 
var videoURL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"; 
var videoDesc = "Submitted via POST request to REST API";
// This uploadOptions object will be submitted in the request. Effectively, it represents the HTTP request header. 
var uploadOptions = { 
            url: "https://videobreakdown.azure-api.net/Breakdowns/Api/Partner/Breakdowns?name=" + videoName + "&privacy=public&videoURL=" + videoURL + "&description=" + videoDesc, 
            headers: { 
                "Content-Type": "multipart/form-data", 
                "Ocp-Apim-Subscription-Key": APIkey 
            }, 
            method: "POST"
        }; 
var id;     // Global, will eventually be set to a value like 28d53fb324

function VideoIndexerUploadCallback(error, response, body) {
            if (!error && response.statusCode < 400) {
                id = JSON.parse(body);
                console.log(id);
            }
        }
console.log(request(uploadOptions, VideoIndexerUploadCallback));
var progressOptions = {
                    url: "https://videobreakdown.azure-api.net/Breakdowns/Api/Partner/Breakdowns/" + id + "/State",
                    headers: {
                        "Ocp-Apim-Subscription-Key": APIkey
                    },
                    method: "GET"
                };
function VideoIndexerProgressCallback(error, response, body) {
            if (!error && response.statusCode < 400) {
                var vi = JSON.parse(body);
                console.log(vi);

                var context = {};

                context.id = id;
                context.state = vi.state;
                context.progress = vi.progress;

                res.render('upload', context);  // This call might build a templated page displaying the values.
            }
        }
request(progressOptions, VideoIndexerProgressCallback);
