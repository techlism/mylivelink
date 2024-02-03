"use client"
import Link from "next/link"
export default function Home() {
    return(
        <main className="flex justify-center align-middle min-h-screen p-8">
            <div className="flex flex-col justify-center align-middle space-y-4 bg-[#ababab68] dark:bg-[#222222af] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 text-left text-xl font-medium">
                <h1 className="font-bold text-2xl">Free Till : </h1>
                <p>-&gt;Cloudflare R2 storage? Nah, it never runs out. Hopefully.</p>
                <p>-&gt;Reach the read/write limit of Turso? As if! We&apos;re not writing War and Peace here.</p>
                <p>-&gt;Vercel&apos;s free tier running out? Well, when pigs fly!</p>
                <p>-&gt;More monthly active users than Clerk&apos;s free tier? Ha! We would be so lucky.</p>
                <p>-&gt;Or, you know, I could actually create something people would pay for. There&apos;s a novel idea!</p>
                    <Link href={'/'} className="border w-fit p-4 rounded-xl bg-muted">Go Back to Home</Link>
            </div>
            
        </main>

    )
}