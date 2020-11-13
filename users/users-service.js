module.exports = {
  isValid,
};

function isValid(user) {
  // return true; // FILL THIS OUT WITH REQ NEXT TIME
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}
