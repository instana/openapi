This endpoint retrieves Synthetic Tests.

## Optional Parameters:

- **locationId** Filters the Synthetic Tests to retrieve only the ones that are associated to the specified PoP location ID.
- **filter** Filters the Synthetic Tests to retrieve only the ones that match the specified filter condition. 
  Users are allowed to specify more than one filter parameter, and they will be combined in a single expression using logical operator 'AND'.
  The filter parameter is formatted as '**_{\<attribute>\<operator>\<value}_**'. For example, '_{label=MyTest}_'
  
### Supported filter attributes and operators:

| | = | != | \> | < | \>= | <= | Example |
|-|---|----|---|---|---|-|---------|
| label | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={label=ABC} |
| description | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={description=MyTest} |
| active | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={active=true} |
| testFrequency | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={testFrequency=5} |
| applicationId | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={applicationId=APP_ID} |
| locations | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={locations=POP_ID} |
| locationLabels | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={locationLabels=MyPoP} |
| locationDisplayLabels | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={locationDisplayLabels=My PoP} |
| configuration.\<any property of type string> | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={configurtion.syntheticType=HTTPAction} |
| customProperties.\<all properties> | &check; | &check; | - | - | - | - | /api/synthetics/settings/tests?filter={customProperty.usage=Test} |
| createdAt | &check; | &check; | &check; | &check; | &check; | &check; | /api/synthetics/settings/tests?filter={createdAt>1715190462000} |
| modifiedAt | &check; | &check; | &check; | &check; | &check; | &check; | /api/synthetics/settings/tests?filter={modifiedAt<=1715190462000} |

