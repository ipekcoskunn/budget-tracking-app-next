"use client";
import React from 'react'
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';

interface Categories {
    id: number;
    kategoriAdi: string;
    ucret: number;
}

interface Expenses {
    id: number;
    kategori: string
}

const CategoriesPage = () => {
    const [expenses, setExpenses] = useState<Expenses[]>([]);
    const [categories, setCategories] = useState<Categories[]>([]);
    const [kategoriAdi, setKategoriAdi] = useState("");
    const [ucret, setUcret] = useState(0);

    useEffect(() => {
        const storedExpenses = getFromLocalStorage("expenses");
        setExpenses(storedExpenses);

        const storedCategories = getFromLocalStorage("categories");
        setCategories(storedCategories);
    }, []);


    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCategori = {
            id: categories.length + 1,
            kategoriAdi,
            ucret,
        };

        const updatedCategories = [...categories, newCategori];
        setCategories(updatedCategories);

        saveToLocalStorage("categories", updatedCategories);
    };
    const handleRemoveCategorie = (id: number) => {
        removeFromLocalStorage("categories", id);

        setCategories(prevCategories => prevCategories.filter(categorie => categorie.id !== id));
    };

    return (
        <div>
            <div className="p-8 md:flex block md:h-screen">
                <div className="md:w-1/2 sm:w-full w-full">
                    <h1 className="text-base font-bold mb-4 text-btnHoverColor">Kategori Bütçesi Belirleyin</h1>
                    <form onSubmit={handleFormSubmit} className="mb-8">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold" htmlFor="kategoriAdi">
                                Kategori Adı
                            </label>
                            <select
                                id="gider_adi"
                                value={kategoriAdi}
                                onChange={(e) => setKategoriAdi(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="">Seçiniz</option>
                                {expenses.length > 0 ? (
                                    [...new Set(expenses.map((expense) => expense.kategori))].map((uniqueCategory, index) => (
                                        <option value={uniqueCategory} key={index}>
                                            {uniqueCategory}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Seçiniz</option>
                                )}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="ucret" className="block text-sm font-semibold mb-2">
                                Kategori Bütçesi (TL)
                            </label>
                            <input
                                type="number"
                                id="ucret"
                                value={ucret}
                                onChange={(e) => setUcret(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Ücret"
                                required
                            />
                        </div>
                        <button type="submit" className="w-auto float-right bg-btnColor text-white p-2 rounded-md hover:bg-btnHoverColor">
                            Kaydet
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 sm:w-full w-full md:p-4 p-0">
                    <h2 className="text-base font-bold mb-4 text-btnHoverColor">Kategori Bütçe Tablosu</h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="*:text-start">
                                <th>ID</th>
                                <th>Kategori Adı</th>
                                <th>Bütçesi</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody className="w-full p-1">
                            {categories.length > 0 ? (
                                categories.map((categori) => (
                                    <tr key={categori.id}>
                                        <td>{categori.id}</td>
                                        <td>{categori.kategoriAdi}</td>
                                        <td>{categori.ucret} TL</td>
                                        <td> <button
                                            onClick={() => handleRemoveCategorie(categori.id)}
                                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                                        >
                                            <FaTrash />
                                        </button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center p-1">
                                        Veriler Yükleniyor...
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default CategoriesPage