 import {User} from "@/models/User";
 import bcrypt from "bcrypt";
 import mongoose from "mongoose";

 export async function POST (req){
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);

  const pass=body.password;
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}

// import { User } from "@/models/User";
// import bcrypt from "bcrypt";
// import mongoose from "mongoose";

// export async function POST(req) {
//   await mongoose.connect(process.env.MONGO_URL);

//   const { name, email, password } = await req.json();

//   // 1. Validate required fields
//   if (!name || !email || !password) {
//     return new Response("Missing required fields", { status: 400 });
//   }

//   // 2. Check for duplicate user
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return new Response("User already exists", { status: 409 });
//   }

//   // 3. Hash password
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   // 4. Create user
//   const createdUser = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   return Response.json({
//     message: "User created successfully",
//     user: {
//       id: createdUser._id,
//       name: createdUser.name,
//       email: createdUser.email,
//     },
//   });
// }
