This endpoint creates or updates the Custom Event Specification 

## Mandatory Parameters:

- **eventSpecificationId(Path Parameter):** A unique identifier for each custom event

- **id:** Same as the eventSpecificationId

- **name:** Name for the custom event

- **entityType:** Name of tha available plugins for the selected source

- **rules.ruleType:** Type of the rule being set for the custom event

### Rule-type specific parameters

Depending on the chosen `ruleType`, there are further required parameters:

#### Threshold Rule using a dynamic built-in metric by pattern :

- **rules.conditionOperator:** Conditional operator for the aggregation for the provided time window

- **rules.metricPattern.prefix:** Prefix pattern for the metric

- **rules.metricPattern.matchingOperator:** Operator for matching the metric 

```
curl --request PUT 'https://<HOST>/api/events/settings/event-specifications/custom/09876543225' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "id" :"09876543225", "description":"Event for OpenAPI documentation", "enabled":true,"entityType":"host","expirationTime":"60000","name":"Event for OpenAPI documentation",
"query":<Query>, 
"rules":[{"aggregation":"sum","conditionOperator":">", "conditionValue":0.1, "metricName":null, "metricPattern":{"prefix":"fs", "postfix":"free", "operator":"endsWith", "placeholder":"/xvda1"}, 
"rollup":null, "ruleType":"threshold", "severity":10, "window":30000}], "triggering":false
}'
```
The above example creates a custom event that matches disk devices that end with "/xvda1" for the metric "fs.{device}.free" for any host in scope.

#### Threshold Rule using fixed metric :

- **rules.conditionOperator:** Conditional operator for the aggregation for the provided time window

- **rules.metricName:** Metric name for the event

```
curl --request PUT 'https://<Host>/api/events/settings/event-specifications/custom/09876543226' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "id" :"09876543226", "description":"Event for OpenApi documentation fixed Metric", "enabled":true,"entityType":"host","expirationTime":"60000",
"name":"Event for OpenApi documentation fixed metric","rules":[{"aggregation":"sum","conditionOperator":">", "conditionValue":0.1, "metricName":"fs./dev/xvda1.free", 
"rollup":null, "ruleType":"threshold", "severity":10, "window":30000}], "triggering":false
}'
```

#### System Rule:

- **rules.systemRuleId:** Id of the System Rule being set 

```
curl --request PUT 'https://<Host>/api/events/settings/event-specifications/custom/09876543227' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "id" :"09876543227", "description":"Event for OpenApi documentation System Rule", "enabled":true,"entityType":"any","expirationTime":"60000",
"name":"Event for OpenApi documentation System Rule", "rules":[{"ruleType":"system", "systemRuleId":"entity.offline","severity":10}], "triggering":false
}'
```

#### Entity Verification Rule:

- **rules.matchingType:** Type of the Entity
- **rules.matchingOperator:** Operator for matching the Entity name
- **rules.matchingOperator:** Name Pattern for the Entity

```
curl --request PUT 'https://<Host>/api/events/settings/event-specifications/custom/09876543228' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "id" :"09876543228", "description":"Event for OpenApi Entity Verification Rule", "enabled":true,"entityType":"host","expirationTime":"60000",
"name":"Event for OpenApi Entity Verification Rule",
"rules":[{"matchingEntityLabel":"test", "matchingEntityType":"jvmRuntimePlatform","matchingOperator":"startsWith","offlineDuration":1800000, 
"ruleType":"entity_verification","severity": 5}], "triggering":false
}'
``
