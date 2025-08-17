import { Button } from "@/components/ui/Button";

export const HablaConNosotros: React.FC = () => {
  return (
    <div className="bg-[#F3F0EC] p-8 w-[340px] h-fit sticky top-12">
      <span className="text-xl text-black mb-6 font-bold">
        Entre
      </span>

      <p className="text-lg leading-8 text-gray-700 mb-4">
        Si tienes alguna pregunta o necesitas más información sobre nuestros
        servicios, no dudes en ponerte en contacto con nosotros.
      </p>

     <Button variant="dark" animateOnClick>
       Habla con nosotros
     </Button>
    </div>
  );
};
