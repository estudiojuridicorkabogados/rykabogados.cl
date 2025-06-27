import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/courthouse.jpg"
          alt="Palacio de Justicia de Santiago"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-[#AE8D54] block">TRADICIÓN</span>
            <span className="text-white block">JURÍDICA</span>
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 font-light tracking-wide leading-relaxed max-w-3xl mx-auto">
            MÁS DE 15 AÑOS DEFENDIENDO LA JUSTICIA EN CHILE
          </p>
        </div>

        {/* Explore Button */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <button className="group flex items-center space-x-3 text-white hover:text-[#AE8D54] transition-colors">
            <div className="border border-white/30 rounded-full p-3 group-hover:border-[#AE8D54] transition-colors">
              <ArrowRight className="h-5 w-5 transform rotate-90" />
            </div>
            <span className="font-medium tracking-wide">EXPLORAR</span>
          </button>
        </div>
      </div>
    </section>
  );
};
