import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseConfig";

const magicLinkHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("got to magicLinkHandler");
  if (req.method === "GET") {
    try {
      // Here you might extract some form of session token or a user identifier from the request.
      // This example assumes you've somehow transmitted that data via the request body or headers.
      const token = req.headers.authorization?.split(" ")[1]; // For Bearer tokens
      console.log("token:", token);

      // Validate the token or user ID with Supabase to ensure it's a valid session
      // Note: This step might vary based on how you're handling tokens/session IDs.
      const { data: session, error: sessionError } =
        await supabase.auth.getUser(token);
      if (sessionError) throw sessionError;
      if (!session) {
        return res.status(400).json({
          error: "Session not found. Please sign in again.",
        });
      }

      console.log("Session data:", session);

      // Optionally, fetch additional user profile data
      const userId = session.user.id;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("merchant_id")
        .eq("user_id", userId)
        .single();

      console.log("Profile data:", profile);

      if (profileError) throw profileError;

      // Respond with relevant data or simply indicate success
      return res.status(200).json({
        user: session.user,
        profile: profile,
        message: "User signed in successfully.",
      });
    } catch (error: any) {
      return res
        .status(error.status || 500)
        .json({ error: error.message || "An unexpected error occurred" });
    }
  } else {
    // Allow only POST method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default magicLinkHandler;
