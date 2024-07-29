import CommonLayout from '@/components/layout/CommonLayout';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <CommonLayout>{children}</CommonLayout>
    </html>
  );
}
