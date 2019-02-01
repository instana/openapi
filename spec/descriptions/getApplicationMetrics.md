This endpoint retrieves the metrics for defined applications.

**Manditory Paramters:**

*metrics* A list of metric objects that define which metric should be returned, with the defined aggregation and granularity. Each metrics objects consists of three items:
1. *metric* select a particular metric to get a list of available metrics query the [catalogue endpoint](https://instana.github.io/openapi/#operation/getMetricDefinitions)
1. *aggregation* depending on the selected metric diffrent aggregations are available e.g. SUM, MEAN, P95. The aformentioned [catalogue endpoint](https://instana.github.io/openapi/#operation/getMetricDefinitions) gives you the metrics with the available aggregations.
1. *granularity* defines how many samples are returned. The value can be selected freely between 1 - selected windowSize.

**Optional Paramters:**

*pagination* If you configure many applications and do not apply any filters. The query will return all AP without restrictions, that may lead that you need pagination. 
1. *page*
1. *pageSize*

*order*

*timeFrame*

*nameFilter|applicationid|serviceId|endpointId*

* *nameFilter*
* *applicationid*
* *serviceId*
* *endpointId*

*endpointTypes*

*technologies*

**Defaults:**

**Limits:**

**Tips:**
