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
  const [contactInfo, setContactInfo] = useState("");
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
    } else if (step === 4) {
      setContactInfo(userInput);
      addMessage(
        "bot",
        `¡Gracias, ${userName}! Un asesor te contactará a la brevedad. También puedes explorar las unidades abajo.`
      );
      setStep(5);
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
          `Por favor, ingresa tu teléfono o email para que un asesor especializado te contacte:`
        );
        setStep(4);
      }
    }
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
    <div className="block md:hidden rounded-[16px] bg-slate-900/95 border border-slate-700 overflow-hidden flex flex-col h-80">
      {/* Chat Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.type === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-slate-800 text-slate-100 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Options or Input */}
      <div className="border-t border-slate-700 p-3 bg-slate-900 space-y-2">
        {step > 0 && step < 5 && renderOptions().length > 0 ? (
          <div className="space-y-2">
            {renderOptions().map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left text-xs px-3 py-2 rounded-full bg-slate-800 hover:bg-indigo-600 text-white border border-slate-700 transition"
              >
                {option}
              </button>
            ))}
          </div>
        ) : step === 4 && paymentType && !contactInfo ? (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Teléfono o email"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-600"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              <Send size={16} />
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
              className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-600"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              <Send size={16} />
            </button>
          </div>
        ) : step === 5 ? (
          <button
            onClick={() => {
              const inventorySection = document.getElementById("inventory");
              inventorySection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition"
          >
            Ver Inventario General
          </button>
        ) : null}
      </div>

      {/* Inventory Link */}
      <div className="border-t border-slate-700 px-3 py-2 bg-slate-950 text-center">
        <button
          onClick={handleInventoryLink}
          className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
        >
          Buscar en nuestro inventario
        </button>
      </div>
    </div>
  );
}
