The API endpoints of this group can be used to manage Application alert configurations.

## Parameters:

- **id:** ID of the application alert config which needs to be updated.

- **name:** Name for the application alert configuration.

- **description:** Description for the application alert configuration.

- **severity:** The severity of the alert when triggered, which is either `5` (Warning), or `10` (Critical).

- **triggering:** Optional flag to indicate whether also an Incident is triggered or not.

- **applications:** Selection of application, services and endpoints in scope.

  The selection defines a tree of included or excluded sub entities. The defined `inclusive` flag defines whether this node and his child nodes are included (`inclusive: true`) or excluded (`inclusive: false`) by default. Empty selections or unnecessary selections are not allowed. 

  #### Example 1: Select an entire Application Perspective

  To select the entire application with ID `<appId>` including all its services and endpoints, simply provide the following selection object:

  ```json
  "applications": {
      "<appId>": {
          "applicationId": "<appId>"
      }
  }
  ```

  Leaf nodes of the selection tree default to `true` if no `inclusive` value is defined.

  #### Example 2: Specific selection of services and endpoints

  To select not the entire application with ID `<appId>`, but only the entire serivces Service1 with ID `<service1>` and Service2 with ID `<service2>`, with the exception of endpoint `<endpoint2>` of Service2. And in addition, only Endpoint `<endpoint3>` of Service3 with id `<service3>`, then use the following selection:

  ```json
  "applications": {
      "<appId>": {
          "applicationId": "<appId>",
          "inclusive": false,
          "services": {
              "<service1>": {
                  "serviceId": "<service1>"
              },
              "<service2>": {
                  "serviceId": "<service2>",
                  "inclusive": true,
                  "endpoints": {
                      "<endpoint2>": {
                          "endpointId": "<endpoint2>",
                          "inclusive": false
                      }
                  }
              },
              "<service3>": {
                  "serviceId": "<service3>",
                  "inclusive": false,
                  "endpoints": {
                      "<endpoint3>": {
                          "endpointId": "<endpoint3>",
                          "inclusive": true
                      }
                  }
              }
          }
      }
  }
  ``` 

- **boundaryScope:** Boundary scope of the Application Perspective

- **tagFilterExpression:** Boolean expression of tag filters to define the scope of relevant calls.

- **includeInternal:** Optional flag to indicate whether also internal calls are included in the scope or not. The default is `false`.

- **includeSynthetic:** Optional flag to indicate whether also synthetic calls are included in the scope or not. The default is `false`.

- **evaluationType:** The alert evaluation type of the alert configuration. For example, this allows to configure whether calls of the configured scope is aggregated to a single metric that is then considered for alerting (`"PER_AP"`), or whether each service of an Appliction Perspective is is evaluated individually (`"PER_AP_SERVICE"`).

- **granularity:** The evaluation granularity used for detection of violations of the defined threshold. In other words, it defines the size of the tumbling window used.

- **rule:** Indicates the type of rule this alert configuration is about.

- **threshold:** Indicates the type of threshold this alert rule is evaluated on .

- **timeThreshold:** Indicates the type of violation of the defined threshold.

- **alertChannelIds:** List of IDs of alert channels defined in Instana.

## Deprecated Parameters

- **tagFilters:** The list of tag filters. It is replaced by **tagFilterExpression**.

- **applicationId:** Unique ID of the Application Perspective. It is replaced by **applications**.