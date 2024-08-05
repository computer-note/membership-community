import CommonLayout from '@/components/layout/CommonLayout';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='w-[100%]'>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
