import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import doctors from '@/data/doctors.json';
import { Button } from '@/components/ui/button';

export default function Home() {
  console.log(doctors);

  return (
    <div className="relative">
      <main>
        <section
          className="relative h-[425px] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://www.ratemyprofessors.com/assets/rmp-background-DWDoUj8n.jpg')",
          }}>
          <div className="absolute inset-0 bg-[rgba(21,21,21,0.7)]"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="grid grid-cols-10 h-full py-14">
              <div className="col-start-4 col-span-4">
                <div className="flex justify-center text-white text-center">
                  <div className="text-3xl">
                    <Image src="/hero-image.svg" alt="hero" width={500} height={500} />
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 px-20 pb-[300px] relative">
          <div className="absolute inset-0 bg-[url('https://www.ratemyprofessors.com/assets/bkgd-blob-blue-CDXUBOyv.svg')] bg-no-repeat bg-contain -left-[350px] z-0 bottom-10" />
          <div className="text-center relative pb-24">
            <h2 className="text-4xl font-extrabold z-40">Join the RMD Family</h2>
            <p className="text-3xl leading-7 mt-3">Love RMD? Let&apos;s make it official.</p>
          </div>
          <div className="grid grid-cols-8 gap-24 items-stretch relative z-10">
            <div className="col-start-2 col-span-2 flex flex-col justify-between">
              <Image src="/pencil.svg" alt="pencil" width={250} height={250} />
              <p className="text-3xl font-extrabold mt-10">Manage and edit your ratings</p>
            </div>
            <div className="col-span-2 flex flex-col justify-between">
              <Image src="/leaves.svg" alt="leaves" width={250} height={250} />
              <p className="text-3xl font-extrabold mt-10">Your ratings are always anonymous</p>
            </div>
            <div className="col-span-2 flex flex-col justify-between">
              <Image src="/thumbs.svg" alt="thumbs" width={250} height={250} />
              <p className="text-3xl font-extrabold mb-10">Like or dislike ratings</p>
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <Button className="relative z-40 rounded-full px-12 py-6 border border-blue-600">Sign up now!</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
