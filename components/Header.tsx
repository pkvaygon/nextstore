"use client";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, useDisclosure} from "@nextui-org/react";
import {AcmeLogo,SearchIcon, ShoppingCart} from "@/svg";
import { navLinks } from "@/localdata";
import { usePathname } from 'next/navigation';
import LoginModal from "./LoginComponents/LogInModal";
export default function Header() {
    const pathname = usePathname()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(true)
  return (
    <>
    <Navbar className="w-full p-0" position="sticky" isBordered>
      <NavbarContent className="max-sm:max-w-[27px]" justify="start">
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand className="max-sm:hidden max-sm:max-w-[0px] max-sm:mr-0 mr-4">
          <AcmeLogo />
          <p className="hidden text-white sm:block font-bold text-inherit">JOEL</p>
        </NavbarBrand>
        <NavbarContent className="hidden max-w-full sm:flex gap-3">
        {
        navLinks.map(el => (    
          <NavbarItem key={el.id}>
            <Link
             color={pathname === el.href ? "secondary" : "foreground"}
             underline={pathname === el.href ? "always" : "hover"}
             href={el.href}
            >
              {el.label}
            </Link>
          </NavbarItem>
                        ))
        }
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center w-auto" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[18rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} width={18} height={18} />}
          type="search"
              />
                        <Button className="max-sm:hidden" color="default">
                          <ShoppingCart width={20} height={20} className=""/>
                          </Button>
              {
                  user?
              <NavbarItem>
              <Button onPress={onOpen}  className="bg-zink-500 text-white hover:bg-white hover:text-black active:bg-black active:text-white">
                Log in
              </Button>
        </NavbarItem>         
            :      
        <Dropdown className="dark:bg-[#3F3F46] p-0 rounded-lg text-white" placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu className="bg-[#27272A] rounded-lg" aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem className="hover:text-white" key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
              }
          </NavbarContent>

          <NavbarMenu>
              <div className="w-full flex justify-center items-center">
                  <AcmeLogo/>
              </div>
              <Button color="default">
                  <ShoppingCart width={24} height={24}/>
                          </Button>
        {navLinks.map((el) => (
          <NavbarMenuItem key={el.id}>
            <Link
              color={
               el.id === 2 ? "primary" :el.id === navLinks.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={el.href}
              size="lg"
            >
              {el.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
      <LoginModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </>
  );
}
