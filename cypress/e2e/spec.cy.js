/* describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
}) */
describe('Blog app', function() {
  beforeEach(function() {
     // empty the db here
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)         
    // create a user for the backend here 
    const user = {      
      name: 'Test User',      
      username: 'testuser',      
      password: 'testpassword'    
    }    
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)     
    cy.visit('')
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

  }) 
  
  describe('When logged in', function() {
    describe('several blogs exist', function () {
      beforeEach(function() {
        cy.login({ username: 'testuser', password: 'testpassword' })
        cy.createBlog({ title: 'first blog',author: 'cypress',url : 'www.test.com/blog/cypress/1'})  
        cy.createBlog({ title: 'second blog',author: 'cypress',url : 'www.test.com/blog/cypress/2'}) 
        cy.createBlog({ title: 'third blog',author: 'cypress',url : 'www.test.com/blog/cypress/3'})            
    })

      it('one of them can be liked', function () {
        cy.contains('second blog').contains('view').click().parents().contains('like').as('theButton')
        cy.get('@theButton').click()
      })
    })

  })   
})
