import Head from 'next/head';
import { Inter } from '@next/font/google';
import useUsers from '@/hooks/useUser';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';
import { useState } from 'react';
import filterUsersBySearchTerm from '@/helpers/filterUsersBySearchTerm';
import AddNewUserModal from '@/components/AddNewUserModal';
import { Plus } from 'lucide-react';
import Input from '@/components/FormComponents/Input';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { users, isLoading, error, revalidate } = useUsers();
  const [filterInput, setFilterInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = filterUsersBySearchTerm(users, filterInput);

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`api/users/${id}`, {
        method: 'DELETE',
      });
      revalidate();
    } catch (err) {}
  };

  if (isLoading && !error) {
    return <h1 className="text-3xl font-bold underline">Loading data...</h1>;
  }

  if (error) {
    return (
      <div className="w-screen h-screen bg-red-500 flex items-center justify-center">
        <h1 className="text-white font-bold text-2xl">An error ocurred</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="p-5 bg-zinc-50 h-screen">
        <div className="ml-5">
          <Input
            placeholder="Search users"
            value={filterInput}
            onChange={event => setFilterInput(event.target.value)}
          />
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-3 p-5 bg-zinc-50">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              handleDeleteButton={() => deleteUser(user.id)}
            />
          ))}
          {filteredUsers.length === 0 && (
            <h1 className="text-red-500">
              No users found! Try looking for a new one
            </h1>
          )}
        </div>
        <button
          className="bg-zinc-600 rounded-full p-4 text-white font-bold absolute right-5 bottom-5 hover:bg-zinc-800 transition-all"
          data-tooltip-target="tooltip-default"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus />
        </button>

        {isModalOpen && (
          <AddNewUserModal handleClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </>
  );
}
