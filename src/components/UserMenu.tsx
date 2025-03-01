import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, LogOut, Heart, Star, Map } from 'lucide-react';
import { auth } from '../lib/firebase';
import { User } from '../types';
import toast from 'react-hot-toast';

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (auth) {
        await auth.signOut();
        navigate('/');
        toast.success('Logged out successfully');
      }
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex items-center gap-2 rounded-full bg-white p-1 text-sm focus:outline-none">
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 font-medium">
            {user.name?.[0]?.toUpperCase() || 'U'}
          </span>
        </div>
        <span className="hidden md:block text-gray-700">{user.name || 'User'}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/profile')}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
              >
                <UserIcon className="mr-3 h-4 w-4" />
                Profile
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/explore')}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
              >
                <Map className="mr-3 h-4 w-4" />
                Explore
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/profile/favorites')}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
              >
                <Heart className="mr-3 h-4 w-4" />
                Favorites
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => navigate('/profile/reviews')}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
              >
                <Star className="mr-3 h-4 w-4" />
                Reviews
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? 'bg-gray-50' : ''
                } flex w-full items-center px-4 py-2 text-sm text-red-600`}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;