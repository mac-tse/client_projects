# client_projects
Completed automations for different client instances. (no PII)

royvon workflow is for a KObject creation for once it is injected into the client timeline -> it will create an internal only conversation -> assign that conversation to the correct manager for the location -> add tags and leave a note.


kasa insight card -> creates a one to many relationship between two kObjects `group_booking`(one) && 'reservations'(many). By first grabbing the current group_booking externalId on load when the kObject is opened it queries the API for reservations with a matching grouParentStr to the group_booking externalId. it takes that and correctly applies the data to the value within the promise which was necessary for async issues.  
