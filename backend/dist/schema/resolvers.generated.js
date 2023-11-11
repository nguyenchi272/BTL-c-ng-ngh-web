"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const book_1 = require("./book/resolvers/Query/book");
const markBookAsRead_1 = require("./book/resolvers/Mutation/markBookAsRead");
const Book_1 = require("./book/resolvers/Book");
const user_1 = require("./user/resolvers/Query/user");
const User_1 = require("./user/resolvers/User");
exports.resolvers = {
    Query: {
        book: book_1.book,
        user: user_1.user
    },
    Mutation: {
        markBookAsRead: markBookAsRead_1.markBookAsRead
    },
    Book: Book_1.Book,
    User: User_1.User
};
