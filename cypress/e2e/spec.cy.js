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
      cy.contains('login').click()      
      cy.get('#username').type('testuser')    
      cy.get('#password').type('testpassword')    
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')    
      cy.get('#password').type('testtest')    
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong') 
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')    
      cy.get('html').should('not.contain', 'Test User logged in')        
    })
  })  

   describe('When logged in', function() {
    beforeEach(function() {
    cy.login({ username: 'testuser', password: 'testpassword' })
})

    it('A blog can be created', function() {
      cy.contains('new blog').click()      
      cy.get('#title').type('a blog created by cypress')     
      cy.get('#author').type('cypress')   
      cy.get('#url').type('www.test.com/blog/cypress')            
      cy.contains('create').click()      
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('a new blog created by cypress')     
        cy.get('#author').type('cypress')   
        cy.get('#url').type('www.test.com/blog/cypress')  
        cy.contains('create').click()
      })

      it('it can be liked', function () {
        // ...
      })
    })

  })   
})
