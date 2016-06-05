Feature: MAIN REPORT
  In order to compile a comprehensive document that combines all data into one reference document
  As a user of reporting
  I want to be able to generate Main report

  Background:
    Given I login into Reports Application

  @ignore
  Scenario Outline: Generate Main report for all types with mandatory fields
    When I open trial report Reports/Main Report
    Then I generate project in <ReportFormat>
    Examples:
      | ReportFormat  |
      | PDF;Excel2003 |