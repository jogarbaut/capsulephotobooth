import Image from "next/image"

type Strip = {
  src: string
  alt: string
  rotate: string
  delayMs: number
}

const STRIPS: Strip[] = [
  {
    src: "/strip-1.png",
    alt: "Photo strip example 1",
    rotate: "-8deg",
    delayMs: 0,
  },
  {
    src: "/strip-2.png",
    alt: "Photo strip example 2",
    rotate: "-4deg",
    delayMs: 200,
  },
  {
    src: "/strip-3.png",
    alt: "Photo strip example 3",
    rotate: "0deg",
    delayMs: 400,
  },
  {
    src: "/strip-4.png",
    alt: "Photo strip example 4",
    rotate: "4deg",
    delayMs: 600,
  },
  {
    src: "/strip-5.png",
    alt: "Photo strip example 5",
    rotate: "8deg",
    delayMs: 800,
  },
]

export default function PhotoStripFan() {
  return (
    // Clamp visuals to viewport so layout width never expands
    <div className="w-full overflow-hidden">
      <div className="flex justify-center">
        <div className="flex items-end">
          {STRIPS.map((strip, idx) => (
            <div
              key={strip.src}
              className={[
                // tighter overlap
                idx === 0 ? "" : "-ml-2 sm:-ml-3",
                "animate-strip-rise motion-reduce:animate-none",
              ].join(" ")}
              style={{ animationDelay: `${strip.delayMs}ms` }}
            >
              <div
                className="relative w-[110px] sm:w-[130px] md:w-[145px] aspect-[1/3.2]"
                style={{ transform: `rotate(${strip.rotate})` }}
              >
                <Image
                  src={strip.src}
                  alt={strip.alt}
                  fill
                  sizes="(max-width: 640px) 110px, (max-width: 1024px) 130px, 145px"
                  className="object-contain drop-shadow-2xl"
                  priority={idx === 2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
