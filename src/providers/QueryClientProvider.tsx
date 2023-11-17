import {ReactNode} from 'react';
import {QueryClientProvider as TanStackQueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '../lib/react-query';

type QueryClientProviderProps = {
    children: ReactNode;
};

export function QueryClientProvider(props: QueryClientProviderProps) {
    const {children} = props;
    return (
        <TanStackQueryClientProvider client={queryClient}>
            {children}
        </TanStackQueryClientProvider>
    );
}