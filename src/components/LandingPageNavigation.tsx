import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import NavBarComponent from '@/components/NavBarComponent'
import Image from 'next/image'

const payload = await getPayload({ config: configPromise })

const landingPage = await payload.findGlobal({
  slug: 'home',
})

console.log('landingPage', landingPage)
const layout = landingPage?.layout || []

const LandingPageNavigation = () => {
  return (
    <NavigationMenu className="flex items-center justify-between h-[10vh] w-full px-4 my-4">
      {/* Image Section on the left for larger screens, centered on smaller screens */}
      {typeof landingPage.image !== 'string' && landingPage.image?.url && (
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
          <Image
            src={landingPage.image.url}
            alt={landingPage.image.alt || 'Site logo'}
            className="h-full object-contain"
            width={248}
            height={77}
          />
        </div>
      )}

      {/* Navigation Section on the right */}
      <NavigationMenuList className="hidden md:flex items-center space-x-4">
        {layout?.map((block) => {
          const sectionId = block.blockName ? block.blockName : undefined
          if (sectionId) {
            return (
              <NavBarComponent key={block.id} name={block.blockName} navigationLink={sectionId} />
            )
          }
          return null
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default LandingPageNavigation
