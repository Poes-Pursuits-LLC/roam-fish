DEVELOPER TASKS

8. address edge case where we direct to trip page but the trip's content is not done generating.

9. notification service and generic email template (probably w/ React Email, but we shall see).

10. user becomes free user again after having been premium user. we need to reset their free trip count.
--alternatrively, set count to zero if user becomes premium. thus when they return to free their count is ALREADY at zero.
--look into if we can have a callback handler for clerk that does not entail a webhook.

11. revise stripe account to reflect up to date info.

12. sanity test just a bit on prod.

13. the diffing between budget total is not quite working. first glance at trip 

Technical To-dos
1. Get Trip Page test to really render all actual components.
2. Get integration tests around dynamo stream handling.
3. Disable the absurd 5s timeout on react router data loading.
4. rudimentary opensearch endpoint to send logs to.