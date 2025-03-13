import { lazy, Suspense } from 'react';

const SignInPage = lazy(() => import('@/components/auth/signin'));

export default function SignIn() {
    return <Suspense fallback={<div>Loading...</div>}><SignInPage /></Suspense>;
}
