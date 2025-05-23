'use client';

import { AuthProvider } from '@/context/AuthContext';
import SidebarLayout from '@/components/SidebarLayout';
import {ToastProvider}  from '@/lib/useToast';
import { Modal } from '@/components/ui/Modal/Modal';
import "./globals.css";

 function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            <Modal>
            <SidebarLayout>
              {children}
              </SidebarLayout>
            </Modal>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

function Layout({ children }) {
  return (
    <RootLayout>
      {children}
    </RootLayout>
  );
}


export default Layout;
