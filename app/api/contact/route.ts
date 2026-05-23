import { createClient } from "@supabase/supabase-js";

import { NextResponse } from "next/server";

const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL!,

  process.env.SUPABASE_SERVICE_ROLE_KEY!

);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { full_name, email, company, service, message } = body;

    const { data, error } = await supabase

      .from("contact_requests")

      .insert([

        {

          full_name,

          email,

          company,

          service,

          message,

        },

      ]);

    if (error) {

      return NextResponse.json(

        { success: false, error },

        { status: 500 }

      );

    }

    return NextResponse.json({

      success: true,

      data,

    });

  } catch (err) {

    return NextResponse.json(

      { success: false, err },

      { status: 500 }

    );

  }

}
 
