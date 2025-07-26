import { useState } from 'react';

import { Header, Modal, Sidebar } from '@/components';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <Header setSidebarOpen={setSidebarOpen} />

      <div className='hidden md:inline-block'>
        <Sidebar />
      </div>

      <div className='pt-22 md:pl-75'>{children}</div>

      <div className='md:hidden'>
        <Modal open={sidebarOpen} setOpen={setSidebarOpen} buttonText=''>
          <Sidebar />
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
