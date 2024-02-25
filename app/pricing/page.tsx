"use client";
import Navbar from '../../components/Navbar';
import Container from '../../components/LinkContainer';
import Footer from '../../components/Footer';
export default function Home() {
  return (
    <main>
      <Navbar/>
      <div className='grid grid-cols-1 place-items-center gap-5'>
      <Container className={'font-medium text-lg space-y-4'}>
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
      </Container>
      <Container className={'font-medium text-lg space-y-4'}>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Privacy Policy : </h1>
          <p>
          -&gt;Your privacy is my utmost priority. Rest assured, I only store your
            username and profile picture, nothing more. Your personal data
            remains just that - personal.
          </p>

          <p>
          -&gt;On the topic of cookies, I believe in transparency. While I don&apos;t
            use cookies directly, Clerk, might use them as
            part of their authorization process. For more details, I encourage
            you to explore Clerk&apos;s privacy policy.
          </p>

          <p>
          -&gt;Thank you for being a part of my journey. Your trust fuels my
            commitment to create a safe and enjoyable digital experience for
            all.
          </p>
        </div>
        </Container>
      </div>
      <Footer/>
    </main>
  );
}
