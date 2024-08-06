This endpoint retrieves all kubernetes info events for the requested timeframe.
The timeframe is defined as [from, to] or [to - windowSize, to].

These events are collected from the Kubernetes sensor and typically relate to state changes in the cluster. 
Similar to using kubectl events.