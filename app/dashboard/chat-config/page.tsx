"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useSiteSettings, updateSiteSettings, type ChatQuestion, type ChatOptions } from "@/lib/firebase/site-settings";

export default function ChatConfigPage() {
  const { settings, loading } = useSiteSettings();
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingOptionStep, setEditingOptionStep] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newStep, setNewStep] = useState<number>(0);
  const [newOptionText, setNewOptionText] = useState("");

  if (loading) {
    return <div className="p-6">Cargando...</div>;
  }

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;

    const newId = `q${Date.now()}`;
    const updatedQuestions = [
      ...settings.chatQuestions,
      { id: newId, step: newStep, question: newQuestion },
    ];

    await updateSiteSettings({ chatQuestions: updatedQuestions });
    setNewQuestion("");
    setNewStep(0);
  };

  const handleDeleteQuestion = async (id: string) => {
    const updatedQuestions = settings.chatQuestions.filter((q) => q.id !== id);
    await updateSiteSettings({ chatQuestions: updatedQuestions });
  };

  const handleUpdateQuestion = async (id: string, newText: string) => {
    const updatedQuestions = settings.chatQuestions.map((q) =>
      q.id === id ? { ...q, question: newText } : q
    );
    await updateSiteSettings({ chatQuestions: updatedQuestions });
    setEditingQuestionId(null);
  };

  const handleAddOption = async (step: number) => {
    if (!newOptionText.trim()) return;

    const updatedOptions = settings.chatOptions.map((opt) => {
      if (opt.step === step) {
        return {
          ...opt,
          options: [...opt.options, newOptionText],
        };
      }
      return opt;
    });

    // If step doesn't exist, create it
    if (!updatedOptions.some((opt) => opt.step === step)) {
      updatedOptions.push({ step, options: [newOptionText] });
    }

    await updateSiteSettings({ chatOptions: updatedOptions });
    setNewOptionText("");
  };

  const handleDeleteOption = async (step: number, index: number) => {
    const updatedOptions = settings.chatOptions.map((opt) => {
      if (opt.step === step) {
        return {
          ...opt,
          options: opt.options.filter((_, i) => i !== index),
        };
      }
      return opt;
    });

    await updateSiteSettings({ chatOptions: updatedOptions });
  };

  const getOptionsForStep = (step: number) => {
    return settings.chatOptions.find((opt) => opt.step === step)?.options || [];
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurar Chat</h1>
        <p className="mt-2 text-gray-600">Gestiona las preguntas y opciones del chat de calificación de leads</p>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Preguntas del Chat</h2>

        <div className="space-y-3">
          {settings.chatQuestions.map((question) => (
            <div key={question.id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-4">
              <div className="flex-1">
                {editingQuestionId === question.id ? (
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => {
                      const updated = settings.chatQuestions.map((q) =>
                        q.id === question.id ? { ...q, question: e.target.value } : q
                      );
                      // This is a quick update, in a real app you'd debounce
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    autoFocus
                  />
                ) : (
                  <div>
                    <p className="font-medium text-gray-900">{question.question}</p>
                    <p className="text-sm text-gray-500">Paso {question.step}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {editingQuestionId === question.id ? (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateQuestion(question.id, question.question)
                      }
                      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingQuestionId(null)}
                      className="px-3 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingQuestionId(question.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Question */}
        <div className="space-y-3 rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900">Agregar Nueva Pregunta</h3>
          <input
            type="text"
            placeholder="Ingresa la pregunta"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Paso</label>
            <select
              value={newStep}
              onChange={(e) => setNewStep(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              {[0, 1, 2, 3, 4, 5].map((step) => (
                <option key={step} value={step}>
                  Paso {step}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={18} /> Agregar Pregunta
          </button>
        </div>
      </div>

      {/* Options Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Opciones de Respuesta</h2>

        {[1, 2, 3, 4].map((step) => {
          const options = getOptionsForStep(step);
          return (
            <div key={step} className="rounded-lg border border-gray-200 p-4 space-y-3">
              <h3 className="font-medium text-gray-900">Paso {step}</h3>

              <div className="space-y-2">
                {options.map((option, index) => (
                  <div
                    key={`${step}-${index}`}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                  >
                    <span className="text-gray-900">{option}</span>
                    <button
                      onClick={() => handleDeleteOption(step, index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {editingOptionStep === step ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nueva opción"
                    value={newOptionText}
                    onChange={(e) => setNewOptionText(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    autoFocus
                  />
                  <button
                    onClick={() => handleAddOption(step)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => {
                      setEditingOptionStep(null);
                      setNewOptionText("");
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingOptionStep(step)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
                >
                  <Plus size={18} /> Agregar Opción
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
