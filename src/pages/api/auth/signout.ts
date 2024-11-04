import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseConfig";

const signoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      return res.status(200).json({ message: "Sign out successful" });
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

export default signoutHandler;
