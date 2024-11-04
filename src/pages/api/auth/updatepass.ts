// DEPRECATED: This API route is no longer used. It was used to update the user's password. We moved to using magic links as our primary auth method.

// import { NextApiRequest, NextApiResponse } from "next";
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// const updatepassHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const accessToken = req.headers.authorization?.split(" ")[1];
//     const { password } = req.body;

//     if (!accessToken) {
//       return res.status(401).json({ error: "No access token provided." });
//     }

//     const supabase = createClient(supabaseUrl, supabaseAnonKey);

//     try {
//       const { error } = await supabase.auth.updateUser(accessToken, {
//         password: password,
//       });

//       if (error) {
//         throw error;
//       }

//       return res
//         .status(200)
//         .json({ success: true, message: "Password updated successfully." });
//     } catch (error: any) {
//       return res
//         .status(error.status || 500)
//         .json({ error: error.message || "An unexpected error occurred" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default updatepassHandler;
