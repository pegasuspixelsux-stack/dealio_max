"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
}

export function LeadQualificationChat() {
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "¡Hola! Bienvenido a Dealio Max 🚗. ¿Cómo te llamas?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [userName, setUserName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [budget, setBudget] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (type: "bot" | "user", text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    addMessage("user", userInput);

    if (step === 0) {
      setUserName(userInput);
      addMessage("bot", `Un gusto, ${userInput}. ¿Qué tipo de vehículo estás buscando?`);
      setStep(1);
    }

    setUserInput("");
  };

  const handleOptionSelect = (option: string) => {
    addMessage("user", option);

    if (step === 1) {
      setVehicleType(option);
      addMessage(
        "bot",
        `¡Excelente elección! ¿Cuál es tu presupuesto estimado?`
      );
      setStep(2);
    } else if (step === 2) {
      setBudget(option);
      addMessage(
        "bot",
        `¿Estás listo para comprar ahora o necesitas financiamiento?`
      );
      setStep(3);
    } else if (step === 3) {
      setPaymentType(option);
      addMessage("bot", `¿Cómo prefieres continuar?`);
      setStep(4);
    } else if (step === 4) {
      if (option === "Ver inventario filtrado ahora") {
        addMessage("bot", `¡Perfecto! Mostrando vehículos que coinciden con tu búsqueda...`);
        setTimeout(() => {
          const inventorySection = document.getElementById("inventory");
          inventorySection?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      } else if (option === "Que un asesor me contacte") {
        addMessage(
          "bot",
          `Para que un asesor te contacte, por favor déjanos tu información:`
        );
        setContactName(userName);
        setShowContactForm(true);
      }
    }
  };

  const handleContactSubmit = () => {
    if (!contactName.trim() || !phoneNumber.trim()) return;

    const whatsapp = sameAsPhone ? phoneNumber : whatsappNumber;

    addMessage("user", `${contactName} | ${phoneNumber} | ${whatsapp}`);
    addMessage(
      "bot",
      `¡Muchas gracias, ${contactName}! Un asesor se va a contactar contigo.`
    );

    setShowContactForm(false);
    setLeadSubmitted(true);
    setStep(5);
  };

  const renderOptions = () => {
    const optionsMap: { [key: number]: string[] } = {
      1: ["Sedán", "Cupé", "SUV", "Pick-up"],
      2: ["USD 0 - 5.000", "USD 5.000 - 10.000", "Más de USD 10.000", "Prefiero no decirlo"],
      3: ["Pago contado (Listo para comprar)", "Necesito financiamiento", "Prefiero no decirlo"],
      4: ["Ver inventario filtrado ahora", "Que un asesor me contacte"],
    };

    return optionsMap[step] || [];
  };

  const handleInventoryLink = () => {
    const inventorySection = document.getElementById("inventory");
    inventorySection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="block md:hidden w-[90%] mx-auto space-y-2">
      <div className="rounded-[16px] bg-white border border-gray-200 overflow-hidden flex flex-col h-96 sm:h-80">
      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <div
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  msg.type === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
            {msg.type === "bot" && messages.indexOf(msg) === messages.length - 1 && step > 0 && step < 5 && renderOptions().length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {renderOptions().map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="text-left text-xs px-3 py-2 rounded-full bg-gray-100 hover:bg-indigo-600 text-gray-900 hover:text-white border border-gray-300 hover:border-indigo-600 transition whitespace-nowrap"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Options or Input */}
      <div className="border-t border-gray-200 p-3 bg-white space-y-2">
        {showContactForm ? (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nombre completo"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-600"
            />
            <input
              type="tel"
              placeholder="Número de teléfono"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-600"
            />
            <div className="space-y-1">
              <input
                type="tel"
                placeholder="Número de WhatsApp"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                disabled={sameAsPhone}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-600 disabled:opacity-50"
              />
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsPhone}
                  onChange={(e) => setSameAsPhone(e.target.checked)}
                  className="w-3 h-3"
                />
                Es el mismo número
              </label>
            </div>
            <button
              onClick={handleContactSubmit}
              className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition"
            >
              Enviar datos
            </button>
          </div>
        ) : step === 0 ? (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tu nombre..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-600"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              <Send size={16} />
            </button>
          </div>
        ) : leadSubmitted ? (
          <button
            onClick={() => {
              const inventorySection = document.getElementById("inventory");
              inventorySection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition"
          >
            Explorar inventario ahora
          </button>
        ) : null}
      </div>
      </div>

      {/* Inventory Link - Outside Chat */}
      <div className="text-center">
        <button
          onClick={handleInventoryLink}
          className="text-xs text-gray-600 hover:text-indigo-600 underline cursor-pointer"
        >
          Buscar en nuestro inventario
        </button>
      </div>
    </div>
  );
}
