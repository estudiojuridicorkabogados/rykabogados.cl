import { ContactSection } from "@/components/ContactSection/ContactSection";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div>
      <div className="relative bg-white pt-16 pb-32">
        <div className="absolute top-0 left-0 right-0 h-[320px] bg-[#F3F0ED] z-0" />

        {children}
      </div>

      <ContactSection />
    </div>
  );
}
