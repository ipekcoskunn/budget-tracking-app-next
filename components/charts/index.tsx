"use client";
import { getFromLocalStorage } from "@/utils/storage";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

type ExpenseData = {
    tarih: string; // ISO formatında tarih: "YYYY-MM-DD"
    expense: number;
};

type IncomeData = {
    tarih: string; // ISO formatında tarih: "YYYY-MM-DD"
    ucret: number;
};

const Charts = () => {
    const [data, setData] = useState<ExpenseData[]>([]);
    const [incomeData, setIncomeData] = useState<IncomeData[]>([]);

    useEffect(() => {
        var storedData = localStorage.getItem("expenses");
        if (storedData) {
            var parsedData: ExpenseData[] = JSON.parse(storedData);
            var sortedData = parsedData.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());

            setData(sortedData);
        }
        var storedIncomeData = localStorage.getItem("incomes");
        if (storedIncomeData) {
            var parsedIncomeData: IncomeData[] = JSON.parse(storedIncomeData);
            var sortedIncomeData = parsedIncomeData.sort((a, b) => new Date(a.tarih).getTime() - new Date(b.tarih).getTime());

            setIncomeData(sortedIncomeData);
            console.log("Sıralanmış Gelirler:" + sortedIncomeData);
        }

    }, []);


    return (
        <div className="md:flex block">
            <div className="expense-barchart my-10 md:w-1/2 sm:w-full w-full md:mx-2 mx-0 h-80" >
                <h2>Gider Grafiği</h2>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="tarih"
                            tickFormatter={(tick) => new Date(tick).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        />
                        <YAxis dataKey="ucret" />
                        <Tooltip
                            labelFormatter={(label) =>
                                `Tarih: ${new Date(label).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })}`
                            }
                        />
                        <Legend />
                        <Bar type="monotone" dataKey="kategori" fill="#781527" name="Kategori" />
                        <Bar type="monotone" dataKey="ucret" fill="#b06670" name="Gider" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="expense-income-linechart my-10 md:w-1/2 sm:w-full w-full md:mx-2 mx-0 h-80" >
                <h2>Gelir ve Giderler (Çizgi Grafik) Grafiği</h2>
                <ResponsiveContainer>
                    <LineChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="tarih"
                            tickFormatter={(tick) => new Date(tick).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        />
                        <YAxis domain={[0, "auto"]} />
                        <Tooltip
                            labelFormatter={(label) =>
                                `Tarih: ${new Date(label).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })}`
                            }
                        />
                        <Legend />
                        <Line type="monotone" data={incomeData} dataKey="ucret" stroke="#781527" name="Gelir" />
                        <Line type="monotone" data={data} dataKey="ucret" stroke="#b06670" name="Gider" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Charts