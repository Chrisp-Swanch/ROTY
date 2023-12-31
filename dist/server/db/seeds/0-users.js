"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('users').del();
        yield knex('users').insert([
            {
                id: 1,
                created_at: 1687147209343,
                name: 'Gordon Ramsay',
                profile_image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2018%2F09%2Fgordon-ramsay-hells-kitchen-02-2000.jpg&q=60',
                previous_winner: true,
                is_deleted: false
            },
            {
                id: 2,
                created_at: 1687147209343,
                name: 'Bilbo Baggins',
                profile_image: 'https://www.hollywoodreporter.com/wp-content/uploads/2012/12/hobbit_an_unexpected_journey_8_a_h.jpg?w=2000&h=1126&crop=1',
                previous_winner: false,
                is_deleted: false
            },
            {
                id: 3,
                created_at: 1687147209343,
                name: 'Queen Elizabeth II',
                profile_image: 'https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,q_60,w_645/d8292ed8ae1d759c999a394b98d611a8.jpg',
                previous_winner: false,
                is_deleted: false
            },
            {
                id: 4,
                created_at: 1687147209343,
                name: 'Michelle Obama',
                profile_image: 'https://images-na.ssl-images-amazon.com/images/S/amzn-author-media-prod/kps6s9higps8qfj9iaghq872n0.jpg',
                previous_winner: true,
                is_deleted: false
            },
            {
                id: 5,
                created_at: 1687147209343,
                name: 'Jacinda Ardern',
                profile_image: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2023-04/230426-jacinda-ardern-cc-1220a-19d79a.jpg',
                previous_winner: false,
                is_deleted: false
            },
        ]);
    });
};
