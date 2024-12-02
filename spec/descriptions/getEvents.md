This endpoint retrieves all available events for the requested timeframe.

### Query Parameters:

- **to:** The end of the requested timeframe as a Unix timestamp. The current service time is used as a default if not provided. Please note that it is recommended to fetch historical events with a delay using a `to` timestamp in the past due to eventual consistency. It can take up to **2 minutes** in some cases until an event update is reflected in the results.
- **windowSize:** The size of the requested timeframe in milliseconds relative to `to`. If neither `windowSize` nor `from` is provided, then a default windowSize of *10 minutes* is used.
- **from:** As an alternative to defining the `windowSize`, the `from` query parameter can be used, which spans the timeframe in range `[from, to)`.
- **excludeTriggeredBefore:** Whether to exclude events that have been triggered before the requested timeframe in order to enable searching for events that have started within the given timeframe, excluding events that are previously active already. This is useful for 3rd party integrations that fetch events from Instana with a scheduled batch job in a fixed interval using tumbling windows, when you only care about new events.
This option is more restrictive than `filterEventUpdates` and does not inform about event state updates that got `CLOSED` in the timeframe of the query if not also the start time of the event is within that query timeframe.
- **filterEventUpdates:** Filters results to event updates only. This means that an event is only included when its event state changed in the given query timeframe. This is useful for 3rd party integrations that fetch events from Instana with a scheduled batch job in a fixed interval using a tumbling windows, when you care about event state updates.
- **eventTypeFilters:** Filters results to the specified event type(s), such as `incident`, `issue` or `change`. By default, events of any type are returned.

### Deprecated Parameters

- **includeAgentMonitoringIssues:** Optional flag to indicate whether to include Agent Monitoring Issues. The default is `false`.
- **includeKubernetesInfoEvents:** Optional flag to indicate whether to include Kubernetes Info Events. The default is `false`.

### Examples

Fetch all events that have been opened within the last 30 minutes.

```bash
curl --request GET 'https://<Host>/api/events?windowSize=1800000&excludeTriggeredBefore=true' \
--header 'Authorization: apiToken <Token>'
```

Fetch all events that have been opened or closed within the last minute, using a fetch delay of 120 seconds.

```bash
TO_MILLIS=$((($(date +%s) - 120) * 1000)) curl --request GET "https://<Host>/api/events?windowSize=60000&to=$TO_MILLIS&filterEventUpdates=true" \
--header 'Authorization: apiToken <Token>'
```

Fetch all incidents and issues which duration overlaps with the last 10 minutes.

```bash
curl --request GET 'https://<Host>/api/events?eventTypeFilters=incident&eventTypeFilters=issue' \
--header 'Authorization: apiToken <Token>'
```
