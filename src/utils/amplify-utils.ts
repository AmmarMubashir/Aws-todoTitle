import { createServerRunner } from "@aws-amplify/adapter-nextjs";

import config from "../../amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import { Schema } from "../../amplify/data/resource";

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
  authMode: "userPool",
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const isAuthenticated = async () => {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        console.log("USER: " + user);
        return !!user;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
};

// export const isAuthenticated = async () => {
//   return await runWithAmplifyServerContext({
//     nextServerContext: { cookies: () => cookies() },
//     async operation(contextSpec) {
//       try {
//         const user = await getCurrentUser(contextSpec);
//         return !!user; // Return true if the user is authenticated
//       } catch (error) {
//         console.error("Error checking authentication:", error); // Log the full error object

//         // Check if error has specific properties to determine the type of error
//         if (error.name === "UserUnAuthenticatedException") {
//           console.warn("User is not authenticated. Please sign in.");
//         } else if (error.message) {
//           console.warn("An error occurred:", error.message);
//         } else {
//           console.error(
//             "Unexpected error while checking authentication:",
//             error
//           );
//         }

//         return false; // Return false if there is an error
//       }
//     },
//   });
// };
