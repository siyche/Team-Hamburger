// POST EVENT W/ CYPRESS

describe('Events API', () => {
    let token;

    before(() => {
        // Login first, get JWT token
        cy.request('POST', 'http://localhost:8000/api/auth/login', {
            email: 'cypress-test@test.com',
            password: 'Cypress-test1',
        }).then((response) => {
            expect(response.status).to.eq(200);
            console.log('Login response:', response); 
            token = response.body 
            expect(token).to.exist;
        });
    });

    it('should create a regular event', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/api/events',
            body: {
                title: 'Cypress Regular Event',
                details: 'Created in Cypress test',
                date: '2025-06-08T02:31:00.000Z',
                start_date: '2025-06-08T02:31:00.000Z',
                end_date: '2025-06-08T02:31:00.000Z',
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
            expect(response.body).to.have.property('title', 'Cypress Regular Event');
            expect(response.body).to.have.property('details', 'Created in Cypress test');
        });
    });
});