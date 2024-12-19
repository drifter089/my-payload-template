'use client'

import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function NavBarComponent({ name, navigationLink }: { name: string | null | undefined; navigationLink: string }) {
    // console.log('blocks', prop);
    return (
      <NavigationMenuItem>
        <Link href={`/meethub#${navigationLink}`} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>{name}</NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    )
}