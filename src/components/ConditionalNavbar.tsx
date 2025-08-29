'use client';

import { usePathname } from 'next/navigation';
import HomeScreenNavbar from './HomeScreenNavbar';
import Navbar from './Navbar';

const ConditionalNavbar = () => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  if (isHomepage) return <HomeScreenNavbar />;

  return <Navbar />;
};

export default ConditionalNavbar;
