import users from "../data/users.json";

const currentUser = users.find(
  (user) => user.role === "Professor"
);

export default currentUser;