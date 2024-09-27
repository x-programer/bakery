import HeroSection from "./components/HeroSection";


export default function Home() {
  return (

    <main className="pt-[96px] sm:pt-[158px]"> 
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <HeroSection />
        {/* Other content */}
      </div>
    </main>

  );
}


// https://www.sweet-touchbakery.com/