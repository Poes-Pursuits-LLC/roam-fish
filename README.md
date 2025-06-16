2. add "has" subcription check to PlanTrip page so we allow subscribers to keep creating trips.

3. build integration tests

4. have analytics process trips just on UPDATE, since we do "update" them as a part of the creation flow regardless.
   This will prevent double counting.

4b. We must also properly "diff" old and new image because otherwise, we will just be linearly adding days and budget costs without knowing what they were before!

5. research error handling for streams
