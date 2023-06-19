The API endpoints of this group can be used to manage alert configurations for Synthetic Monitoring.

## Parameters:

- **id:** ID of the alert configuration.

- **name:** Name for the synthetic alert configuration, which is used as the title of the event when triggered.

- **description:** Description for the synthetic alert configuration, which is used as the detials of the triggerd event.

- **severity:** The severity of the alert when triggered, which is either `5` (Warning), or `10` (Critical).

- **syntheticTestIds:** List of synthetic test IDs this alert configuration is applied to. Check out APIs in [Synthetic Monitoring](#tag/Synthetic-Settings) to e.g. get a [list of all synthetic tests](#operation/getSyntheticTests) available.

- **rule:** Indicates the type of rule this alert configuration is about. The only `alertType` available so far is `"failure"`, where the metric name `"status"` is expected. This boolean metric requires no threshold to be specified, because value of `status=0` indicates a test failure.

- **timeThreshold:** Defines the triggering condition in time, such as how many consecutive test failures are required to open an event. Setting a higher value for `violationsCount` helps to reduce the number of alerts.

- **alertChannelIds:** List of IDs of alert channels defined in Instana.

