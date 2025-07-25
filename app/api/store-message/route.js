
import { ethers } from "ethers";

export async function POST(request) {
    try {
        const req = await request.json();
        return new Response(JSON.stringify({
            success: true,
            message: 'Message stored successfully',
            data,
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            message: 'Failed to store message',
            error: error.message,
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}