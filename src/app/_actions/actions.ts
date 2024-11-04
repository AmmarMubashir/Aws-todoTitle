"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const { data, errors } = await cookieBasedClient.models.Post.create({
    title: formData.get("title")?.toString() || "",
  });
  console.log("create post data", data, errors);
  redirect("/");
}

// import React from "react";

// const actions = () => {
//   return <div>actions</div>;
// };

// export default actions;
