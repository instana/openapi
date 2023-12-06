This API endpoint allows to invite users to this tenant.  
Each user requires the email address and the group to which the user will be added initially.  

Inviting users whilst an IdP is configured will always result in failures, as in this case users will be provisioned during the login based on the IdP configuration.  
During the IdP configurations all pending invitations are automatically revoked.

Inviting users who are already members of the tenant will also provide an error result.  