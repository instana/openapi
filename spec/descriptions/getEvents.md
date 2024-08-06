This endpoint retrieves all available events for the requested timeframe.
The timeframe is defined as [from, to] or [to - windowSize, to].

The `eventTypeFilters` parameter can be repeated if multiple filters are needed.
Multiple use example: `eventTypeFilters=INCIDENT&eventTypeFilters=CHANGE`