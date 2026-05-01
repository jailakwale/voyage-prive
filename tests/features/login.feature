Feature: Login functionality

Scenario: Login with valid credentials
   Given I am on the login page
   When I login with valid credentials
   Then I should be logged in successfully

Scenario: Login with invalid credentials
   Given I am on the login page
   When I login with invalid credentials
   Then I should see an error message

   
