import "./globals.css";

export const metadata = {
  title: "Welcome ItzFizz | Scroll Hero",
  description:
    "Scroll-driven hero section animation built with Next.js, GSAP ScrollTrigger and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0b0b0f] text-white antialiased">{children}</body>
    </html>
  );
}