import SearchBar from '@/components/SearchBar';
import Image from 'next/image';

export default function Home() {
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
      </main>
    </div>
  );
}
