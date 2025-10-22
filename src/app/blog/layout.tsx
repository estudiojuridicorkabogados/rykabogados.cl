import { ContactSectionLight } from "@/components/ContactSectionLight/ContactSectionLight";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <div>
      <div className="relative bg-white pt-8 lg:pt-16 pb-16">
        <div className="absolute top-0 left-0 right-0 h-[320px] bg-[#F3F0ED] z-0" />

        {children}
      </div>

      <ContactSectionLight />
    </div>
  );
}
