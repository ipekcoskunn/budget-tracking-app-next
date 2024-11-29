"use client";
import { Roboto } from "next/font/google";
import { getFromLocalStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import Charts from "@/components/charts";
import { FaInfoCircle } from "react-icons/fa";

// font family
const roboto = Roboto({ subsets: ["latin"], weight: '400' });

interface Categories {
  id: number;
  kategoriAdi: string;
  ucret: number;
}

interface Expenses {
  id: number;
  kategori: string
  ucret: number
}

export default function Home() {
  const [totalExpenses, setTotalExpenses] = useState<Map<string, number>>(new Map());
  const [budgetWarnings, setBudgetWarnings] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const storedExpenses = getFromLocalStorage("expenses");
    const storedCategories = getFromLocalStorage("categories");

    compareBudget(storedExpenses, storedCategories);
  }, []);

  const compareBudget = (storedExpenses: Expenses[], storedCategories: Categories[]) => {
    const totals = new Map<string, number>();

    storedExpenses.forEach((expense) => {
      if (totals.has(expense.kategori)) {
        totals.set(expense.kategori, totals.get(expense.kategori)! + expense.ucret);
      } else {
        totals.set(expense.kategori, expense.ucret);
      }
    });

    const warnings = new Map<string, string>();

    storedCategories.forEach((category) => {
      const totalExpense = totals.get(category.kategoriAdi) || 0;
      if (totalExpense > category.ucret) {
        warnings.set(category.kategoriAdi, `Bütçe aşımı! ${totalExpense} TL, Sizin Bütçeniz: ${category.ucret} TL`);
      } else {
        //warnings.set(category.kategoriAdi, `Bütçe içinde: ${totalExpense} TL, bütçe: ${category.ucret} TL`);
      }
      setTotalExpenses(totals);
      setBudgetWarnings(warnings)
    });

  };

  return (
    <div className="container mx-auto md:h-screen my-4">
      {Array.from(budgetWarnings.entries()).map(([category, warning]) => (
        <div key={category} id="alert-2" className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-red-400" role="alert">
          <FaInfoCircle />
          <span className="sr-only">Dikkat!</span>
          <div className="ms-3 text-sm font-medium">
            <p className={`font-semibold ${warning.includes('Bütçe aşımı') ? 'text-red-500' : 'text-green-500'}`}>
              {category}: {warning}
            </p></div>
        </div>
      ))}
      <Charts />
    </div>
  );
}
