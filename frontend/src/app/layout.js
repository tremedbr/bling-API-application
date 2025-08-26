import './globals.css';

export const metadata = {
  title: 'Integração Bling OAuth',
  description: 'Sistema de integração com a API do Bling via OAuth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
