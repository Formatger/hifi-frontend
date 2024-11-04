import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseConfig";

const signinHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const { data: data, error: signInError } =
        await supabase.auth.signInWithOtp({
          email: email,
          options: {
            shouldCreateUser: false,
            emailRedirectTo: "http://localhost:3000",
          },
        });
      console.log(data);

      if (signInError) throw signInError;

      //   if (!user.user) {
      //     return res.status(400).json({
      //       error:
      //         "User not found or not signed in yet. Please check your email for the sign-in link.",
      //     });
      //   }

      // Assuming user.user is now correctly an object with an `id`, thanks to the assertion.
      //   const userId = (user.user as any).id; // Replace `any` with a more specific type if you have one.

      //   const { data: profile, error: profileError } = await supabase
      //     .from("profiles")
      //     .select("merchant_id")
      //     .eq("user_id", userId)
      //     .single();

      //   if (profileError) throw profileError;

      return res.status(200).json({
        data: data,
        message: "Sign in link sent. Please check your email.",
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
