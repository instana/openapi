This endpoint creates or updates a Custom Event Specification.

## Mandatory Parameters:

- **eventSpecificationId (Path Parameter):** A unique identifier for each custom event

- **name:** Name for the custom event

- **entityType:** Name of tha available plugins for the selected source

- **rules.ruleType:** Type of the rule being set for the custom event

### Rule-type specific parameters

Depending on the chosen `ruleType`, there are further required parameters:

#### Threshold Rule using a dynamic built-in metric by pattern :

- **rules.conditionOperator:** Conditional operator for the aggregation for the provided time window

- **rules.metricPattern.prefix:** Prefix pattern for the metric

- **rules.metricPattern.operator:** Operator for matching the metric

```
curl --request PUT 'https://<Host>/api/events/settings/event-specifications/custom/<EventSpecificationId>' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "description":"Event for OpenAPI documentation", "enabled":true,"entityType":"host","expirationTime":"60000","name":"Event for OpenAPI documentation",
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
curl --request PUT 'https://<Host>/api/events/settings/event-specifications/custom/<EventSpecificationId>' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "description":"Event for OpenAPI documentation fixed Metric", "enabled":true,"entityType":"host","expirationTime":"60000",
"name":"Event for OpenAPI documentation fixed metric","rules":[{"aggregation":"sum","conditionOperator":">", "conditionValue":0.1, "metricName":"fs./dev/xvda1.free", 
"rollup":null, "ruleType":"threshold", "severity":10, "window":30000}], "triggering":false
}'
```

#### System Rule:

- **rules.systemRuleId:** Id of the System Rule being set 

```
curl --request PUT 'https://<Host>/api/events/settings/event-specifications/custom/<EventSpecificationId>' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "description":"Event for OpenAPI documentation System Rule", "enabled":true,"entityType":"any","expirationTime":"60000",
"name":"Event for OpenAPI documentation System Rule", "rules":[{"ruleType":"system", "systemRuleId":"entity.offline","severity":10}], "triggering":false
}'
```

#### Entity Verification Rule:

- **rules.matchingEntityType:** Type of the Entity
- **rules.matchingOperator:** Operator for matching the Entity name
- **rules.matchingEntityLabel:** Name Pattern for the Entity

```
curl --request PUT 'https://<Host>/api/events/settings/event-specifications/custom/<EventSpecificationId>' \
--header 'Authorization: apiToken <Token>' \
--header 'Content-Type: application/json' \
--data-raw '{ "description":"Event for OpenAPI Entity Verification Rule", "enabled":true,"entityType":"host","expirationTime":"60000",
"name":"Event for OpenAPI Entity Verification Rule",
"rules":[{"matchingEntityLabel":"test", "matchingEntityType":"jvmRuntimePlatform","matchingOperator":"startsWith","offlineDuration":1800000, 
"ruleType":"entity_verification","severity": 5}], "triggering":false
}'
```

## Optional Parameters:

- **allowRestore (Query Parameter):** Allows to restore a custom event specification that was previously deleted or migrated when set to `true`. This allows to have idempotent operations that can be useful in _configuration as code_ scenarios. By default, the ID of a deleted configuration cannot be reused anymore to enable links in previous Issues or Incidents to stay valid. 