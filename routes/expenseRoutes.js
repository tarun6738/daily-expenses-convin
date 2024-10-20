const express = require("express");
const {addExpense, getIndividualExpenses, getAllExpenses, downloadSheet } = require("../controllers/expenseController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/add").post(isAuthenticatedUser, addExpense);
router.route("/get/:userId").get(isAuthenticatedUser, getIndividualExpenses);

router.route("/all").get(isAuthenticatedUser,getAllExpenses);

router.route("/download").get(isAuthenticatedUser, downloadSheet);

module.exports = router;