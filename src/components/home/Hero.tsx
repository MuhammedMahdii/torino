import Image from "next/image";

export default function Hero() {
  return (
    <section className="torino-page bg-white">
      <div className="torino-hero">
        <Image
          src="/images/hero-skyline.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="1440px"
        />
      </div>
      <h1 className="torino-headline torino-gutter">
        <span>تورینو</span>
        {" برگزار کننده بهترین تور های داخلی و خارجی"}
      </h1>
    </section>
  );
}
