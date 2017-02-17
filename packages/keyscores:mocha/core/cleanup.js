// Since setting process.browser = true is counter-intuitive
//and may result in strange errors with other libraries that depend on this,
//we have to set this to undefined. See https://goo.gl/WOFnnS
//https://github.com/meteor/meteor/issues/7135
process.browser = undefined;
