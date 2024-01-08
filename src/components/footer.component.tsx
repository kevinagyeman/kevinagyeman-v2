import { Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer>
        <div className='container mt-5 flex h-24 items-center justify-between gap-4'>
          <div className='flex gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-full'
              asChild
            >
              <Link href='https://github.com/kevinagyeman' target='_blank'>
                <Github className='h-4 w-4' />
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='rounded-full'
              asChild
            >
              <Link
                href='https://www.linkedin.com/in/kevinagyeman/'
                target='_blank'
              >
                <Linkedin className='h-4 w-4' />
              </Link>
            </Button>
          </div>
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
            {`Kevin Agyeman | © ${year}`}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
