import Image from "next/image"
import PricingCards from "@/components/pricing/PricingCards"
import { getWeddingPackages, getWeddingPackageItems } from "@/lib/sheets"

function titleCase(input: string) {
  const clean = decodeURIComponent(input).replace(/[-_]/g, " ").trim()
  if (!clean) return "there"
  return clean
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

export default async function WeddingClientPricingPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  const clientName = titleCase(client)

  const [packages, items] = await Promise.all([
    getWeddingPackages(),
    getWeddingPackageItems(),
  ])

  const packagesWithItems = packages.map((p) => ({
    ...p,
    items: items
      .filter((i) => i.tierKey === p.tierKey)
      .map((i) => ({ item: i.item, type: i.type })),
  }))

  return (
    <main className="bg-white">
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-125 rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                <Image
                  src="/wedding-pricing.png"
                  alt="Capsule Photo Booth wedding setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-block">
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                  Weddings
                </span>
              </div>

              <h1 className="heading-2">Hello {clientName}!</h1>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Thank you for considering Capsule Photo Booth. Below are our
                  three wedding packages designed to offer you a range of
                  options to suit your special day.
                </p>
                <p>
                  All packages feature our DSLR powered photo booth and vintage
                  wooden enclosure, ensuring high-quality photos and a stylish
                  setup that complements any wedding theme.
                </p>
                <p>
                  We are happy to customize a package to fit your specific
                  needs. Please reach out if you have any questions or would
                  like to discuss further.
                </p>
                <p>
                  We do not want pricing to be a barrier to creating lasting
                  memories on your wedding day. If our packages exceed your
                  budget, please let us know. We are committed to working with
                  you to find a solution that fits your financial needs while
                  still providing a memorable experience.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <div className="text-4xl text-primary">3</div>
                  <div className="font-semibold text-gray-800">
                    Package Options
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl text-primary">72hrs</div>
                  <div className="font-semibold text-gray-800">
                    Gallery Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block">
                <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                  Pricing
                </span>
              </div>
              <h2 className="heading-2 mt-4">Wedding Packages</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Clear tiers that scale with coverage and experience design. No
                confusing add-on maze.
              </p>
            </div>

            <div className="mt-12">
              <PricingCards packages={packagesWithItems as any} />
              {/* Add-Ons */}
              <div className="mt-16 max-w-3xl mx-auto text-center">
                <div className="inline-block">
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                    Optional Add-Ons
                  </span>
                </div>

                <h3 className="heading-3 mt-4">Enhance Your Experience</h3>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  We offer a curated selection of add-ons to elevate your photo
                  booth experience. Add-ons are available for an additional fee
                  and can be discussed when finalizing your contract.
                </p>

                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-gray-700">Audio Guest Book</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-gray-700">
                      Wooden Audio Guest Book Stand
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-gray-700">
                      Photo Print Binder Keepsake
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-gray-700">Guest Book</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-gray-700">Fatheads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-secondary" />
                    <span className="text-gray-700">Custom Backdrop</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
