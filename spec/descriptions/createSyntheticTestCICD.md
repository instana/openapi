This API endpoint creates an OnDemand Execution of Synthetic Tests to be used on CI/CD Integrations.

## Mandatory Parameters:

- **testId** The id of the test to be executed upon request.
- **customization.locations** The ids of the locations where the test needs to be executed.
- 
## Optional Parameters:

- **customization.configuration** An configuration object with properties timeout, retries and retryInterval, used to override the test defined configuration. 
- **customization.customProperties** An object with name/value pairs to provide additional information to this Synthetic Test CI/CD execution.
- 
## Sample script and payload: 
- A sample script to create a Synthetic Test CI/CD

```
curl -k -v -X POST \
https://<Host>/api/synthetics/settings/tests/ci-cd \
-H 'authorization: apiToken <Token>' \
-H 'content-type: application/json' \
-d '[
  {
    "testId":"pdVai8bqov1ta9Wq0Fnw", 
    "customization":{
      "locations":[
        "DNCYizgM3cju2Xnap24Z"
      ], 
      "configuration":{
        "timeout":"5s", 
        "retryInterval":1,
        "retries":2
      }, 
      "customProperties" : {
        "type":"Build"
      }
    }
  }
]'
```