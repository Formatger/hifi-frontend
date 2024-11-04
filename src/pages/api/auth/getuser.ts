import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseConfig";

const getUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      const { data: user, error } = await supabase.auth.getUser(token);

      if (error) {
        throw error;
      }

      return res
        .status(200)
        .json({ data: user, message: "Get user was successful" });
    } catch (error: any) {
      console.error("Error fetching user:", error.message);

      return res.status(error.status || 500).json({
        error: error.message || "An unexpected error occurred",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getUserHandler;
