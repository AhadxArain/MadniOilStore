import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="main-wrapper relative w-full min-h-screen">
    <div className="relative w-full max-w-full mx-auto">
      {children}
    </div>
  </div>
);

export default Layout;