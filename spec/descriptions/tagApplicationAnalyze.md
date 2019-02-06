The following four endpoints expose our analyze functionality.

Part of this are two group endpoints to retrieve metrics for traces and calls rolled up and filtered individually. 

Furthermore you can [search and filter all traces](#operation/getTraces) and retrieve [all details](#operation/getTrace) attached to the trace.

## Mandatory Parameters (only for group Endpoints):

**group** It is mandatory to select a tag by which the calls and traces are grouped for the distinct endpoint call
* *groupByTag* select a tag by which the calls and traces are grouped 
  * a full list of available tags can be retrieved from [tags catalogue](#operation/getTagsForApplication)
  * for the trace endpoint only two tags are reasonable and working: `trace.endpoint.name` and `trace.service.name` which indicate the entry endpoint or service for the trace
* *groupByTagSecondLevelKey* tags of type KEY_VALUE_PAIR need a second parameter e.g for `kubernetes.deployment.label` you would need provide the label you want to groupBy here.

## Optional Parameters:

**pagination**

**order**

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

**tagFilters**

**metrics**

## Defaults:

**timeFrame**
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```
