import { RootProvider } from 'fumadocs-ui/provider/next';

export default function Layout({ children }:{children:React.ReactNode}) {
  return (
        <RootProvider>{children}</RootProvider>
  );
}