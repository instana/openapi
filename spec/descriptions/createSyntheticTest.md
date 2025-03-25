This API endpoint creates a Synthetic Test.

## Optional Parameters:

- **id** Users are allowed to specify their own id for the test. A test id can contain letters, numbers, underscores, colons and hyphens. Maximum length is 128.

## Sample script and payload: 
- A sample script to create an API Simple test

```
curl -k -v -X POST \
https://<Host>/api/synthetics/settings/tests \
-H 'authorization: apiToken <Token>' \
-H 'content-type: application/json' \
-d '{
    "id":"test_id:12134-89",
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