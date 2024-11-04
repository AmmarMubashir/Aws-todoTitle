import { createServerRunner } from "@aws-amplify/adapter-nextjs";

import config from "@/../amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import { Schema } from "../../amplify/data/resource";

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies: () => cookies(),
  authMode: "userPool",
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const isAuthenticated = async () => {
  return await runWithAmplifyServerContext({
    nextServerContext: { cookies: () => cookies() },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return !!user;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
};
