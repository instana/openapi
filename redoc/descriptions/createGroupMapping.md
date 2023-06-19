Creates a mapping between a group from the IdP (LDAP, OIDC, SAML) and an Instana group.

If the IdP is configured and mappings are enabled, the `key` `value` pairs a user sent by the idp will be evaluated every time this user logs in.

If they match the mapping, the user will be assigned to the group corresponding to the `groupId`.

Inside the payload, the `id` for the mapping is ignored, and instead, Instana generates a new id.