"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
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
import GetStartedButtton from "../get-started-button/GetStartedButtton";

const menues = [
  {
    label: "CV / Resume Templates",
    description:
      "Elegant and professional CV templates for your next career move",
    image: "/images/template-1.webp",
    href: "/templates/resume",
    submenus: [
      {
        label: "Modern",
        href: "/templates/resume?type=modern",
        description: "Clean and contemporary designs",
      },
      {
        label: "Classic",
        href: "/templates/resume?type=classic",
        description: "Traditional and time-tested formats",
      },
      {
        label: "Creative",
        href: "/templates/resume?type=creative",
        description: "Eye-catching and creative designs",
      },
    ],
  },
  {
    label: "Cover Letter Templates",
    description:
      "Professionally crafted cover letter designs to complement your resume",
    image: "/images/cover-letter-1.webp",
    href: "/templates/cover-letter",
    submenus: [
      {
        label: "Professional",
        href: "/templates/cover-letter?type=professional",
        description: "Formal and corporate-friendly designs",
      },
      {
        label: "Personal",
        href: "/templates/cover-letter?type=personal",
        description: "Warm and narrative-driven formats",
      },
      {
        label: "Industry-Specific",
        href: "/templates/cover-letter?type=industry",
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
    <header className="sticky z-50 w-full border-b bg-transparent backdrop-blur-lg flex justify-center">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section - Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary rotate-6" />
          <span className="text-lg font-semibold">Builder.io</span>
        </Link>

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
                              className="relative group flex h-full w-full select-none flex-col justify-end rounded-md overflow-hidden"
                              href={menu.href}
                            >
                              {/* Background Image */}
                              <img
                                src={menu.image}
                                alt="img"
                                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                              />

                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                              {/* Text Content */}
                              <div className="absolute bottom-0 left-0 w-full p-6 text-white transition-all group-hover:translate-y-0 translate-y-8 opacity-0 group-hover:opacity-100">
                                <div className="text-lg font-medium">
                                  {menu.label}
                                </div>
                                <p className="text-sm text-gray-300">
                                  {menu.description}
                                </p>
                              </div>
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
                  <NavigationMenuLink
                    asChild
                    className="shadow-none border-none"
                  >
                    <Link
                      href={menu.href}
                      className="block bg-background select-none space-y-1 rounded-md transition-colors hover:bg-accent"
                    >
                      <Button
                        variant="outline"
                        className="text-sm font-medium leading-none border-none"
                      >
                        {menu.label}
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section - Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <GetStartedButtton />
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
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <GetStartedButtton />
              </div>
              <ModeToggle />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
