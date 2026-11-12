import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import SearchBox from "@/components/home/SearchBox";
import TourList from "@/components/home/TourList";
import ContactBanner from "@/components/home/ContactBanner";
import WhyTorino from "@/components/home/WhyTorino";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <SearchBox />
      </Suspense>
      <Suspense
        fallback={
          <div className="container-page py-16 text-center text-soft">در حال بارگذاری...</div>
        }
      >
        <TourList />
      </Suspense>
      <ContactBanner />
      <WhyTorino />
    </>
  );
}
