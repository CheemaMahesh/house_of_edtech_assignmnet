import { lazy, Suspense } from 'react';

const SignUpPage = lazy(() => import('@/components/auth/signup'));

export default function SignUp() {
    return <Suspense fallback={<div>Loading...</div>}><SignUpPage /></Suspense>;
}
