This endpoint creates the Website Alert Configuration

## Mandatory Parameters:

- **name:** Name for the website alert configuration

- **description:** Description for the website alert configuration

- **websiteId:** Unique ID of the website

- **alertChannelIds:** List of IDs of alert channels defined in Instana

- **rule:** Indicates the type of rule this alert configuration is about

- **threshold:** Indicates the type of threshold this alert rule is evaluated on 

- **timeThreshold:** Indicates the type of violation of the defined threshold

## Deprecated Parameters

**tagFilters:** The list of tag filters. It is replaced by **tagFilterExpression**
