The API endpoints of this group can be used to manage Synthetic Locations and Synthetic Tests. 
These endpoints are only available for invited customers for the Synthetic Monitoring Technology Preview.

## Synthetic Location Properties:
- **id** Unique identifier of the location resource.
- **label** Friendly name of the location.
- **description**
- **displayLabel**
- **locationType** Indicates if the location is public or private.
- **playbackCapability** The playback capabilities provided by this location resource.
  The playbackCapability object has the following properties: 
  - **syntheticType** Different types of synthetic tests that can be executed at this location. 
    Possible values are HTTPAction, HTTPScript, BrowserScript, WebpageAction, and WebpageScript. 
    The values correspond to the syntheticType parameter available in the createSyntheticTest endpoint.
  - **browserType** Different types of supported Web browser when creating synthetic tests for  WebpageAction and WebpageScript. 
    Currently, only firefox is supported
- **geoPoint** An object includes the longitude, latitude, country name, and city name properties of a location. 
- **popVersion** PoP's version
- **customProperties** An object with name/value pairs to provide additional information of the Synthetic location.
- **createdAt** The location created time, following RFC3339 standard.
- **modifiedAt** The location modified time, following RFC3339 standard.
- **observedAt** The timestamp when PoP requests a Synthetic test, following RFC3339 standard.

## Synthetic Test Properties:
- **id** Unique identifier of the Synthetic test resource.
- **label** The identifier for this Synthetic test resource.
- **description** The description of the Synthetic test.
- **active** Indicates if the Synthetic test is started or not. The default is
  true.
- **applicationId** Unique identifier of the Application Perspective.
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
            - **operation** An operation being used must be one of GET, HEAD, OPTIONS, PATCH, POST, PUT, and DELETE. By default, it is GET.
            - **headers** An object with header/value pairs
                - **header** The header to be sent in operation. It should not contain the terminating ':' character.
                - **value** The value of the header.
            - **body** The body content to send with the operation.
            - **validationString** An expression to be evaluated.
            - **followRedirect** A boolean type, true by default; to allow redirect.
            - **allowInsecure** A boolean type,  true by default; if set to true then allow insecure certificates
              (expired, self-signed, etc).
            - **retries** An integer type from 0 to 10, 0 by default.
              It indicates how many attempts (max 10) will be allowed
              to get a successful connection (not necessarily a successful result).
              Failures like socket hangups, gateway timeouts, and DNS lookup fails cause retires, but 404's 400's, do not.
            - **retryInterval** The time interval between retries in seconds. The default is 1s, max is 10s.
            - **expectStatus** An integer type, by default, the Synthetic passes for any 2XX status code.
              This forces just one status code to cause a pass, including what would normally be a fail, for example, a 404.
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
- **serviceId** Unique identifier of the Service Perspective.
- **tenantId** The id of the tenant that this test instance belongs to.
- **testFrequency** How often the playback for a Synthetic test is scheduled. The unit of the testFrequency parameter is minute.
  The default is every 15 minutes. 