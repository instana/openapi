Creates a group on the tenant. Each group entry also needs a `Permission Set` per unit.

The `Permission Set` object contains a set of permissions applied to the group.

In case `permissions` include the entry `RESTRICTED_ACCESS`, this group will have a scope limited by its areas.

When `permissions` contains `RESTRICTED_ACCESS`, permissions with preffix `ACCESS_*`are applied.

Possible access permissions values are:

- ACCESS_APPLICATIONS
- ACCESS_KUBERNETES
- ACCESS_MOBILE_APPS
- ACCESS_WEBSITES

The `id` value for the group is ignored, a new id is generated.

The `scopeRoleId` is ignored, the id corresponding to the area is used.

The `scopeId` is the id for the corresponding resource.