# Rfuelr
## Description
This is a rewrite of the original Rfuelr iOS app to be a PWA instead of a React-Native app

## To Do Items
### Roadmap
- [ ] Update Error Handling
  - [X] Refuel submission failure
  - [ ] Refuel delete failure
  - [X] Vehicle submission failure
  - [X] Vehicle edit failure
  - [ ] Vehicle delete failure
- [ ] Update styling of cards
- [X] Update refuel table styling to be more mobile friendly
  - Identify items for summary header
  - Accordian dropdown with additional metrics
- [X] Fix theme button in Preferences accordian
- [ ] Fix styling on dashboard cards
- [ ] Add flip transition on dashboard cards
- [ ] Add graphs to back of dashboard cards
- [ ] Add stepper for first time user setup
- [X] Add Rfuelr icon

## Tech Debt
- [X] Fix Typescript aliases (ex. "@hooks/useVehicles")
- [X] Refactor modals
  - [X] Rename modals to dialog
  - [X] Move modals to their own folder (ex. DashboardCards)