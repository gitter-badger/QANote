'use strict';

function User() {
  Parse.initialize("QvIeb4Xn9a3HrGbgTVMIMfrtltKwGBvM4ycpMEBk", "2V0zGyKEJxyinKfrPMnxlcKGxJlQ7exCwBd6yTgS");
};

User.prototype.current = function() {
  return Parse.User.current();
}

User.prototype.login = function(id, pass) {
  return Parse.User.logIn(id, pass);
};

User.prototype.register = function(id, pass, email) {
  var user = new Parse.User();
  user.set("username", id);
  user.set("password", pass);
  user.set("email",   email);
  return user.signUp();
};

User.prototype.fetchCategories = function() {
  var user = this.current();
  var Category = Parse.Object.extend("Category");
  var query = new Parse.Query(Category);
  query.equalTo("user", user);
  return query.descending('updatedAt').find();
};

User.prototype.addCategory = function(name) {
  var user = this.current();
  var Category = Parse.Object.extend("Category");
  var category = new Category();
  category.setACL(new Parse.ACL(user));
  category.set("user", user);
  category.set("name", name);
  return category.save();
};

User.prototype.fetchQAList = function(category) {
  var user = this.current();
  var QA = Parse.Object.extend("QA");
  var query = new Parse.Query(QA);
  query.equalTo("user", user);
  query.equalTo("category", category);
  return query.descending('updatedAt').find();
};

User.prototype.addQA = function(data) {
  var user = this.current();
  var QA = Parse.Object.extend("QA");
  var qa = new QA();
  qa.setACL(new Parse.ACL(user));
  qa.set("user", user);
  qa.set("category", data.category);
  qa.set("question", data.question);
  qa.set("answer", data.answer);
  return qa.save();
};

module.exports = new User();
