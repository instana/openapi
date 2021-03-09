This endpoint creates the Application Alert Configuration

## Mandatory Parameters:

- **name:** Name for the application alert configuration

- **description:** Description for the application alert configuration

- **applications:** Selection of application, services and endpoints in scope.

- **boundaryScope:** Boundary scope of the Application Perspective

- **alertChannelIds:** List of IDs of alert channels defined in Instana

- **rule:** Indicates the type of rule this alert configuration is about

- **threshold:** Indicates the type of threshold this alert rule is evaluated on 

- **timeThreshold:** Indicates the type of violation of the defined threshold

## Deprecated Parameters

- **tagFilters:** The list of tag filters. It is replaced by **tagFilterExpression**

- **applicationId:** Unique ID of the Application Perspective. It is replaced by **applications**
