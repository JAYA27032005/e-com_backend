const bycrpt = require("bcryptjs");
require("dotenv").config();

const SALT_ROUNDS = parseInt(process.env.SALT);
const hashpassword = async (plain) => await bycrpt.hash(plain, SALT_ROUNDS);
const verifyPassword = async (plain, hash) => await bycrpt.compare(plain, hash);
module.exports = {hashpassword, verifyPassword};