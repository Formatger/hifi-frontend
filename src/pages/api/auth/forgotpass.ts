import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseConfig";

const forgotpassHandler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method === "POST") {
    const { email } = req.body;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // redirectTo: "https://www.dashboard.hifibridge.com/auth/resetpassword",
        redirectTo: "http://localhost:3000/auth/resetpassword",

      });

      if (error) throw error;

      return res
        .status(200)
        .json({ message: "Password reset email sent successfully." });
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

export default forgotpassHandler;
