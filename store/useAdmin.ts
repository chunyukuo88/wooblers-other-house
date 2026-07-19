import { Session } from 'next-auth';

type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

export function useAdmin(session: Session | null, status: SessionStatus): { isAdmin: boolean } {
  if (!session || !status) {
    return { isAdmin: false };
  }
  if (session?.user?.email) {
    return {
      isAdmin: session.user.email === 'alexgochenour@gmail.com',
    };
  }
  return { isAdmin: false };
}
