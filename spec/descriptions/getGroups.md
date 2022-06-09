Retrieve the list of all groups on the tenant unit. Each group entry also includes a `Permission Set`.

The `Permission Set` object contains a set of permissions applied to the group.

In case `permissions` include the entry `RESTRICTED_ACCESS`, this group will have a scope limited by its areas.

The areas are included inside the `permissionSet`.

When `permissions` contains `RESTRICTED_ACCESS`, permissions with preffix `ACCESS_*`are applied.

The scopeRoleId is a fixed value for each area type:

| Area                    | value         |
| ----------------------- | ------------- |
| applicationIds          | -100          |
| kubernetesClusterUUIDs  | -200          |
| kubernetesNamespaceUIDs | -300          |
| websiteIds              | -400          |
| mobileAppIds            | -500          |
| infraDfqFilter          | -600          |

For example:

```
[
    {
        "id": "7hwdhtt7TU2CJDgYXgwwww",
        "name": "Scoped Group",
        "members": [
            {
                "userId": "61892cfdfcffab03016b2950",
                "email": "jhon@example.com"
            }
        ],
        "permissionSet": {
        "permissions": [
            "CAN_VIEW_LOGS",
            "ACCESS_APPLICATIONS",
            "ACCESS_KUBERNETES",
            "CAN_VIEW_TRACE_DETAILS",
            "ACCESS_MOBILE_APPS",
            "RESTRICTED_ACCESS",
            "CAN_EDIT_ALL_ACCESSIBLE_CUSTOM_DASHBOARDS"
        ],
        "applicationIds": [
            {
            "scopeId": "1qvWgVfLTNqi9gGTcCaNUw",
            "scopeRoleId": "-100"
            }
        ],
        "kubernetesClusterUUIDs": [
            {
            "scopeId": "induced",
            "scopeRoleId": "-200"
            }
        ],
        "kubernetesNamespaceUIDs": [],
        "websiteIds": [
        ],
        "mobileAppIds": [
            {
            "scopeId": "GYSddOsgTZGtLx7wI8FZcQ",
            "scopeRoleId": "-500"
            }
        ],
        "infraDfqFilter": {
            "scopeId": "production",
            "scopeRoleId": "-600"
        }
    }
]
```
In this case `Scoped Group` has no access to websites due to having `RESTRICTED_ACCESS` but not `ACCESS_WEBSITES`.

Also due to having `RESTRICTED_ACCESS`, the only visible application is the one with this id: `1qvWgVfLTNqi9gGTcCaNUw`.

Same applies to `kubernetesClusterUUIDs`, `kubernetesNamespaceUIDs`, `mobileAppIds`and `infraDfqFilter`, with the only difference is that `infraDfqFilter`
uses a filter "production" instead of an id. 