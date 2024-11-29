"use client";
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Expenses {
    id: number;
    giderAdi: string;
    giderAciklama: string;
    ucret: number;
    tarih: string;
    kategori: string
}

export default function ExpencePage() {
    const [expenses, setExpenses] = useState<Expenses[]>([]);
    const [giderAdi, setGiderAdi] = useState("");
    const [giderAciklama, setGiderAciklama] = useState("");
    const [ucret, setUcret] = useState(0);
    const [tarih, setTarih] = useState("");
    const [kategori, setKategori] = useState("")

    useEffect(() => {
        const storedExpenses = getFromLocalStorage("expenses");
        setExpenses(storedExpenses);
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newExpense = {
            id: expenses.length + 1,
            giderAdi,
            giderAciklama,
            ucret,
            tarih,
            kategori
        };

        const updatedExpenses = [...expenses, newExpense];
        setExpenses(updatedExpenses);

        saveToLocalStorage("expenses", updatedExpenses);

        setGiderAdi("");
        setGiderAciklama("");
        setUcret(0);
        setTarih("");
        setKategori("")
    };

    const handleRemoveExpense = (id: number) => {
        removeFromLocalStorage("expenses", id);

        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    };

    return (
        <div>
            <div className="p-8 md:flex block md:h-screen">
                <div className="md:w-1/2 sm:w-full w-full">
                    <h1 className="text-base font-bold mb-4 text-btnHoverColor">Gider Ekle</h1>
                    <form onSubmit={handleFormSubmit} className="mb-8">
                        <div className="mb-4">
                            <label htmlFor="giderAdi" className="block text-sm font-semibold mb-2">
                                Gider Adı
                            </label>
                            <input
                                type="text"
                                id="giderAdi"
                                value={giderAdi}
                                onChange={(e) => setGiderAdi(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Gider adı"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="giderAciklama" className="block text-sm font-semibold mb-2">
                                Gider Açıklaması
                            </label>
                            <input
                                type="text"
                                id="giderAciklama"
                                value={giderAciklama}
                                onChange={(e) => setGiderAciklama(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Açıklama"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="ucret" className="block text-sm font-semibold mb-2">
                                Ücret (TL)
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

                        <div className="mb-4">
                            <label htmlFor="tarih" className="block text-sm font-semibold mb-2">
                                Tarih
                            </label>
                            <input
                                type="date"
                                id="tarih"
                                value={tarih}
                                onChange={(e) => setTarih(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="kategori" className="block text-sm font-semibold mb-2">
                                Kategori Adı
                            </label>
                            <input
                                type="text"
                                id="kategori"
                                value={kategori}
                                onChange={(e) => setKategori(e.target.value)}
                                placeholder="Kategori Adı"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button type="submit" className="w-auto float-right bg-btnColor text-white p-2 rounded-md hover:bg-btnHoverColor">
                            Kaydet
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 sm:w-full w-full md:p-4 p-0">
                    <h1 className="text-base font-bold mb-4 text-btnHoverColor">Gider Tablosu</h1>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="*:text-start">
                                <th>ID</th>
                                <th>Gider Adı</th>
                                <th>Gider Açıklama</th>
                                <th>Kategori Adı</th>
                                <th>Ücret</th>
                                <th>Tarih</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.length > 0 ? (
                                expenses.map((expense) => (
                                    <tr key={expense.id}>
                                        <td>{expense.id}</td>
                                        <td>{expense.giderAdi}</td>
                                        <td>{expense.giderAciklama}</td>
                                        <td>{expense.kategori}</td>
                                        <td>{expense.ucret} TL</td>
                                        <td>{expense.tarih}</td>
                                        <td> <button
                                            onClick={() => handleRemoveExpense(expense.id)}
                                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                                        >
                                            <FaTrash />
                                        </button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center p-1">
                                        Gider Ekleyin!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}