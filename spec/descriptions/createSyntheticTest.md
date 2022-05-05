This API endpoint creates a Synthetic Test.

## Parameters:
- **id** The unique identifier for this Synthetic test resource. It is auto generated when the test is created, not an user input.
- **label** The identifier for this Synthetic test resource.
- **description** The description of the Synthetic test.
- **active** Indicates if the Synthetic test is started or not. The default is
  true.
- **applicationId** Unique ID of the Application Perspective.
- **configuration** This is an object which has all configuration properties unique to a
  specific syntheticType. 
  - **syntheticType** The type of Synthetic test. Supported values are HTTPAction, HTTScript, BrowserScript, WebpageAction,
  and WebpageScript. The locations assigned to execute this Synthetic
  test must support this syntheticType, i.e. the location's
  playbackCapabilities property.
  - These are configurations corresponding to the syntheticTypes: HTTPActionConfiguration, HTTPScriptConfiguration,
    BrowserScriptConfiguration, WebpageActionConfiguration, and WebpageScriptConfiguration. Right now, only HTTPActionConfiguration 
    and HTTPScriptConfiguration are supported. 
    - HTTPActionConfiguration has the following properties:
      - **url** The URL is being tested. It is required. 
      - **syntheticType** Its value is HTTPAction. It is required.
      - **operation** An operation being used must be one of GET,PUT,POST,DELETE. By default, it is GET.
      - **headers** An object with header/value pairs 
        - **header** The header to be sent in operation. It should not contain the terminating ':' character.
        - **value** The value of the header.
      - **body** The body content to send with the operation.
    - HTTPScriptConfiguration has the following properties:
      - **script** The Javascript content, it is plain text, not base64 encoded. It is required.
      - **syntheticType** Its value is HTTPScript. It is required. 
- **createdAt** The test created time, following RFC3339 standard.
- **createdBy** The user identifier who created the test resource.
- **customProperties** An object with name/value pairs to provide additional information of the Synthetic test.
- **deleted** Indicates if the Synthetic test is deleted or not. The default value is false.
- **deletedAt** The test deleted time, following RFC3339 standard.
- **locations** It is an array of the PoP location IDs where the Synthetic tests are located.
- **modifiedAt** The test last updated time, following RFC3339 standard.
- **modifiedBy** The user identifier who updated the test resource.
- **playbackMode** Defines how the Synthetic test should be executed across multiple
  PoPs. Possible values are Simultaneous or Staggered. Simultaneous
  Synthetic tests run at all locations simultaneously. Staggered
  Synthetic tests run from a different location at each interval.
  Default is Staggered.
- **serviceId** Unique ID of the Service Perspective.
- **tenantId** The id of the tenant that this test instance belongs to. 
- **testFrequency** How often the playback for a Synthetic test is scheduled. The unit of the testFrequency parameter is minute. 
  The default is every 15 minutes. 

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