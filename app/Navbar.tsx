'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai'
import classNames from 'classnames'
import { useSession } from 'next-auth/react';
import { Avatar, Box, Container, Flex, DropdownMenu, Text } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

function Navbar() {
    return (
        <nav className='space-x-6 border-b mb-5 px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align="center" gap="3">
                        <Link href="/"><AiFillBug/></Link>
                        <NavLinks/>
                    </Flex>
                    <AuthStatus/>
                </Flex>
            </Container>
        </nav>
    );
}

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
        {label: 'Dashboard', href: '/'},
        {label: 'Issues', href: '/issues'}
    ];

    return <ul className='flex space-x-6'>
        {links.map(link =>
            <li key={link.href}>
                <Link className={classNames({
                    'text-zinc-900!': link.href === currentPath,
                    'nav-link': true
                })} href={link.href}>{link.label}</Link>
            </li>
        )}
    </ul>
}

const AuthStatus = () => {
    const {status, data: session} = useSession();
    if (status === "loading") return <Skeleton width="3rem"/>;

    if (status === "unauthenticated") return <Link className="nav-link" href="/api/auth/signin">Login</Link>;

    return <Box>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    referrerPolicy="no-referrer"
                    className="cursor-pointer"
                    src={session!.user!.image!} fallback="?" size="2" radius="full"/>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content sideOffset={5} align="end">
                <DropdownMenu.Label>
                    <Text size="2">
                        <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Box>
}


export default Navbar
