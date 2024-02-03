import { NextRequest, NextResponse } from 'next/server';
import dbExecute from "../dbExecute";

export async function DELETE(req: NextRequest) {
    const username = Object.fromEntries(req.nextUrl.searchParams);
    // console.log(username);
    if (username) {
        try {
            const res = await dbExecute(`DELETE FROM Users WHERE username = ?`, [username]);
            if (res.rowsAffected > 0) return NextResponse.json({ "success": "user deleted" });
            else return NextResponse.json({ "failure": "Unable to delete user" });
        }
        catch (error) {
            return NextResponse.json({ "error": error });
        }
    }
    else return NextResponse.json({ "error": "Invalid data format" });
}
