import { Session } from 'next-auth';

type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

export function useAdmin(session: Session | null, status: SessionStatus): boolean {
  if (!session || !status) {
    return false;
  }
  if (session?.user?.email && status === 'authenticated') {
    return session.user.email === 'alexgochenour@gmail.com';
  }
  return false;
}
