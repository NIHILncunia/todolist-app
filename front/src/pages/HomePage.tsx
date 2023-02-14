import React from 'react';
import { AppLayout } from '@/layouts';
import { UserList } from '@/components/Content';

export function HomePage() {
  return (
    <>
      <AppLayout title='홈' url='/'>
        <div id='home-page'>
          <UserList />
        </div>
      </AppLayout>
    </>
  );
}
