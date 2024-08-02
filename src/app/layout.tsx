import CommonLayout from '@/components/layout/CommonLayout';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex flex-col gap-5'>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
