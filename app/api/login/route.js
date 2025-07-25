import dbConnect from "../../lib/mongoose";
import User from "../../models/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        console.log("Login request body:", body);
        const user = await User.find({ username: body.username });
        console.log("User found:", user);
        if(!user || user.length === 0) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }
        if(user[0].password !== body.password) {
            return NextResponse.json({ success: false, message: "Incorrect password" }, { status: 401 });
        }
        return NextResponse.json({ success: true, data: user[0]._id.toString() }, { status: 201 });
        } catch (error) {
        return NextResponse.json({ success: false, data: error }, { status: 400 });
    }
}
