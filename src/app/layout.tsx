import CommonLayout from '@/components/layout/CommonLayout';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
