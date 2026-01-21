"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Activity, ArrowDownCircle, ArrowUpCircle, PlusCircle, Trash, TrendingDown, TrendingUp, Wallet } from "lucide-react"

type Transaction = {
  id: string;
  text: string;
  amount: number;
  created_at: string
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [text, setText] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false)

  // Transactions fictives
  const dummyTransactions: Transaction[] = [
    { id: "1", text: "Salaire", amount: 200000, created_at: "2026-01-01T10:00:00Z" },
    { id: "2", text: "Achat matériel", amount: -50000, created_at: "2026-01-02T15:30:00Z" },
    { id: "3", text: "Vente produit", amount: 120000, created_at: "2026-01-03T12:45:00Z" },
    { id: "4", text: "Facture électricité", amount: -25000, created_at: "2026-01-04T09:20:00Z" },
  ];

  useEffect(() => {
    // On charge les transactions fictives
    setTransactions(dummyTransactions);
    toast.success("Transactions chargées (fictives)");
  }, []);

  const addTransaction = () => {
    if (!text || amount === "" || isNaN(Number(amount))) {
      toast.error("Pas encore implémenté");
      return;
    }

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      text,
      amount: Number(amount),
      created_at: new Date().toISOString()
    };

    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
    toast.success("Transaction ajoutée (fictive)");
  }

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast.success("Transaction supprimée (fictive)");
  }

  const amounts = transactions.map((t) => Number(t.amount) || 0)
  const balance = amounts.reduce((acc, item) => acc + item, 0) || 0
  const income =
    amounts.filter((a) => a > 0).reduce((acc, item) => acc + item, 0) || 0
  const expense =
    amounts.filter((a) => a < 0).reduce((acc, item) => acc + item, 0) || 0

  const ratio = income > 0 ? Math.min((Math.abs(expense) / income) * 100, 100) : 0

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-2/3 flex flex-col gap-4" style={{marginBottom:650}}>
      {/* Statistiques */}
      <div className="flex justify-between rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex flex-col gap-1">
          <div className=" badge badge-soft">
            <Wallet className="w-4 h4" /> Solde Compte
          </div>
          <div className="stat-value">{balance.toFixed(2)} FCFA</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className=" badge badge-soft badge-success">
            <ArrowUpCircle className="w-4 h4" /> Total Dépots
          </div>
          <div className="stat-value">{income.toFixed(2)} FCFA</div>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className=" badge badge-soft badge-error">
            <ArrowDownCircle className="w-4 h4" /> Total Retrait
          </div>
          <div className="stat-value">{expense.toFixed(2)} FCFA</div>
        </div>
      </div>

      {/* Ajouter transaction */}
      <div className="flex gap-2">
        <button className="btn btn-warning" onClick={addTransaction}>
          <PlusCircle className="w-4 h-4" /> Retrait
        </button>
        <button className="btn btn-success" onClick={addTransaction}>
          <PlusCircle className="w-4 h-4" /> Dépot
        </button>
      </div>

      {/* Table transactions */}
      <div className="overflow-x-auto rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 ">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={t.id}>
                <th>{index + 1}</th>
                <td>{t.text}</td>
                <td className=" font-semibold flex items-center gap-2">
                  {t.amount > 0 ? (
                    <TrendingUp className="text-success w-6 h-6" />
                  ) : (
                    <TrendingDown className="text-error w-6 h-6" />
                  )}
                  {t.amount > 0 ? `+${t.amount}` : `${t.amount}`}
                </td>
                <td>{formatDate(t.created_at)}</td>
                <td>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="btn btn-sm btn-error btn-soft"
                    title="Supprimer"
                  >
                    <Trash className=" w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}