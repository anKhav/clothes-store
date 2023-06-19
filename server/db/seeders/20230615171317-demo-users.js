"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
         * Add seed commands here.
         *
         * Example:

         */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          email: "email@email.com",
          password: "password",
          firstName: "John",
          lastName: "Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: "email2@email.com",
          password: "password2",
          firstName: "John2",
          lastName: "Doe2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
