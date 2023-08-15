The API endpoints of this group can be used to manage Synthetic Locations and Synthetic Tests. 

## Synthetic Location Properties:
- **id** Unique identifier of the location resource.
- **label** Friendly name of the location.
- **description** The description of the location.
- **locationType** Indicates if the location is public or private.
- **playbackCapability** The playback capabilities provided by this location resource.
  The playbackCapability object has the following properties: 
  - **syntheticType** Different types of synthetic tests that can be executed at this location. 
    Possible values are HTTPAction, HTTPScript, BrowserScript, WebpageAction, WebpageScript, and DNSAction. 
    The values are corresponding to the syntheticType parameter available in the createSyntheticTest endpoint.
  - **browserType** Different types of supported Web browsers when creating synthetic tests for  WebpageAction and WebpageScript. 
    Currently, only firefox is supported
- **geoPoint** An object includes the longitude, latitude, country name, and city name properties of a location. 
- **popVersion** PoP's version
- **customProperties** An object with name/value pairs to provide additional information of the Synthetic location.
- **createdAt** The location created time, following RFC3339 standard.
- **modifiedAt** The location modified time, following RFC3339 standard.
- **observedAt** The timestamp when PoP requests a Synthetic test, following RFC3339 standard.

## Synthetic Test Properties:
- **id** Unique identifier of the Synthetic test resource.
- **label** Friendly name of the Synthetic test resource.
- **description** The description of the Synthetic test.
- **active** Indicates if the Synthetic test is started or not. The default is true.
- **applicationId** Unique identifier of the Application Perspective.
- **configuration** An object which has two properties: syntheticType and the corresponding configuration object:
    - **syntheticType** The type of the Synthetic test. Supported values are HTTPAction, HTTScript, BrowserScript (Beta), WebpageAction (Beta),
      WebpageScript (Beta), and DNSAction. The locations assigned to execute this Synthetic
      test must support this syntheticType, i.e. the location's playbackCapabilities property.
    - **markSyntheticCall** Flag used to control if HTTP calls will be marked as synthetic calls/endpoints in Instana backend, so they can be ignored when calculating service and application KPIs, users can also check "Hide Synthetic Calls" checkbox to hide/show them in UI.
    - **retries** An integer type from 0 to 2, 0 by default.
      It indicates how many attempts (max 2) will be allowed
      to get a successful connection (not necessarily a successful result).
      Failures like socket hangups, gateway timeouts, and DNS lookup fails cause retires, but 404's 400's, do not.
    - **retryInterval** The time interval between retries in seconds. The default is 1s, max is 10s.
    - **timeout** The timeout to be used by the PoP playback engines running the test. Values in integer followed by time unit (ms, s, m). If timeout is not provided the playback engine will use its own timeout value. The default timeout is **1m** in PoP playback engines for HTTPAction and HTTPScript tests if user does not specify it. If user defined timeout value exceeds the `maxTimeout` configured in PoP deployment or `testFrequency` in test configuration, the timeout value does not take effect and PoP playback engines use the smaller one of `maxTimeout` and `testFrequency` as the actual timeout value.
    - **XXXConfiguration** The configuration corresponding to the syntheticType. Configuration types are HTTPActionConfiguration, HTTPScriptConfiguration,
      BrowserScriptConfiguration (Beta), WebpageActionConfiguration (Beta), WebpageScriptConfiguration (Beta), and DNSActionConfiguration. 
        - **HTTPActionConfiguration** has the following properties:
            - **url** The URL is being tested. It is required.
            - **syntheticType** Its value is HTTPAction. It is required.
            - **operation** An operation being used must be one of GET, HEAD, OPTIONS, PATCH, POST, PUT, and DELETE. By default, it is GET.
            - **headers** An object with header/value pairs
                - **header** The header to be sent in operation. It should not contain the terminating ':' character.
                - **value** The value of the header.
            - **body** The body content to send with the operation.
            - **validationString** An expression to be evaluated.
            - **followRedirect** A boolean type, true by default; to allow redirect.
            - **allowInsecure** A boolean type,  true by default; if set to true then allow insecure certificates
              (expired, self-signed, etc).
            - **expectStatus** An integer type, by default, the Synthetic passes for any 2XX status code.
              This forces just one status code to cause a pass, including what would normally be a fail, for example, a 404.
            - **expectJson** An optional object to be used to check against the test response object.
            - **expectMatch** An optional regular expression string to be used to check the test response.
            - **expectExists** An optional list of property labels used to check if they are present in the test response object.
            - **expectNotEmpty** An optional list of property labels used to check if they are present in the test response object with a non-empty value.
        - **HTTPScriptConfiguration** has the following properties:
          - **script** The Javascript content, it is plain text, not base64 encoded. **script** and **scripts** are mutually exclusive.
          - **scripts** Multi script package. **script** and **scripts** are mutually exclusive.
              - **scriptFile** The name of the file to run
              - **bundle** All required js files bundled up into a single zip file with base64 encoded
          - **syntheticType** Its value is HTTPScript. It is required.
          - The API Script Guide, including examples, can be found at: https://www.ibm.com/docs/en/instana-observability/current?topic=monitoring-using-api-scripts
        - **BrowserScriptConfiguration** has the following properties:
          - **script** A Node.js based test script, it is plain text, not base64 encoded. **script** and **scripts** are mutually exclusive.
          - **scripts** Multi script package. **script** and **scripts** are mutually exclusive.
              - **scriptFile** The name of the file to run
              - **bundle** All required js files bundled up into a single zip file with base64 encoded
          - **scriptType** The type of the script, right now, only Basic type is supported. 
          - **browser** The type of the browser: chrome or firefox.
          - **recordVideo** A boolean type, false by default.
          - **syntheticType** Its value is BrowserScript. It is required.
        - **WebpageActionConfiguration** has the following properties:
          - **url** The URL of the Web page being tested. It is required.
          - **browser** The type of the browser: chrome or firefox.
          - **recordVideo** A boolean type, false by default.
          - **syntheticType** Its value is WebpageAction. It is required.
        - **WebpageScriptConfiguration** has the following properties:
          - **script** A Selenium IDE recording script. 
          - **browser** The type of the browser: chrome or firefox.
          - **recordVideo** A boolean type, false by default.
          - **syntheticType** Its value is WebpageScript. It is required.
- **createdAt** The test created time, following RFC3339 standard.
- **createdBy** The user identifier who created the test resource.
- **customProperties** An object with name/value pairs to provide additional information of the Synthetic test.
- **locations** It is an array of the PoP location IDs where the Synthetic tests are located.
- **modifiedAt** The test last updated time, following RFC3339 standard.
- **modifiedBy** The user identifier who updated the test resource.
- **playbackMode** Defines how the Synthetic test should be executed across multiple
  PoPs. This property is optional, and its default value is Simultaneous, and only Simultaneous is supported, i.e.,
  Synthetic tests run at all locations simultaneously. 
- **testFrequency** How often the playback for a Synthetic test is scheduled. The unit of the testFrequency parameter is minute.
  The default is every 15 minutes. The range is from 1 minute to 120 minutes.
