This endpoint creates or updates a maintenance configuration given its ID.

### Path Parameters:

- **id:** The ID of the maintenance config to create or update.

### Maintenance Configuration Input
This is a description for the fields in the request body:

**id**: maintenance configuration unique id  
**name**: maintenance configuration name  
**query**: dynamic focus query used to filter alert notifications that will be muted  
**scheduling**: defines when the maintenance configuration will be scheduled
- **start**: time in milliseconds from epoch
- **duration**: duration of each maintenance window occurrence in the maintenance configuration
    - **amount**: the amount of time
    - **unit**: the unit of time
- **type**: `ONE_TIME` or `RECURRENT`
- **rrule**:  for `RECURRENT` mainteance configurations, the RRULE standard from the [iCalendar Spec](https://datatracker.ietf.org/doc/html/rfc5545)
- **paused**: indicates whether maintenance configuration is paused or not
- **tagFilterExpression**: tag filter expression used to filter alert notifications that will be muted  
- **tagFilterExpressionEnabled**: indicates whether tagFilterExpression is used to filter alert notifications


### **RRULE Support**
You can use the [RRULE tool](https://icalendar.org/rrule-tool.html) for generating RRULEs.


The following RRULE tokens are supported: `FREQ`, `UNTIL`, `COUNT`, `INTERVAL`, `BYDAY`, `BYMONTHDAY`, `BYMONTH`.

**Additional Constraints:**

1. For `MONTHLY` and `YEARLY`, you can only specify one value for `BYDAY` and `BYMONTHDAY`.  
2. The maximum `INTERVAL` allowed is as follows:  
    - DAILY is 365
    - WEEKLY is 52
    - MONTHLY is 12
    - YEARLY is 1
3. If an `UNTIL` date is specified, the value needs to be in UTC.