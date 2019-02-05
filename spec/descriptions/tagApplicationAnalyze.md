

## Mandatory Parameters:

**group**
* *groupByTag*
* *groupByTagSecondLevelKey*

## Optional Parameters:

**pagination**

**order**

**timeFrame** As in our UI you can specify the timeframe for metrics retrieval.
```
  windowSize           to
     (ms)       (unix-timestamp)
<----------------------|
```

**tagFilters**

**metrics**

## Defaults:

**timeFrame**
```
"timeFrame": {
	"windowSize": 60000,
	"to": {current timestamp}
}
```
