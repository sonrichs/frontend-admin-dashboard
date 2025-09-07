import { useEffect, useState } from 'react';
import { getUsers } from '../../../api/resources/userApi';
import type { User } from '../../../api/models/User';
import CreateUserModal from './CreateUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(
    null
  );

  const toggleMenu = (id: number, anchor?: HTMLElement) => {
    setOpenMenuId((prev) => {
      const next = prev === id ? null : id;
      if (next && anchor) {
        const rect = anchor.getBoundingClientRect();
        const dropdownWidth = 144; // w-36
        const left = Math.max(8, rect.right - dropdownWidth);
        const top = rect.bottom + 8; // mt-2
        setMenuPos({ top, left });
      } else {
        setMenuPos(null);
      }
      return next;
    });
  };

  const handleEdit = (user: User) => {
    // TODO: wire to edit flow/modal
    console.log('Edit user', user);
    setOpenMenuId(null);
  };

  const handleDelete = (user: User) => {
    // TODO: wire to delete confirmation/action
    console.log('Delete user', user);
    setOpenMenuId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchData();
  }, []);

  // Close actions dropdown on outside click
  useEffect(() => {
    const handleGlobalPointer = (e: Event) => {
      if (openMenuId === null) return;
      const container = document.querySelector<HTMLElement>(
        `[data-menu-for="${openMenuId}"], [data-floating-menu-for="${openMenuId}"]`
      );
      if (
        container &&
        e.target instanceof Node &&
        !container.contains(e.target)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleGlobalPointer);
    document.addEventListener('touchstart', handleGlobalPointer);
    return () => {
      document.removeEventListener('mousedown', handleGlobalPointer);
      document.removeEventListener('touchstart', handleGlobalPointer);
    };
  }, [openMenuId]);

  // Close on window scroll/resize so menu doesn't drift
  useEffect(() => {
    if (openMenuId === null) return;
    const close = () => setOpenMenuId(null);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [openMenuId]);

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">User List</h1>
      <div className="mb-4 flex justify-end">
        <CreateUserModal />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      user.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-semibold ${
                      user.isAdmin
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td
                  className="relative px-4 py-2"
                  data-menu-for={user.id}
                >
                  <button
                    type="button"
                    onClick={(e) => toggleMenu(user.id, e.currentTarget)}
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 hover:cursor-pointer hover:bg-gray-50"
                    aria-haspopup="menu"
                    aria-expanded={openMenuId === user.id}
                    aria-label={`Open actions for ${user.name}`}
                  >
                    <img
                      src="/dropdown-icon.svg"
                      alt="Actions"
                      className="h-4 w-4"
                    />
                  </button>

                  {openMenuId === user.id && menuPos && (
                    <div
                      className="fixed z-50 w-36 rounded-md border border-gray-200 bg-white shadow-lg"
                      style={{ top: menuPos.top, left: menuPos.left }}
                      data-floating-menu-for={user.id}
                    >
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <button
                          type="button"
                          onClick={() => handleEdit(user)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                          role="menuitem"
                        >
                          <img
                            src="/edit-icon.svg"
                            alt="Edit"
                            className="h-4 w-4"
                          />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                          role="menuitem"
                        >
                          <img
                            src="/trashcan-icon.svg"
                            alt="Delete"
                            className="h-4 w-4 text-red-600"
                          />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
