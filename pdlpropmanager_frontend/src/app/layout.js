'use client';

import { AuthProvider } from '@/context/AuthContext';
import SidebarLayout from '@/components/SidebarLayout';
import { ToastProvider } from '@/lib/useToast';
import { Modal } from '@/components/ui/Modal/Modal';
import "./globals.css";
import { ModalContent } from './components/ui/Modal';

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>

            <SidebarLayout>
              <Modal>
                {children}
                <ModalContent />
              </Modal>
            </SidebarLayout>

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
