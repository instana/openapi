This API endpoint updates the Application Alert Configuration.

### Parameters:

**tagFilterExpression**

Note: Any changes in this field might have side effects on issue detection on all selected entities. For static thresholds this
should not be critical as the effect might last up to period of time equal to the granularity. Whereas for Adaptive Baseline it
might take a significant amount of time to rebuild the Adaptive Baseline model and start detecting issues again.