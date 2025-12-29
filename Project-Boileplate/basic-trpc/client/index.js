import { trpcClient } from "./trpcClient.js";

trpcClient.userList.query().then((users) => {
  console.log("User List:", users);
});
