This endpoint retrieves all kubernetes info events for the requested timeframe.
The timeframe is defined as [from, to] or [to - windowSize, to].

These are raw events coming directly from the sensors. 
They are mainly Kubernetes event logs and are not necessarily about problems in the system.