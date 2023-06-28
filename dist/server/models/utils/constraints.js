"use strict";
//-----------
// VARIABLES
//-----------
Object.defineProperty(exports, "__esModule", { value: true });
exports.votePreferences = exports.weightDivisions = exports.descriptionCharLimit = exports.nameCharLimit = exports.pathCharLimit = void 0;
// Set constraints on values coming into the databse
exports.pathCharLimit = 10000; // character limit for url strings
exports.nameCharLimit = 40; // character limit for names
exports.descriptionCharLimit = 400; // character limit for descriptions
exports.weightDivisions = [
    'Flyweight',
    'Lightweight',
    'Middleweight',
    'Heavyweight',
    'Super Heavyweight',
]; // Valid weight divisions for rocks
exports.votePreferences = ['1', '2', '3']; // Valid vote preferences, only 3 allowed
