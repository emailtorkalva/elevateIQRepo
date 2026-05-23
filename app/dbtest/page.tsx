import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_URL!,
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export default async function DBTestPage() {
 const { data, error } = await supabase
   .from("test")
   .select("*");
 return (
<div style={{ padding: "40px" }}>
<h1>DB Test</h1>
     {error ? (
<pre>{JSON.stringify(error, null, 2)}</pre>
     ) : (
<pre>{JSON.stringify(data, null, 2)}</pre>
     )}
</div>
 );
}
