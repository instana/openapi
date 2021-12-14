This endpoint retrieves all available events for the requested timeframe.

### Query Parameters:

- **to:** The end of the requested timeframe as a Unix timestamp. The current service time is used as a default if not provided.
- **windowSize:** The size of the requested timeframe in milliseconds relative to `to`. If neither `windowSize` nor `from` is provided, then a default windowSize of *10 minutes* is used.
- **from:** As an alternative to defining the `windowSize`, the `from` query parameter can be used, which spans the timeframe in range `[from, to)`.
- **excludeTriggeredBefore:** Whether to exclude events that have been triggered before the requested timeframe in order to enable searching for events that have started within the given timeframe, excluding events that are previously active already. This is useful for 3rd party integrations that fetch events from Instana with a scheduled batch job in a fixed interval. 

### Example

Fetch all events that have been opened within the last 30 minutes.

```bash
curl --request GET 'https://<HOST>/api/events?windowSize=30000 excludeTriggeredBefore=true' \
--header 'Authorization: apiToken <Token>'
```