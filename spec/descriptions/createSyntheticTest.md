This API endpoint creates a Synthetic Test.

## A note on testFrequency parameter:
The unit of the testFrequency parameter is minute. 

## Sample script and payload: 
- A sample script to create a simple Ping API test

```json
curl -k -v -X POST \
http://<hostname>/api/synthetics/settings/tests \
-H 'authorization: apiToken valid-api-token' \
-H 'content-type: application/json' \
-d '{
    "label":"Test_SimplePing",
    "description":"this is to test a simple ping API",
    "serviceId":"serviceId001",
    "applicationId":"applicationId001",
    "active":true,
    "testFrequency":1,
    "playbackMode":"Simultaneous",
    "locations":[
        "saas_instana_test"
    ],
    "configuration":{
        "syntheticType":"HTTPAction",
        "url":"https://httpbin.org/post",
        "operation":"POST",
        "headers":{
            "Content-Type":"text/plain"
        },
        "body":"Hello World!",
        "validationString":"Hello World!"
    },
    "customProperties":{
        "Team":"DevTeam",
        "Purpose":"Demo"
    }
  }'
```

- A HTTP Script API test payload example
```json
{
  "label": "Test_APIScript",
  "active": true,
  "testFrequency": 1,
  "playbackMode": "Simultaneous",
  "locations": ["saas_instana_test"],
  "configuration": {
    "syntheticType": "HTTPScript",
    "script": "var assert=require('assert');\n\n\nvar options = {\n    uri: 'https://httpbin.org/get',\n    strictSSL: false,\n    headers: {\n                   'Endpoint-Key': 'uqNTC57Phe72pnnB8JuJmwAr7b09nKSKSz',\n                   'Additional-Header': 'Additional-Header-Data'\n           }\n};\n$http.get(options, function(error, response, body){\n    console.log(\"Sample API - GET, response code: \" + response.statusCode);\n\tassert.ok(response.statusCode==200, \"status should be 200\");\n    //$util.insights.set('Incident', \"test util insights\");\n    var bodyObj = JSON.parse(body);\n    assert.ok(bodyObj.url==\"https://httpbin.org/get\", \"httpbin.org REST API GET URL verify failed\");\n});\n\n\nvar postOptions = {\n    uri: 'https://httpbin.org/post',\n    json: {\n        \"name1\": \"this is the first data\",\n        \"name2\": \"second data\"\n    },\n    strictSSL: false,\n    headers:{\"accept\": \"application/json\"}\n};\n$http.post(postOptions, function (err, response, body) {\n    console.log(\"Sample API - POST, response code: \" + response.statusCode);\n\n\n    assert.equal(body.json.name1, 'this is the first data', 'Expected this is the first data');\n    assert.equal(body.json.name2, 'second data', 'Expected second data');\n  }\n);\n\n\nvar putOptions = {\n    uri: 'https://httpbin.org/put',\n    json: {\n        \"name1\": 'this is the first data',\n        \"name2\": 'second data'\n    },\n    strictSSL: false,\n    headers:{\"accept\": \"application/json\"}\n};\n$http.put(putOptions, function(error,response,body){\n    console.log(\"Sample API - PUT, response code: \" + response.statusCode);\n    assert.ok(response.statusCode==200, \"status should be 200\");\n\n    assert.ok(body.url==\"https://httpbin.org/put\", \"httpbin.org REST API PUT URL verify failed\");\n    assert.ok(body.json.name2==\"second data\", \"httpbin.org REST API PUT URL verify failed\");\n});\n\n\nvar deleteOptions = {\n    uri: 'https://httpbin.org/delete',\n    strictSSL: false,\n    headers:{\"accept\": \"application/json\"}\n};\n$http.delete(deleteOptions, function(error,response,body){\n    console.log(\"Sample API - DELETE, response code: \" + response.statusCode);\n    assert.ok(response.statusCode==200, \"status should be 200\");\n    var bodyObj = JSON.parse(body);\n    assert.ok(bodyObj.url==\"https://httpbin.org/delete\", \"httpbin.org REST API DELETE URL verify failed\");\n});\n\nfunction printInformation() {\n  // to print environment variables\n  console.log(\"Environment Variable TEST_ID: \" + $env.TEST_ID);\n  console.log(\"Environment Variable TEST_NAME: \" + $env.TEST_NAME);\n  console.log(\"Environment Variable LOCATION: \" + $env.LOCATION);\n  console.log(\"Environment Variable TIME_ZONE: \" + $env.TIME_ZONE);\n  //New Relic's $util.insights is a set of tools to set and manipulate events reported from synthetic monitoring.\n  $util.insights.set('Date', new Date());\n  $util.insights.set('Description', 'Test New Relic $util.insights API');\n\n}\nprintInformation();"
  }
}
```