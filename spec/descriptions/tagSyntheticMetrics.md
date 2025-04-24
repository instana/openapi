The endpoints of this group retrieve metrics for Synthetic test results.
### Mandatory Parameters

**metrics** A list of metric objects that define which metric should be returned, with the defined aggregation. Each metrics objects consists of minimum two items:
1. *metric* select a particular metric. This is the list of available metrics for all types of Synthetic Tests:
   synthetic.metricsResponseTime (ms), synthetic.metricsResponseSize (bytes), synthetic.metricsStatusCode (an integer represents an HTTP response code, e.g., 200, 401, 500), synthetic.metricsRequestSize (bytes),
   synthetic.metricsUploadSpeed (bytes per second), synthetic.metricsDownloadSpeed (bytes per second),
   synthetic.metricsRedirectTime (ms), synthetic.metricsRedirectCount, synthetic.metricsConnectCount, synthetic.metricsStatus (an integer, 1-success or 0-failure), synthetic.successRate, and synthetic.tags (list of custom properties and values).

   The following metrics are only available for the HTTPAction type Synthetic Tests: synthetic.metricsBlocking (bytes), synthetic.metricsDns (bytes), synthetic.metricsConnect (bytes), synthetic.metricsSsl (bytes),
   synthetic.metricsSending (bytes), synthetic.metricsWaiting (bytes), and synthetic.metricsReceiving (bytes).

   The metric synthetic.customMetrics (list of custom metrics and values) is only available for SSLCertificate and DNS tests.  For SSLCertificate, the custom metrics are returned as metrics.  For DNS, the custom metrics are returned in the *ismDetails* field.

   The metric synthetic.tags adds the latest list of custom properties to the response.

2. *aggregation* Depending on the selected metric, different aggregations are available e.g., SUM, MEAN, P90 (90th percentile), DISTINCT_COUNT, and MAX.  MAX is only allowed for synthetic.tags. Metric synthetic.successRate only accepts MEAN (SUM is deprecated).

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```
The timeFrame might be adjusted to fit the metric granularity so that there is no partial bucket. For example, if the query timeFrame is 08:02 - 09:02 and the metric granularity is 5 minutes, the timeFrame will be adjusted to 08:05 - 09:00. The adjusted timeFrame will be returned in the response payload. If the query does not have any metric with granularity, a default granularity will be used for adjustment. 

If **groups** includes a groupbyTag that is an array, such as synthetic.tags, the maximum windowSize is *3600000* (1 hour).

### Optional Parameters

**metrics** By default you will get an aggregated metric for the selected timeframe

* *granularity*
  * If it is not set you will get an aggregated value for the selected timeframe
  * If the granularity is set you will get data points with the specified granularity **in seconds**
  * The granularity should not be greater than the `windowSize` (important: `windowSize` is expressed in **milliseconds**)
  * The granularity should not be set too small relative to the `windowSize` to avoid creating an excessively large number of data points (max 600)
  * The granularity values are the same for all metrics

**pagination** if you use pagination, fix the timeFrame for the retrieved metrics
1. *page* select the page number you want to retrieve
2. *pageSize* set the number of Synthetic test results you want to return with one query

**groups** You can group test results by one or more tags.
1. *groupbyTag* use the metric or tag name, e.g. "synthetic.applicationId", to group by its value
2. *groupbyTagSecondLevelTag* is optional.  It is used to further qualify values when the *groupbyTag* is an array of key/value pairs, such as "synthetic.tags".
3. *groupbyTagEntity* is ignored and therefore does not need to be specified.

If *groups* is not specified, the default grouping is *synthetic.testId*.

An example of grouping by the custom property "region":
```
  "groups": [
    {
      "groupbyTag": "synthetic.tags",
      "groupbyTagSecondLevelTag": "region"
    }
  ]
```

**includeAggregatedTestIds** Optionally used when not grouping by testId.  Specifying *true* will return a list of tests that were included in the aggregated result for each row returned.

**tagFilterExpression** It serves as a filter to narrow down return results. Its type can be either EXPRESSION or TAG_FILTER with
logical operators "AND" or "OR".

A tagFilterExpression can specify a custom property by its key and value.
```
  "tagFilterExpression": {
    "type": "EXPRESSION",
    "logicalOperator": "AND",
    "elements": [
      {
        "name": "synthetic.tags",
        "key": "region",
        "value": "Denver",
        "operator": "EQUALS"
      },
      {
        "name": "synthetic.locationId",
        "operator": "EQUALS",
        "stringValue": "abcdefgXSJmQsehOWg1S"
      }
    ]
  }
```

### Defaults

**groups**
```
  "groups": [
    "groupbyTag": "synthetic.testId"
  ]
```

**includeAggregatedTestIds**
* *includeAggregatedTestIds:* *true* when grouping by synthetic.testId, otherwise *false*.

**metrics**
* *granularity:* 0

**pagination**
* If **pagination** is not specified, the entire result set is returned.

**timeFrame**
```
  "timeFrame": {
    "to": {current timestamp},
    "windowSize": 60000
  }
```

### Sample payload to get the mean synthetic.metricsResponseTIme for each Synthetic test within the specified timeFrame
```json
{
    "metrics": [
     {
        "aggregation": "MEAN",
        "metric": "synthetic.metricsResponseTime"
     }],
     "timeFrame": {
       "to": 0,
       "windowSize": 1800000  
     }
} 
```

### Sample payload to get the mean synthetic.metricsResponseTIme for each Synthetic test within the specified timeFrame grouped by applicationId
```json
{
    "metrics": [
     {
        "aggregation": "MEAN",
        "metric": "synthetic.metricsResponseTime"
     }],
     "timeFrame": {
       "to": 0,
       "windowSize": 1800000  
     },
     "groups": [{
       "groupbyTag": "synthetic.applicationId"
     }]
} 
```

### Sample payload to get the synthetic.successRate for the Synthetic tests within the specified timeFrame grouped by the two custom properties region and cluster.
```json
{
    "metrics": [
    {
        "aggregation": "MEAN",
        "metric": "synthetic.successRate"
    }],
    "timeFrame": {
        "to": 0,
        "windowSize": 1800000
    },
    "groups": [
    {
        "groupbyTag": "synthetic.tags",
        "groupbyTagSecondLevelKey": "region"
    },
    {
        "groupbyTag": "synthetic.tags",
        "groupbyTagSecondLevelKey": "cluster"
    }]
}
```
