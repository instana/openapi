This endpoint retrieves the metrics for infrastructure components.

**Manditory Paramters:**

*plugin:* Plugins are entites for which we collect metrics, for example : "Host", "Cassandra node", "Cassandra Connection".


The available plugins are depending on the system you are monitoring. Therefore you will need to [retrieve plugins](https://instana.github.io/openapi/#operation/getPlugins) were we have data for you.

*query or snapshotIds:* choose between dynamic focus query or snapshotid (a unique identifier the metrics are assigned to)

To make the it easy to get started this endpoint has two modes that can be used for metrics retrieval:
1. Search metrics with a query
  You are using the [Dynamic Focus](https://docs.instana.io/core_concepts/dynamic_focus/) query to filter the result. 
  
1. Search for metrics for snapshotIds
  For advanced usecases, pagination for example, its recomended to use fixed snapshotIds. This also pushes the API call limit for this endpoint from 500 to 1000 calls per Minute

*metrics* id of the exact metric you want to retrieve, eg. "cpu.user", "clientrequests.read.mean"

Once you have selected the plugin you can define up to five metrics you want to retrieve with the call.
Please use our [metrics catalog call](https://instana.github.io/openapi/#operation/getMetricsByPlugin) to get the available metrics for the selected plugin.

**Optional Paramters:**

As in our UI you can specifiy the timewindow for wich 

*timeFrame*

*rollup:* Depending on the selected timeFrame its possible to selected the rollup.

The available rollup is depending on two factors:
1. [Retention times](https://docs.instana.io/core_concepts/data_collection/#data-retention)

	For example if you select a to timestamp that is 3 Weeks in the past the most accurate rollup you can query for would be 1min
1. Size of the selected windowSize

	The limitation is that we only return 600 Datapoints per call, thus if you select a windowSize of 1hour the most accurate rollup you can query for would be 5s
Valid rollups are 1s, 5s, 1min, 5min, 1hour

**Defaults:**
"timeFrame": {
	"windowSize": 600,
	"to": <- The current timestamp
}

rollup: 1s 

**Limits:**

500 Calls per Hour
1000 Calls per Hour

30 Found items
600 Datapoints per Metric
Retrieving metrics [below](https://docs.instana.io/core_concepts/dynamic_graph/) the selected Dynamic Focus filter (See under Tips:)
Exaple:

**Tips:**

Pagination
Applicaton filter
