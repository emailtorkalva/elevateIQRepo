"use client";
import { useState } from "react";
export default function ContactForm() {
 const [loading, setLoading] = useState(false);
 async function handleSubmit(e: any) {
   e.preventDefault();
   setLoading(true);
   const formData = {
     full_name: e.target.full_name.value,
     email: e.target.email.value,
     company: e.target.company.value,
     service: e.target.service.value,
     message: e.target.message.value,
   };
   const res = await fetch("/api/contact", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(formData),
   });
   const data = await res.json();
   setLoading(false);
   if (data.success) {
     alert("Request submitted successfully");
     e.target.reset();
   } else {
     alert("Something went wrong");
   }
 }
 return (
<form onSubmit={handleSubmit} className="space-y-4">
<input name="full_name" placeholder="Name" required />
<input name="email" type="email" placeholder="Email" required />
<input name="company" placeholder="Company" />
<input name="service" placeholder="Service Required" />
<textarea name="message" placeholder="Message" required />
<button type="submit" disabled={loading}>
       {loading ? "Submitting..." : "Submit"}
</button>
</form>
 );
}
