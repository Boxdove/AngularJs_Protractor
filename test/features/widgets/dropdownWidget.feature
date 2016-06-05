# Unit UI tests
Feature: DROPDOWN WIDGET
  As a application user
  I want to be able to select items from dropdown
  In order to use them

  Background:
    Given I login into Reports Application
    And I open trial report Automation/DropdownWidget

  @unit
  Scenario: Multi-select Dropdown
    Given dropdown widget MultiSelectDropdown is available
    When I select dropdown items New York;Alexandria
    Then dropdown items Alexandria;New York are displayed

  @unit
  Scenario: Multi-select dropdown with search
    Given dropdown widget MultiSelectDropdownWithSearch is available
    When I filter dropdown items by S
    Then filtered search results Moscow;Shenyang;Singapore are displayed

  @unit @bug
  Scenario: MaxCapacity is applied to the dropdown
    And dropdown widget DropdownWidgetMaxCapacity is available
    And I select all items
    And widget DropdownWidgetMaxCapacity has warning message You have exceeded the maximum number of 3 item(s)

  @unit
  Scenario Outline: IsRequired validation in the dropdown widget
    And dropdown widget DropdownWidgetIsRequired is available
    Then I generate project into the <ReportFormat> and <ValidationMessage> is displayed
    Examples:
      | ValidationMessage                                  | ReportFormat |
      | At least one DropdownWidgetIsRequired is mandatory | PDF;Word2003 |
