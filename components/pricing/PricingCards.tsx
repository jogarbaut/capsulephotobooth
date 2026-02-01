type PackageCard = {
  tierKey: string
  title: string
  price: number
  tagline: string
  hours?: string
  prints?: string
  attendants?: string
  featured?: boolean
  items: { item: string; type?: string }[]
}

function formatPrice(num: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num)
}

export default function PricingCards({
  packages,
}: {
  packages: PackageCard[]
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {packages.map((p) => {
        const isFeatured = Boolean(p.featured)

        return (
          <div
            key={p.tierKey}
            className={[
              "rounded-3xl overflow-hidden shadow-xl bg-white transition-transform duration-300 hover:-translate-y-1",
              isFeatured ? "ring-2 ring-primary/20" : "",
            ].join(" ")}
          >
            <div
              className={["p-6", isFeatured ? "bg-primary/5" : "bg-white"].join(
                " ",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                    Wedding Package
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{p.tagline}</p>
                </div>

                {isFeatured ? (
                  <span className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                ) : null}
              </div>

              <div className="mt-5">
                <div className="text-4xl font-extrabold text-primary">
                  {formatPrice(p.price)}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-700">
                  {p.hours ? (
                    <span className="rounded-full bg-gray-100 px-3 py-1">
                      {p.hours} hours
                    </span>
                  ) : null}
                  {p.prints ? (
                    <span className="rounded-full bg-gray-100 px-3 py-1">
                      {p.prints} prints
                    </span>
                  ) : null}
                  {p.attendants ? (
                    <span className="rounded-full bg-gray-100 px-3 py-1">
                      {p.attendants} attendant(s)
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <ul className="mt-6 space-y-3 text-sm text-gray-600 leading-relaxed">
                {p.items.slice(0, 10).map((i, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                    <span>{i.item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs text-gray-500">
                Complimentary setup & breakdown included in every tier.
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
