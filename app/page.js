import Hero from "@/components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <section className="flex min-h-screen items-center justify-center bg-[#f4f1ea] px-6 text-[#0b0b0f]">
        <div className="max-w-2xl text-center">
          <h2 className="text-4xl font-semibold md:text-6xl">Built for motion.</h2>
          <p className="mt-6 text-lg text-black/60">
            The car&apos;s movement is driven entirely by scroll position using GSAP ScrollTrigger,
            with smoothing applied through the scrub value.
          </p>
        </div>
      </section>
    </main>
  );
}