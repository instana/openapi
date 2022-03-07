This endpoint retrieves all available events for the requested timeframe.

### Query Parameters:

- **to:** The end of the requested timeframe as a Unix timestamp. The current service time is used as a default if not provided.
- **windowSize:** The size of the requested timeframe in milliseconds relative to `to`. If neither `windowSize` nor `from` is provided, then a default windowSize of *10 minutes* is used.
- **from:** As an alternative to defining the `windowSize`, the `from` query parameter can be used, which spans the timeframe in range `[from, to)`.
- **excludeTriggeredBefore:** Whether to exclude events that have been triggered before the requested timeframe in order to enable searching for events that have started within the given timeframe, excluding events that are previously active already. This is useful for 3rd party integrations that fetch events from Instana with a scheduled batch job in a fixed interval using tumbling windows, when you only care about new events.
This option is more restrictive than `filterEventUpdates` and does not inform about event state updates that got `CLOSED` in the timeframe of the query if not also the start time of the event is within that query timeframe.
- **filterEventUpdates:** Filters results to event updates only. This means that an event is only included when its event state changed in the given query timeframe. This is useful for 3rd party integrations that fetch events from Instana with a scheduled batch job in a fixed interval using a tumbling windows, when you care about event state updates.

### Example

Fetch all events that have been opened or closed within the last 30 minutes.

```bash
curl --request GET 'https://<HOST>/api/events?windowSize=30000 filterEventUpdates=true' \
--header 'Authorization: apiToken <Token>'
```