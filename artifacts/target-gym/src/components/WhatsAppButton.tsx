import { MessageCircle } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function WhatsAppButton() {
  const { trackEvent } = useAnalytics();
  const phoneNumber = "351916602658";
  const message = "Olá! Gostaria de mais informações sobre os serviços do Target Personal Training Gym.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    trackEvent("whatsapp_contact", {
      phone: phoneNumber,
    });
  };

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#25d366] hover:bg-[#1fa855] text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      aria-label="WhatsApp"
      data-testid="button-whatsapp"
      title="Enviar mensagem via WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
