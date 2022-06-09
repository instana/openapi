Creates a mapping between a group from the IdP (LDAP, OIDC, SAML) and an Instana group.

If the IdP is configured and mappings are enabled, every time a user logs in the `key` `value` pairs for this user sent by the idp will be evaluated.

If they match the mapping, the user will be assigned to the group corresponding to the `groupId`.

The value for id is ignored, a new value is generated.