This API endpoint creates a Synthetic Test.

## A note on testFrequency parameter:
The unit of the testFrequency parameter is minute. 

## Sample script and payload: 
- A sample script to create a simple Ping API test

```
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