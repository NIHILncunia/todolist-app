import React from 'react';
import { Nav } from './Nav';

export function Header() {
  return (
    <>
      <header>
        <h1>TodoList</h1>
        <Nav />
      </header>
    </>
  );
}
