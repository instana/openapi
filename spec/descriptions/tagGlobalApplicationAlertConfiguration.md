The API endpoints of this group can be used to manage Global Application alert configurations.

## Parameters:

All parameters and deprecated parameters are similar to Application Alert Configuration except **applications**

- **applications:** Selection of applications, services and endpoints in scope. It allows more than one application to define a global rule across different Application Perspectives.

  #### Example: Select multiple Application Perspectives

  To select multiple applications with IDs `<appId1>`, `<appId2>` including all its services and endpoints, simply provide the following selection object:

  ```json
  "applications": {
      "<appId1>": {
          "applicationId": "<appId1>"
      },
      "<appId2>": {
           "applicationId": "<appId2>"
      }
  }
  ```
