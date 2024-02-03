"use client";
import Link from "next/link";
import { Separator } from '@/components/ui/separator';
export default function Home() {
  return (
    <main className="flex justify-center align-middle min-h-screen p-4">
      <div className="flex flex-col justify-center align-middle space-y-4 bg-[#ababab68] dark:bg-[#222222af] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-4 text-left text-xl font-medium gap-4">
        <h1 className="font-bold text-2xl">Free Till : </h1>
        <p>-&gt;Cloudflare R2 storage? Nah, it never runs out. Hopefully.</p>
        <p>
          -&gt;Reach the read/write limit of Turso? As if! We&apos;re not
          writing War and Peace here.
        </p>
        <p>-&gt;Vercel&apos;s free tier running out? Well, when pigs fly!</p>
        <p>
          -&gt;More monthly active users than Clerk&apos;s free tier? Ha! We
          would be so lucky.
        </p>
        <p>
          -&gt;Or, you know, I could actually create something people would pay
          for. There&apos;s a novel idea!
        </p>
        <Separator/>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Privacy Policy : </h1>
          <p>
          -&gt;Welcome to my creation, a labor of love and dedication. As the solo
            developer, I&apos;ve poured my heart and soul into this project. Your
            privacy is my utmost priority. Rest assured, I only store your
            username and profile picture, nothing more. Your personal data
            remains just that - personal.
          </p>

          <p>
          -&gt;On the topic of cookies, I believe in transparency. While I don&apos;t
            use cookies directly, my trusted partner, Clerk, might use them as
            part of their authorization process. For more details, I encourage
            you to explore Clerk&apos;s privacy policy.
          </p>

          <p>
          -&gt;Thank you for being a part of my journey. Your trust fuels my
            commitment to create a safe and enjoyable digital experience for
            all.
          </p>
        </div>
        <Link href={"/"} className="border w-fit p-4 rounded-xl bg-muted">
          Go Back to Home
        </Link>
      </div>
    </main>
  );
}
