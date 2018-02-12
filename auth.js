//auth.js

const mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrat = require('passport-local').Strategy,
	User = mongoose.model('User');

passport.use(new LocalStrat(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
