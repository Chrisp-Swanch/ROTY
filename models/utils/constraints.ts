//-----------
// VARIABLES
//-----------

// Set constraints on values coming into the databse

export const pathCharLimit = 5000 // character limit for url strings
export const nameCharLimit = 40 // character limit for names
export const descriptionCharLimit = 400 // character limit for descriptions
export const weightDivisions = [
  'Flyweight',
  'Lightweight',
  'Middleweight',
  'Heavyweight',
  'Super Heavyweight',
] // Valid weight divisions for rocks
export const votePreferences = ['1', '2', '3'] // Valid vote preferences, only 3 allowed