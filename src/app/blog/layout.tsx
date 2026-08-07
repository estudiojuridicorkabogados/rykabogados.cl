import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div>
      <div className="relative bg-white pt-8 pb-16 lg:pt-16">
        <div className="absolute top-0 right-0 left-0 z-0 h-[320px] bg-[#F3F0ED]" />

        {children}
      </div>

      <ContactSectionLight />
    </div>
  );
}
