1. ability to edit trip.
   1a. if user present then they can edit.
   1b. enforce a "save" button to actually submit action to limit performance hit.
   1c. Ensure UI makes it obvious that this is necessary.
   1d. backend integration, unit tests, write to dynamo, integration test.
2. trip creation tracking. max 3 trips after which user is prompted to go premium!

// -- each trip created, increment freeTripCount by +1. display freeTripLimit on Dashboard.
// -- for now, paid users can make unlimited trips. we can target abuse and nuke it as needed.
// -- NAVBAR: conditional message of free trip limit reached. perhaps custom message in the CTA since it will be getting displayed at this moment.
// -- trip page: when going to create a trip, block if free trip limit reached.
