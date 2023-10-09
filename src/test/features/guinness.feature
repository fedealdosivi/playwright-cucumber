@smoke
Feature: Navigate to Guinness Shop

    Scenario: Navigate to shop Guinness using recorder
        Given I navigate to "https://www.guinness.diageo.site/"
        When I enter date of birth "24" "05" "1996"
        Then I should be on the home page
        When I navigate to shop
