describe("Backend API Tests", () => {
  let token;
  let createdEventId;
  const testEventTitle = "Cypress Regular Event";
  // FEATURE: USER CREATES AN REGULAR EVENT [POST /api/events]
  /* Background:
   * Given I have logged in with a valid account
   * Then I will be able to create an event
   */

  before(() => {
    cy.request("POST", "http://localhost:8000/api/auth/login", {
      email: "cypress-test@test.com",
      password: "Cypress-test1",
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log("Login response:", response);
      token = response.body;
      expect(token).to.exist;
    });
  });

  // Scenario: Create a regular event
  it("should create a regular event", () => {
    /* As a student, I should be able to view add an event on my calendar
     * Then I should be able to add and event by clicking on the create event button
     * And I should be able to fill out the form with the event details and submit the form
     * And I should be able to see the event on the day I added the event to.
     */

    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/events",
      body: {
        title: testEventTitle,
        details: "Created in Cypress test",
        date: "2025-06-08T02:31:00.000Z",
        start_date: "2025-06-08T02:31:00.000Z",
        end_date: "2025-06-08T02:31:00.000Z",
        all_day: false,
        length: 60,
        flags: [],
        visible: true,
        priority: {},
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", "Cypress Regular Event");
      expect(response.body).to.have.property(
        "details",
        "Created in Cypress test"
      );
    });
  });

  // Scenario: Get the created event
  it("should fetch the created event", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8000/api/events",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const events = response.body;
      expect(events).to.be.an("array");
      const createdEvent = events.find(
        (event) => event.title === testEventTitle
      );
      expect(createdEvent).to.exist;
      createdEventId = createdEvent._id; // Store the ID for future tests
    });
  });

  // Scenario: Delete the created event
  it("should delete the created event", () => {
    /* As a student, I should be able to delete tasks that I don’t need anymore
     * Then, I should be able to see all the events for a selected day
     * And I should be able to go hover over that event and click the trash button
     * And I should be see a confirmation that I want to delete an event
     * And I should be able to not see that event on any calendar view anymore
     */

    cy.request({
      method: "DELETE",
      url: `http://localhost:8000/api/events/${createdEventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property(
        "message",
        "Event deleted successfully."
      );
    });
  });
});
