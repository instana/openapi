This endpoint retrieves all agent monitoring events for the requested timeframe.
The timeframe is defined as [from, to] or [to - windowSize, to].

These are raw events coming directly from the Instana agent.
These events provide information about what is hindering the Instana agent from providing better monitoring, such as lacking permissions or missing configurations.