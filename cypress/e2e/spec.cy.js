/* describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
}) */
describe('Blog app', function() {
  beforeEach(function() {
     // empty the db here
    cy.request('POST', 'http://localhost:3001/api/testing/reset')       
    // create a user for the backend here 
    const user = {      
      name: 'Test User',      
      username: 'testuser',      
      password: 'testpassword'    
    }    
    cy.request('POST', 'http://localhost:3001/api/users/', user)      
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login to application')
    cy.contains('login').click()    
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')    
      cy.get('#password').type('testpassword')    
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')    
      cy.get('#password').type('testtest')    
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })
  })  
})
