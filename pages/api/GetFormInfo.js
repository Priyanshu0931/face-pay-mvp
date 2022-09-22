// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from "../../config";

export default async function PostInfo(req, res) {
  const { reg_no, name, email, phone, password } = req.body;

  const { data, err } = await supabase.from("aryans").insert({
    name: name,
    email: email,
    phone: phone,
    password: password,
    regno: reg_no,
  });
  res.status(200).json({ added: "👍" });
}
