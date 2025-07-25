import dbConnect from "../../lib/mongoose";
import User from "../../models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    await dbConnect();
    try {
        const body = await request.json();
        const user = await User.create(body);
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
