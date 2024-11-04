import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseConfig";

const signinHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {

      const { data: user, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw signInError;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("merchant_id")
        .eq("user_id", user.user.id)
        .single();

      if (profileError) throw profileError;

      return res.status(200).json({
        data: {
          ...user, 
          merchantId: profile.merchant_id, 
        },
        message: "Sign in successful",
      });
    } catch (error: any) {

      return res
        .status(error.status || 500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  } else {

    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default signinHandler;
