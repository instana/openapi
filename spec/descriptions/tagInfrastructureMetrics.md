This endpoint retrieves the metrics for infrastructure components.

**Manditory Paramters:**

*plugin:* Plugins are entites for which we collect metrics, for example : "Host", "Cassandra node", "Cassandra Connection".

The available plugins are depending on the system you are monitoring. Therefore you will need to [retrieve plugins](https://instana.github.io/openapi/#operation/getPlugins) were we have data for you.

*query or snapshotIds:* choose between dynamic focus query or [snapshotid](https://instana.github.io/openapi/#operation/getSnapshots) (a unique identifier the metrics are assigned to)

To make the it easy to get started this endpoint has two modes that can be used for metrics retrieval:
1. Search metrics with a query
  You are using the [Dynamic Focus](https://docs.instana.io/core_concepts/dynamic_focus/) query to filter the result.
  To get usable search paramters you can either query the search [catalog endpoint](https://instana.github.io/openapi/#operation/getSearchFields) or use the UI
  
1. Search for metrics for snapshotIds
  For advanced usecases, pagination for example, its recomended to use fixed snapshotIds. This also pushes the API call limit for this endpoint from 500 to 1000 calls per Minute

*metrics:* Id of the exact metric you want to retrieve, eg. "cpu.user", "clientrequests.read.mean"

Once you have selected the plugin you can define up to five metrics you want to retrieve with the call.
Please use our [metrics catalog call](https://instana.github.io/openapi/#operation/getMetricsByPlugin) to get the available metrics for the selected plugin.

**Optional Paramters:**

*timeFrame* As in our UI you can specifiy the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

*rollup:* Depending on the selected timeFrame its possible to selected the rollup.

The available rollup is depending on two factors:
1. [Retention times](https://docs.instana.io/core_concepts/data_collection/#data-retention)

	For example if you select a to timestamp that is 3 Weeks in the past the most accurate rollup you can query for would be 1min
1. Size of the selected windowSize

	The limitation is that we only return 600 Datapoints per call, thus if you select a windowSize of 1hour the most accurate rollup you can query for would be 5s
	
Valid rollups are:

| rollup  | value |
| ------------- | ------------- |
| 1 second  | 1 |
| 5 seconds  | 5  |
| 1 minute  | 60 |
| 5 minutes  | 300  |
| 1 hour  | 3600  |


**Defaults:**

*timeframe*
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```

*rollup*: 1

**Limits:**

500 Calls per Hour
1000 Calls per Hour

To keep the response size reasonable the limit is set to 30 retrieved items.[1]

A maximum of 600 datapoints are returned per metric.

You can only retrieve metrics [below](https://docs.instana.io/core_concepts/dynamic_graph/) the selected Dynamic Focus filter.[2]

Example:
```
query=entity.selfType:java
plugin=host
metric=cpu.steal
```
**Tips:**

[1] Pagination
[2] Applicaton filter
