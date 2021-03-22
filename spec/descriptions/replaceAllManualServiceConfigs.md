Replace all manual service configurations.

**This is an experimental endpoint to workaround service mapping issues.**

### Mandatory Parameters:

**tagFilterExpression** A tag filter expression to match calls on which the manual service configuration will be applied. Only call tags are allowed in the expression.

### Optional Parameters:
**unmonitoredServiceName** Specify a service name if you want to map calls to an unmonitored service.

**existingServiceId** Specify a service id if you want to map calls to an existing service.

**description** A description of the configuration.

**enabled** Enable or disable the configuration.

Note: Either unmonitoredServiceName or existingServiceId should be specified in a configuration.

### Defaults
**enabled** `true`