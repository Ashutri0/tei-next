import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      { status: 500 },
    )
  }

  try {
    const { error } = await supabase.from("products").select("id").limit(1)

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: "Supabase reachable but query failed. Check tables and permissions.",
          detail: error.message,
        },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Supabase connection successful.",
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unexpected error while checking Supabase connection.",
        detail: error?.message,
      },
      { status: 500 },
    )
  }
}

