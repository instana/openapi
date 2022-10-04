This API endpoint creates the Website Alert Configuration.

## Mandatory Parameters:

- **name:** Name for the website alert configuration.

- **description:** Description for the website alert configuration.

- **severity:** The severity of the alert when triggered, which is either `5` (Warning), or `10` (Critical).

- **triggering:** Optional flag to indicate whether also an Incident is triggered or not.

- **websiteId:** Unique ID of the website.

- **tagFilterExpression:** Boolean expression of tag filters to define the scope of relevant website beacons.

- **granularity:** The evaluation granularity used for detection of violations of the defined threshold. In other words, it defines the size of the tumbling window used.

- **rule:** Indicates the type of rule this alert configuration is about.

- **threshold:** Indicates the type of threshold this alert rule is evaluated on.

- **timeThreshold:** Indicates the type of violation of the defined threshold.

- **alertChannelIds:** List of IDs of alert channels defined in Instana.
