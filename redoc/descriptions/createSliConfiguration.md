This endpoint creates the Service Level Indicator Configuration

## Mandatory Parameters:

- **id** A unique identifier for each SLI configuration

- **sliName:** Name for the SLI configuration

- **sliEntity:** Entity of the SLI configuration

### SLI Entity specific parameters

Depending on the chosen `sliType` in the `sliEntity`, there are further required parameters:

#### Application SLI entity

This option can be used to create a Time-Based SLI

- **sliEntity.applicationId:** The Id of the Application Perspective

- **sliEntity.boundaryScope:** Boundary scope of the Application Perspective

- **metricConfiguration.metricName:** The metric name on which to compute the SLI

- **metricConfiguration.metricAggregation:** The aggregation of the metric

- **metricConfiguration.threshold:** Threshold for the metric

#### Availability SLI entity

This opetion can be used to create an Event-Based SLI

- **sliEntity.applicationId:** The Id of the Application Perspective

- **sliEntity.boundaryScope:** Boundary scope of the Application Perspective

## Deprecated Parameters for Availability SLI entity:

- **sliEntity.serviceId:** The ID if the Service in he context of an Application Perspective

- **sliEntity.endpointId:** The ID of an Endpoint belonging to a Service

- **sliEntity.goodEventFilters:** The list of TagFilters to match good events / calls

- **sliEntity.badEventFilters:** The list of TagFilters to match bad events / calls

All of these filters can be included using the list of TagFilterExpressions via **sliEntity.goodEventFilterExpression** and **sliEntity.badEventFilterExpression**.
These parameters will be removed in the upcoming releases.
