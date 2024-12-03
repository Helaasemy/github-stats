'use client';

import { useEffect, useState } from 'react';
import { defineCustomElements, TdsHeader, TdsHeaderBrandSymbol, TdsHeaderHamburger, TdsHeaderTitle } from '@scania/tegel-react';
import { Button } from './button';
import { signOutAction } from '@/app/actions';
import { createClient } from '@/utils/supabase/client';

interface NavProps {
  isLogged: boolean;
}

const Nav = ({ isLogged }: NavProps) => {
  const [session, setSession] = useState<any>(null); 
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session); 
    };
    fetchSession();
  }, [supabase]);

  defineCustomElements();

  return (
    <TdsHeader>
      <TdsHeaderHamburger
        onClick={() => {}}
        aria-label="Open application drawer"
        aria-haspopup="true"
        aria-expanded="false"
      />
      <TdsHeaderTitle>Github Dashboard</TdsHeaderTitle>

      {session?.user && (
        <form action={signOutAction}>
          <Button type="submit" variant={'outline'}>
            Sign out
          </Button>
        </form>
      )}
      <TdsHeaderBrandSymbol slot="end">
        <a aria-label="Scania - red gryphon on blue shield"></a>
      </TdsHeaderBrandSymbol>
    </TdsHeader>
  );
};

export { Nav };
