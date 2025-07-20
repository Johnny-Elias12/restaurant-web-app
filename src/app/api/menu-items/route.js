import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    if (await isAdmin()){
        const menuItemDoc = await MenuItem.create(data);
        return Response.json(menuItemDoc);
    } else{
        return Response.json({ error: 'Not authorized' }, { status: 403 });
    }
    
}

// export async function PUT(req) {
//   mongoose.connect(process.env.MONGO_URL);
//   if (await isAdmin()) {
//     const {_id, ...data} = await req.json();
//     await MenuItem.findByIdAndUpdate(_id, data);
//   }
//   return Response.json(true);
// }



export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { _id, ...data } = await req.json();

    const updatedItem = await MenuItem.findByIdAndUpdate(_id, data, {
      new: true,
    });

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("PUT /api/menu-items error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
        return Response.json(
        await MenuItem.find()
    );
    
}


export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (await isAdmin()){
     await MenuItem.deleteOne({_id});   
    }
    return Response.json(true);
}