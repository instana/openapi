The API endpoints of this group can be used to manage Global Application alert configurations. These endpoints are only available for customers who have opted-in for the BETA feature "Application Smart Alerts".
In order to use this feature or to have more information, please contact <support@instana.com>.

## Parameters

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

## BuiltIn Global Application Alert Configurations

Instana provides a number of global application alert configurations by for every customer.
These built in global application alert configurations can be identified by the `builtIn` field being `true`.
While built in global application alert configurations can be reconfigured for the most part like any other
global application alert configuration, some restrictions apply when manipulating them:
* They cannot be deleted or created
* The following fields cannot be updated:
  * `evaluationType`
  * `rule`
  * `tagFilterExpression`
  * `threshold.type`
  * `threshold.operator`

Performing one of the restricted operations will result in an error with status code `400`