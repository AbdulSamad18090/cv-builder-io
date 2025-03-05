"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FileText, Menu, LogIn } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../mode-toggler/ModeToggle";

const menues = [
  {
    label: "Resume Templates",
    description:
      "Elegant and professional CV templates for your next career move",
    image: "",
    href: "/resume/templates",
    submenus: [
      {
        label: "Modern",
        href: "/resume/templates?type=modern",
        description: "Clean and contemporary designs",
      },
      {
        label: "Classic",
        href: "/resume/templates?type=classic",
        description: "Traditional and time-tested formats",
      },
      {
        label: "Creative",
        href: "/resume/templates?type=creative",
        description: "Eye-catching and creative designs",
      },
    ],
  },
  {
    label: "Cover Letter Templates",
    description:
      "Professionally crafted cover letter designs to complement your resume",
    image: "",
    href: "/cover-letter/templates",
    submenus: [
      {
        label: "Professional",
        href: "/cover-letter/templates?type=professional",
        description: "Formal and corporate-friendly designs",
      },
      {
        label: "Personal",
        href: "/cover-letter/templates?type=personal",
        description: "Warm and narrative-driven formats",
      },
      {
        label: "Industry-Specific",
        href: "/cover-letter/templates?type=industry",
        description: "Tailored for specific professional sectors",
      },
    ],
  },
  {
    label: "FAQ",
    description:
      "Frequently asked questions about CV building and cover letter design",
    image: "",
    href: "/faq",
  },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b bg-transparent backdrop-blur-sm flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary rotate-6" />
          <span className="text-lg font-semibold">Builder.io</span>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menues.map((menu, menuIndex) => (
              <NavigationMenuItem key={`${menu.label}-${menuIndex}`}>
                {menu.submenus ? (
                  // Render complex navigation with dropdown for menus with submenus
                  <>
                    <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href={menu.href}
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {menu.label}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {menu.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {menu.submenus.map((submenu, submenuIndex) => (
                          <li key={`${submenu.label}-${submenuIndex}`}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={submenu.href}
                                className="block select-none space-y-1 rounded-md p-3 transition-colors hover:bg-accent"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {submenu.label}
                                </div>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                  {submenu.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  // Render simple navigation link for menus without submenus
                  <NavigationMenuLink asChild>
                    <Link
                      href={menu.href}
                      className="block select-none space-y-1 rounded-md p-3 transition-colors hover:bg-accent"
                    >
                      <div className="text-sm font-medium leading-none">
                        {menu.label}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section - Buttons & Avatar */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button className="gap-1">
            <LogIn className="h-4 w-4" />
            <span>Get Started</span>
          </Button>
        </div>

        {/* Mobile Menu - Drawer */}
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-4">
            <nav className="flex flex-col py-4">
              {menues.map((menu, menuIndex) => (
                <div key={`mobile-${menu.label}-${menuIndex}`}>
                  {menu.submenus ? (
                    // Render expandable menu for items with submenus
                    <div>
                      <div className="font-semibold text-primary">
                        {menu.label}
                      </div>
                      <div className="grid grid-cols-2 gap-2 my-2">
                        {menu.submenus.map((submenu, submenuIndex) => (
                          <Link
                            key={`mobile-submenu-${submenu.label}-${submenuIndex}`}
                            href={submenu.href}
                            className="block pl-4 py-2 hover:text-primary text-sm bg-muted/50"
                          >
                            {submenu.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Render simple link for items without submenus
                    <Link
                      href={menu.href}
                      className="text-primary font-semibold"
                    >
                      {menu.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Buttons */}
            <div className="flex gap-2">
              <Button className="gap-1 w-full">
                <LogIn className="h-4 w-4" />
                <span>Get Started</span>
              </Button>
              <ModeToggle />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
