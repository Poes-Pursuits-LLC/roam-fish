DEVELOPER TASKS

3. Testing around sentry exception capturing

4. expand e2e testing to Safari/mobile.

5. Build the error occurred component for our error boundary

6. e2e test around an authed user flow or two.

7. clean up triploader just a bit. ensure user knows not to refresh or go back.

8. address edge case where we direct to trip page but the trip's content is not done generating.

9. notification service and generic email template (probably w/ React Email, but we shall see).

10. Share trip with others flow.
    --Intuitively, I think we can have "sharedUsers" array that is a list of userIds on each trip.
    --We will have to think through "sharing" mechanism, especially if person is not a user yet.
    --Once that is addressed, though, it should be simple to, for a given visitor to a trip page, check if their
    userId is present in the sharedUsers list and let them edit the trip accordingly.
    --we can also introduce a changelog so the group can see latest changes and who made them (maybe?)
    --(maybe the simplest option is a simple "last edited by" stamp on the trip page)




---refactor recent trips functiopnkality to return promise and stream to client via Suspense.