const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { Parser } = require("json2csv");
const fs = require("fs");

const User = require("../models/userModel");

const Expense = require("../models/expenseModel");
const mongoose = require("mongoose");

// add the expense to database

const addExpense = catchAsyncErrors(async (req, res, next) => {
  
    const { description, amount, splitType, participants } = req.body;

    if (!participants || participants.length === 0) {
      return next(new ErrorHandler("Participants needed",400));
    }

    const expense = new Expense({
      description,
      amount,
      splitType,
      participants,
      createdBy: req.user._id,
    });

    if (splitType === "equal") {
      const splitAmount = amount / participants.length;   // The amount is equally divided among all participents
      expense.participants.forEach((participant) => {
        participant.amountOwed = splitAmount;
      });
    } else if (splitType === "exact") {
      let total = participants.reduce(
        (sum, participant) => sum + participant.amountOwed,
        0
      );
      if (total !== amount) {
        return res.status(400).json({  // checks if the total of all amountOwed values adds upto the overall expense (amount).
          error: "Total of exact amounts does not match the total expense",
        });
      }
    } else if (splitType === "percentage") {
      let totalPercentage = participants.reduce(
        (sum, participant) => sum + participant.percentage,
        0
      );
      if (totalPercentage !== 100) {  // checks if the sum of all percentage values in the participants array equals to 100
        return res
          .status(400)
          .json({ error: "Percentages must add up to 100" });
      }
      expense.participants.forEach((participant) => {
        participant.amountOwed = (amount * participant.percentage) / 100; // calculates each participants amountOwed by simple percentage logic
      });
    }
    await expense.save();
    res.status(201).json(expense);
  
});

// get the expenses by id of user

const getIndividualExpenses = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId);
    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Fetch expenses created by the specified user
    const userExpenses = await Expense.find({
      createdBy: userId, // Fetch expenses created by the specified user
    })
      .populate("participants.user", "name email mobile")
      .populate("createdBy", "name email");

    res.status(200).json(userExpenses);
});

// get all users expenses

const getAllExpenses = catchAsyncErrors(async (req, res, next) => {
    console.log("Yopoo")
  const expenses = await Expense.find({});
  res.status(200).json(expenses);
});

// download expenses of a user(currently loggedin)

const downloadSheet = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user.id;

    const userExpenses = await Expense.find({ createdBy: userId })
      .populate("participants.user", "name email")
      .populate("createdBy", "name email");

    const csvData = userExpenses.flatMap((expense) =>
      expense.participants.map((participant) => ({
        description: expense.description,
        amount: expense.amount,
        splitType: expense.splitType,
        createdByName: expense.createdBy.name,
        participantUserName: participant.user ? participant.user.name : "N/A",
        amountOwed: participant.amountOwed,
      }))
    );

    const fields = [
      "description",
      "amount",
      "splitType",
      "createdByName",
      "participantUserName",
      "amountOwed",
    ];

    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(csvData);

    console.log("Generated CSV Data:", csv);

    res.header("Content-Type", "text/csv; charset=utf-8");
    res.attachment("balance-sheet.csv");
    res.send(csv);
});

module.exports = {
  addExpense,
  getIndividualExpenses,
  getAllExpenses,
  downloadSheet,
};
