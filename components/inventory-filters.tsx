'use client';

import React, { useState } from 'react';
import { ChevronDown, Sliders } from 'lucide-react';

interface InventoryFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  onSortChange?: (sortBy: string) => void;
}

interface FilterState {
  year?: [number, number];
  make?: string;
  type?: string;
}

const YEARS = Array.from({ length: 12 }, (_, i) => new Date().getFullYear() - i);
const MAKES = ['BYD', 'MG', 'Citroën', 'Lincoln', 'Toyota', 'Honda', 'Nissan'];
const TYPES = ['SUV', 'Sedan', 'Hatchback', 'Pickup', 'Eléctrico'];

const SORT_OPTIONS = [
  { label: 'Precio: Menor a Mayor', value: 'price-asc' },
  { label: 'Precio: Mayor a Menor', value: 'price-desc' },
  { label: 'Año: Más Reciente', value: 'year-desc' },
  { label: 'Año: Más Antiguo', value: 'year-asc' },
  { label: 'Tipo / Categoría', value: 'type' },
];

export const InventoryFilters: React.FC<InventoryFiltersProps> = ({
  onFilterChange,
  onSortChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState('price-asc');
  const [selectedMake, setSelectedMake] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    const newFilters = { ...filters, make };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    const newFilters = { ...filters, type };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setShowSort(false);
    onSortChange?.(value);
  };

  const hasActiveFilters = selectedMake || selectedType;

  return (
    <div className="hidden md:flex items-center gap-2">
      {/* Filtros Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            hasActiveFilters
              ? 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Sliders size={16} />
          Filtros
          <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {showFilters && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg p-4 z-20">
            {/* Make Filter */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-2">Marca</label>
              <select
                value={selectedMake || ''}
                onChange={(e) => handleMakeChange(e.target.value || '')}
                className="w-full text-sm border border-slate-300 rounded px-2 py-1"
              >
                <option value="">Todas las marcas</option>
                {MAKES.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-2">Tipo</label>
              <select
                value={selectedType || ''}
                onChange={(e) => handleTypeChange(e.target.value || '')}
                className="w-full text-sm border border-slate-300 rounded px-2 py-1"
              >
                <option value="">Todos los tipos</option>
                {TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedMake(undefined);
                  setSelectedType(undefined);
                  setFilters({});
                  onFilterChange?.({});
                }}
                className="w-full text-xs text-indigo-600 hover:text-indigo-700 font-medium py-1"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* Ordenar Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowSort(!showSort)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Ordenar por
          <ChevronDown size={16} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
        </button>

        {showSort && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-20">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  sortBy === option.value
                    ? 'bg-indigo-100 text-indigo-900 font-medium'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
