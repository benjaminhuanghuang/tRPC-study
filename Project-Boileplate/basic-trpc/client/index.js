import { trpcClient } from "./trpcClient.js";

trpcClient.userList.query().then((users) => {
  console.log("User List:", users);
});

trpcClient.createUser.mutate({ name: "New User" }).then((newUser) => {
  console.log("Created User:", newUser);
});
