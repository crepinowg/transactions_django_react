"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PlusCircle, Trash } from "lucide-react"

type Client = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  balance: number;
  created_at: string;
};

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [balance, setBalance] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  // Clients fictifs
  const dummyClients: Client[] = [
    { id: "1", name: "Toviawou", surname: "Crépin", email: "crepin@example.com", phone: "90000001", balance: 150000, created_at: "2026-01-01T10:00:00Z" },
    { id: "2", name: "Doe", surname: "John", email: "john@example.com", phone: "90000002", balance: 80000, created_at: "2026-01-02T11:30:00Z" },
    { id: "3", name: "Smith", surname: "Anna", email: "anna@example.com", phone: "90000003", balance: 120000, created_at: "2026-01-03T14:20:00Z" },
  ];

  useEffect(() => { 
    // Charger les clients fictifs
    setClients(dummyClients);
    toast.success("Clients chargés");
  }, []);

  const addClient = () => {
   
    toast.error("Priere tester au niveau de l'api si possible)");
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
    toast.success("Client supprimé (fictif)");
  };

  return (
    <div className="w-2/3 flex flex-col gap-4" style={{ marginBottom: 650 }}>
      <button className="btn btn-warning"
        onClick={() => (document.getElementById('client_modal') as HTMLDialogElement).showModal()}>
        <PlusCircle className="w-4 h-4" /> Ajouter un client
      </button>

      <div className="overflow-x-auto rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 ">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Solde</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, index) => (
              <tr key={c.id}>
                <th>{index + 1}</th>
                <td>{c.name}</td>
                <td>{c.surname}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.balance.toFixed(2)} FCFA</td>
                <td>
                  <button
                    onClick={() => deleteClient(c.id)}
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

      <dialog id="client_modal" className="modal backdrop-blur">
        <div className="modal-box border-2 border-warning/10 border-dashed">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Ajouter un client</h3>
          <div className="flex flex-col gap-4 mt-4">
            <input type="text" placeholder="Nom" className="input w-full" value={name} onChange={e => setName(e.target.value)} />
            <input type="text" placeholder="Prénom" className="input w-full" value={surname} onChange={e => setSurname(e.target.value)} />
            <input type="email" placeholder="Email" className="input w-full" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="text" placeholder="Téléphone" className="input w-full" value={phone} onChange={e => setPhone(e.target.value)} />
            <input type="number" placeholder="Solde initial" className="input w-full" value={balance} onChange={e => setBalance(e.target.value === "" ? "" : Number(e.target.value))} />
            <button className="btn btn-warning w-full" onClick={addClient} disabled={loading}>
              <PlusCircle className="w-4 h-4" /> Ajouter
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}