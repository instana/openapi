This endpoint creates or updates a maintenance configuration given its ID.

### Path Parameters:

- **id:** The ID of the maintenance config to create or update.

### Types of Maintenance Configurations
- One-Time Maintenance Window
- Recurrent Maintenance Window

### **Recurrent Maintenance Window**
Support for scheduling recurrent maintenance configurations is possible using the RRULE standard from the [iCalendar Spec](https://datatracker.ietf.org/doc/html/rfc5545).

The following RRULE tokens are supported:  
"FREQ", "UNTIL", "COUNT", "INTERVAL", "BYDAY", "BYMONTHDAY", "BYMONTH".

- FREQ
    - DAILY
        - Example: every 2 days
    - WEEKLY
        - Example: on Friday and Sunday every 3 weeks
    - MONTHLY
        - Example: 21st of every 2nd month
        - (monthly by day) `BYDAY` → one specified, not multiple
        - (monthly by date) `BYMONTHDAY` → one specified, not multiple
    - YEARLY
        - Example: every year on December 25th
        - (monthly by day) `BYDAY` → one specified, not multiple
        - (monthly by date) `BYMONTHDAY` → one specified, not multiple
- UNTIL
    - If provided, only UTC specification
- INTERVAL
    - The maximum for DAILY is 365
    - The maximum for WEEKLY is 52
    - The maximum for MONTHLY is 12
    - The maximum for YEARLY is 1

_FYI:_ Here is an online [RRULE tool](https://icalendar.org/rrule-tool.html) for generating RRULEs.