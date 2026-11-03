'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, Flex, DropdownMenu, Text } from '@radix-ui/themes';

function Navbar() {
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ];
    const {status, data: session} = useSession();

    return (
        <nav className='space-x-6 border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align="center" gap="3">
                        <Link href="/"><AiFillBug/></Link>
                        <ul className='flex space-x-6'>
                            {links.map(link =>
                                <li key={link.href}>
                                    <Link className={classNames({
                                        'text-zinc-900': link.href === currentPath,
                                        'text-zinc-500': link.href !== currentPath,
                                        'hover:text-zinc-800 transition-colors': true
                                    })} href={link.href}>{link.label}</Link>
                                </li>
                            )}
                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar
                                        referrerPolicy="no-referrer"
                                        className="cursor-pointer"
                                        src={session.user!.image!} fallback="?" size="2" radius="full"/>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content sideOffset={5} align="end">
                                    <DropdownMenu.Label>
                                        <Text size="2">
                                            <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href="/api/auth/signout">Log Out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
}

export default Navbar
