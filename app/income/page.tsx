"use client";
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Incomes {
    id: number;
    gelirAdi: string;
    gelirAciklama: string;
    ucret: number;
    tarih: string;
}

export default function IncomePage() {
    const [incomes, setIncomes] = useState<Incomes[]>([]);
    const [gelirAdi, setGelirAdi] = useState("");
    const [gelirAciklama, setGelirAciklama] = useState("");
    const [ucret, setUcret] = useState(0);
    const [tarih, setTarih] = useState("");

    useEffect(() => {
        const storedIncomes = getFromLocalStorage("incomes");
        setIncomes(storedIncomes);
    }, []);

    // Formu gönderdiğinde veriyi kaydet
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Yeni gider verisi oluştur
        const newIncome = {
            id: incomes.length + 1, // Basit bir id artışı
            gelirAdi,
            gelirAciklama,
            ucret,
            tarih,
        };

        // Yeni gideri state'e ekle
        const updatedIncomes = [...incomes, newIncome];
        setIncomes(updatedIncomes);

        // LocalStorage'a kaydet
        saveToLocalStorage("incomes", updatedIncomes);

        // Formu sıfırla
        setGelirAdi("");
        setGelirAciklama("");
        setUcret(0);
        setTarih("");
    };

    const handleRemoveIncome = (id: number) => {
        removeFromLocalStorage("incomes", id);

        // State'i güncelleyerek veriyi UI'dan da kaldırıyoruz
        setIncomes(prevIncomes => prevIncomes.filter(income => income.id !== id));
    };

    return (
        <div>
            <div className="p-8 md:flex block md:h-screen">
                <div className="md:w-1/2 sm:w-full w-full">
                    <h1 className="text-base font-bold mb-4 text-btnHoverColor">Gelir Ekle</h1>
                    <form onSubmit={handleFormSubmit} className="mb-8 ">
                        <div className="mb-4">
                            <label htmlFor="gelirAdi" className="block text-sm font-semibold mb-2 ">
                                Gelir Adı
                            </label>
                            <input
                                type="text"
                                id="gelirAdi"
                                value={gelirAdi}
                                onChange={(e) => setGelirAdi(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Gider adı"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="gelirAciklama" className="block text-sm font-semibold mb-2">
                                Gelir Açıklaması
                            </label>
                            <input
                                type="text"
                                id="gelirAciklama"
                                value={gelirAciklama}
                                onChange={(e) => setGelirAciklama(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Açıklama"
                                required
                            />
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
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
                        </div>
                        <button type="submit" className="w-auto float-right bg-btnColor text-white p-2 rounded-md hover:bg-btnHoverColor">
                            Kaydet
                        </button>
                    </form>
                </div>
                <div className="md:w-1/2 sm:w-full w-full md:p-4 p-0">
                    <h2 className="text-base font-bold mb-4 text-btnHoverColor">Gelir Tablosu</h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="*:text-start">
                                <th>ID</th>
                                <th>Gelir Adı</th>
                                <th>Gelir Açıklama</th>
                                <th>Ücret</th>
                                <th>Tarih</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomes.length > 0 ? (
                                incomes.map((income) => (
                                    <tr key={income.id}>
                                        <td>{income.id}</td>
                                        <td>{income.gelirAdi}</td>
                                        <td>{income.gelirAciklama}</td>
                                        <td>{income.ucret} TL</td>
                                        <td>{income.tarih}</td>
                                        <td> <button
                                            onClick={() => handleRemoveIncome(income.id)}
                                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700"
                                        >
                                            <FaTrash />
                                        </button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center p-1">
                                        Gelir Ekleyin!
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
