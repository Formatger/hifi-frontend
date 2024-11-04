import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabaseConfig";

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password, fullName, businessName, phoneNumber } = req.body;

    try {
      const { data: user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `https://www.dashboard.hifibridge.com/auth/signup`,
          data: {
            fullName,
            businessName,
            phoneNumber,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (!user) throw new Error("User creation failed");

      const { data: merchantData, error: merchantInsertError } = await supabase
        .from("merchants")
        .insert([{ business_name: businessName }])
        .select();

      if (merchantInsertError || !merchantData)
        throw merchantInsertError || new Error("Merchant creation failed");

      // TODO: update the user metadata to include the merchantID so that we can get the merchantid from a getuser call

      if (merchantData) {
        const merchantId = merchantData[0].id;

        const { data: profileData, error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              user_id: user.user?.id,
              full_name: fullName,
              phone_number: phoneNumber,
              email: email,
              merchant_id: merchantId,
            },
          ]);

        if (insertError) throw insertError;

        return res.status(200).json({ user: user, merchant: merchantData });
      } else {
        return res
          .status(500)
          .json({ error: "Failed to create merchant details" });
      }
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

// Export the handler
export default signupHandler;
