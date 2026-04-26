const express = require("express");
const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
  windowMs  : 60 * 1000,
  max: 5,
  message: {
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,
});

module.exports = {
  limiter,
};
