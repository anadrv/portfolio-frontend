import { useState } from "react";

import Layout from "../../Layout/Layout";
import UserCard from "../../components/UserCard";

function Users() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";

  const [search, setSearch] = useState("");

  /* const users apenas para testar como a lista está sendo exibida */ 
  const users = [
    {
      id: 1,
      name: "Rui",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "Kanade",
      role: "TEACHER",
    },
    {
      id: 3,
      name: "Toya",
      role: "COORDINATOR",
    },
    {
      id: 4,
      name: "Ichika",
      role: "NITE",
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="mt-5">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <header className="py-6 text-text font-semibold flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-semibold">Lista de usuários</h1>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Buscar usuário"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white px-3 py-2 rounded-lg text-sm font-normal text-gray-800 outline-none border border-gray-200 focus:border-primary transition"
                />

                <button className="bg-background-white px-4 py-2 rounded-lg text-background text-sm hover:bg-accent cursor-pointer transition">
                  Buscar
                </button>
              </div>
            </header>

            <div
              className="bg-background-white rounded-lg p-6 grid gap-3 w-full items-start content-start"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    name={user.name}
                    role={user.role}
                    isAdmin={isAdmin}
                    onEdit={() => console.log("Editar:", user.name)}
                  />
                ))
              ) : (
                <p className="text-background text-sm">
                  Nenhum usuário encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
