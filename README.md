DEVELOPER TASKS

8. address edge case where we direct to trip page but the trip's content is not done generating.

9. notification service and generic email template (probably w/ React Email, but we shall see).

10. user becomes free user again after having been premium user. we need to reset their free trip count.
    --newSubscriptionRedirectUrl -> query param

11. revise stripe account to reflect up to date info.

12. integration tests around dynamo stream.

Technical To-dos

1. Get Trip Page test to really render all actual components.
2. Disable the absurd 5s timeout on react router data loading.
3. rudimentary opensearch endpoint to send logs to.
