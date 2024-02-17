"use client";
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, useDisclosure, Badge} from "@nextui-org/react";
import {AcmeLogo,SearchIcon, ShoppingCart} from "@/svg";
import { navLinks } from "@/localdata";
import { usePathname } from 'next/navigation';
import LoginModal from "./LoginComponents/LogInModal";
import { useUser } from "@/providers/Context";
import {signOut, useSession } from "next-auth/react";
export default function Header() {
    const pathname = usePathname()
    const { user, setUser } = useUser();
  const { data: session } = useSession();
  React.useEffect(() => {
    if(session){
    setUser(true)
    }
  console.log(session)
  }, [session,setUser])
  
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  

  return (
    <>
    <Navbar  isMenuOpen={isMenuOpen}  className="w-full p-0" isBordered>
      <NavbarContent className="max-sm:max-w-[27px]" justify="start">
          <NavbarMenuToggle
          onClick={()=> setIsMenuOpen(!isMenuOpen)}
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
              {
            session?.user ?
              <>
                  <Badge placement="bottom-right" className="max-sm:hidden" isOneChar shape="circle" showOutline={false} color="secondary" content={0} size="lg">
                <Button className="max-sm:hidden"  color="default">
                    <ShoppingCart width={24} height={24} className="" />
                          </Button>
                  </Badge>
        <Dropdown className="dark:bg-[#3F3F46] p-0 rounded-lg text-white" placement="bottom-end">
          <DropdownTrigger>
                    <Avatar
              isBordered
              as="button"
              radius="full"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={session?.user?.image}
            />
          </DropdownTrigger>
          <DropdownMenu className="bg-[#27272A] rounded-lg" aria-label="Profile Actions" variant="flat">
            <DropdownItem textValue="profile" key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{session?.user?.email}</p>
            </DropdownItem>
            <DropdownItem textValue="settings" key="settings">My Settings</DropdownItem>
            <DropdownItem textValue="team_settings" key="team_settings">Team Settings</DropdownItem>
            <DropdownItem textValue="analytics" key="analytics">Analytics</DropdownItem>
            <DropdownItem textValue="system" key="system">System</DropdownItem>
            <DropdownItem textValue="configurations" key="configurations">Configurations</DropdownItem>
            <DropdownItem textValue="help_and_feedback" key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem textValue="logout" onClick={() => signOut()}  className="hover:text-white" key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
                </Dropdown>
                </>
              :
              <NavbarItem>
              <Button onClick={onOpen}  className="bg-zink-500 text-white hover:bg-white hover:text-black active:bg-black active:text-white">
                Log in
              </Button>
        </NavbarItem>    
              }
          </NavbarContent>
          <NavbarMenu>
              <div className="w-full flex justify-center items-center">
                  <AcmeLogo/>
              </div>
              <Button className="w-full" isDisabled={user ? false : true} color="default">
              <Badge placement="bottom-right"  isOneChar shape="circle" showOutline={false} color="secondary" content={0} size="sm">
                  <ShoppingCart width={24} height={24}/>
                          </Badge>
                          </Button>
        {navLinks.map((el) => (
          <NavbarMenuItem key={el.id}>
            <Link
              color={"foreground"}
              className="w-full"
              href={el.href}
              size="lg"
              onClick={()=> setIsMenuOpen(!isMenuOpen)}
            >
              {el.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      </Navbar>
      {
      user ? <></> :
      <LoginModal onClose={onClose} isOpen={isOpen} onOpenChange={onOpenChange} />
      }
    </>
  );
}
