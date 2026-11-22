import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowLeft, Phone, ArrowRight } from "lucide-react";
import { blogPosts } from "./blog";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateSEOHead,
  absoluteUrl,
  toJsonLdScript,
} from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  // Resolve the article + its listing excerpt for head() and the component.
  // We deliberately do NOT throw notFound() so the component can render its own
  // custom blog-styled 404 rather than the generic root 404.
  loader: ({ params }) => {
    const post = blogContent[params.slug];
    const listing = blogPosts.find((p) => p.slug === params.slug);
    return { post: post ?? null, excerpt: listing?.excerpt ?? "", slug: params.slug };
  },
  head: ({ loaderData }) => {
    const { post, excerpt, slug } = loaderData;
    if (!post) {
      return {
        meta: [
          { title: "Article Not Found | Sleek Automotive Bolton" },
          { name: "robots", content: "noindex, follow" },
          { property: "og:url", content: absoluteUrl(`/blog/${slug}`) },
        ],
        links: [{ rel: "canonical", href: absoluteUrl(`/blog/${slug}`) }],
      };
    }
    const url = absoluteUrl(`/blog/${slug}`);
    const description = excerpt || post.title;
    const keywords = [
      post.title,
      `${post.category} Bolton`,
      `${post.category} Walkden`,
      `${post.category} Manchester`,
      `${post.category} near me`,
      "Sleek Automotive",
    ].join(", ");
    const seoHead = generateSEOHead({
      title: `${post.title} | Sleek Automotive`,
      description,
      keywords,
      canonical: url,
      ogImage: "/logo.png",
      type: "article",
      publishedTime: post.date,
    });
    return {
      meta: [
        ...seoHead.meta,
        { property: "article:section", content: post.category },
      ],
      links: seoHead.links,
      scripts: [
        {
          children: toJsonLdScript([
            generateArticleSchema({
              title: post.title,
              description: description,
              publishedDate: post.date,
              image: "/logo.png",
              slug,
            }),
            generateBreadcrumbSchema(`/blog/${slug}`),
          ]),
        },
      ],
    };
  },
  component: BlogPostPage,
});

// SEO-optimized blog content with trending automotive keywords 2026
const blogContent: Record<string, any> = {
  "mot-failed-what-to-do-next-bolton": {
    title: "MOT Failed in Bolton? What to Do Next and How to Get Back on the Road",
    category: "MOT Testing",
    date: "2026-11-22",
    readTime: "5 min",
    content: `
<h2>Your MOT failed — take it one step at a time</h2>
<p>An MOT failure can be stressful, but the result gives you a clear list of what needs attention. Read the failure report carefully, ask the tester to explain anything unclear and get a written quote before authorising repairs.</p>

<h3>Understand the result</h3>
<p>The report separates defects by severity and may also list advisories. Advisories are items to monitor or repair soon; they are not the same as a failed test. Major or dangerous defects cause a failure, and dangerous defects mean the vehicle should not be driven until they are repaired. If you are unsure whether your car is safe or legal to move, ask the test centre before driving it.</p>

<h3>What to do after a failed MOT</h3>
<ol>
  <li><strong>Get the full report.</strong> Keep the defect list and ask for an explanation in plain language.</li>
  <li><strong>Compare repair options.</strong> Request an itemised quote and ask which work is needed to address the failure.</li>
  <li><strong>Choose where to repair it.</strong> You can ask the test centre to do the repairs or arrange another garage. Confirm retest arrangements and any fees before work starts.</li>
  <li><strong>Keep the paperwork.</strong> Save the repair invoice and retest result with your vehicle records.</li>
</ol>

<h3>Can you drive a car that has failed its MOT?</h3>
<p>It depends on the vehicle's current MOT status and the defects recorded. A dangerous defect must be fixed before the vehicle is driven. If the previous MOT has expired, there are only limited circumstances in which you may drive to a pre-booked test or to a place for repairs. Check the report and get advice from the test centre rather than guessing.</p>

<h3>Common issues to discuss with the tester</h3>
<ul>
  <li>Lighting, visibility and number plate faults</li>
  <li>Tyre tread, damage or pressure problems</li>
  <li>Brake performance and warning lights</li>
  <li>Steering, suspension or excessive play</li>
  <li>Emissions or engine warning-light concerns</li>
</ul>
<p>The report is specific to your vehicle, so avoid replacing parts based on a general checklist alone.</p>

<h3>Need an MOT retest or repair in Bolton?</h3>
<p>Sleek Automotive is in Walkden, serving Bolton, Worsley and Greater Manchester. Read about our <a href="/services/mot-service">MOT and servicing</a>, then <a href="/contact">contact the garage</a> to discuss your report and available appointments. Retest terms depend on the work and timing, so confirm them when you book.</p>
    `,
  },
  "car-battery-replacement-bolton-warning-signs": {
    title: "Car Battery Replacement in Bolton: Warning Signs You Shouldn't Ignore",
    category: "Car Maintenance",
    date: "2026-11-22",
    readTime: "5 min",
    content: `
<h2>Is your car battery losing its charge?</h2>
<p>A weak battery can turn a normal morning into a car that will not start. Short journeys, cold weather, an ageing battery or an electrical fault can all contribute. The symptoms can overlap with charging-system problems, so testing is better than replacing parts by guesswork.</p>

<h3>Six signs your battery needs checking</h3>
<ul>
  <li><strong>Slow engine cranking:</strong> the engine turns over more slowly than usual.</li>
  <li><strong>Repeated jump-starts:</strong> the car starts with assistance but goes flat again.</li>
  <li><strong>Dim or flickering lights:</strong> especially when starting the engine.</li>
  <li><strong>Battery warning light:</strong> this can indicate a charging fault as well as a battery issue.</li>
  <li><strong>Electrical features behaving oddly:</strong> such as central locking or dashboard electronics cutting out.</li>
  <li><strong>Visible damage:</strong> corrosion around terminals, a swollen case or a leaking battery needs professional attention.</li>
</ul>

<h3>Battery, alternator or something else?</h3>
<p>A flat battery is not always the cause. The alternator may not be charging correctly, a connection may be loose or an electrical component may be draining power while the car is parked. A proper battery and charging-system test helps identify the cause and prevents fitting a new battery that could go flat too.</p>

<h3>How to help your battery last</h3>
<ul>
  <li>Have the battery checked if starting becomes noticeably slower.</li>
  <li>Switch off lights and accessories when leaving the vehicle.</li>
  <li>If the car is used mainly for short trips, ask a technician whether the charging system is keeping up.</li>
  <li>Do not handle a damaged or leaking battery; arrange professional help.</li>
</ul>
<p>Battery life varies with the vehicle, usage and conditions. A test can tell you more than the battery's age alone.</p>

<h3>Book a battery test in Bolton</h3>
<p>Sleek Automotive offers battery testing and replacement in Walkden, near Bolton. See our <a href="/services/aircon-battery">battery and electrical services</a> or <a href="/contact">get in touch</a> to arrange a check. If the battery warning light is on or the car repeatedly fails to start, describe the symptoms when booking.</p>
    `,
  },
  "wheel-alignment-bolton-symptoms": {
    title: "Wheel Alignment in Bolton: 6 Signs Your Car Needs Its Tracking Checked",
    category: "Tyres",
    date: "2026-11-22",
    readTime: "5 min",
    content: `
<h2>What does wheel alignment mean?</h2>
<p>Wheel alignment, often called tracking, is the adjustment of wheel angles to the vehicle manufacturer's specifications. Correct alignment helps the car travel predictably and can reduce uneven tyre wear. It is different from wheel balancing, which addresses vibration caused by how a wheel and tyre rotate.</p>

<h3>Six signs to look out for</h3>
<ul>
  <li><strong>The car pulls to one side</strong> on a reasonably level road.</li>
  <li><strong>The steering wheel sits off-centre</strong> when you are travelling straight.</li>
  <li><strong>Tyres wear unevenly</strong> across the inner or outer edge.</li>
  <li><strong>The steering feels less settled</strong> or needs frequent correction.</li>
  <li><strong>You have recently hit a pothole or kerb</strong> and the handling feels different.</li>
  <li><strong>New tyres wear unusually quickly</strong> despite correct pressure and sensible use.</li>
</ul>
<p>These symptoms can also come from tyre pressure, worn suspension parts, brakes or road camber. An inspection is needed to identify the actual cause.</p>

<h3>Why alignment can change</h3>
<p>A hard impact with a pothole or kerb can alter wheel settings. Normal wear to steering and suspension components can also affect alignment. If a component is damaged or worn, adjusting the tracking alone may not solve the problem, so the condition of the tyres and suspension should be checked first.</p>

<h3>What happens during an alignment check?</h3>
<p>A technician checks the tyres and steering, measures the wheel angles with alignment equipment and compares the results with the vehicle's specifications. If adjustment is suitable, the angles are corrected and checked again. Ask for the readings and an explanation if any parts need attention before adjustment.</p>

<h3>Book a wheel alignment check in Bolton</h3>
<p>If your car pulls or your tyres are wearing unevenly, have it inspected before replacing tyres. Sleek Automotive serves Walkden, Bolton and nearby areas. Explore our <a href="/services/tyres-brakes">tyre and brake services</a> or <a href="/contact">book an inspection</a>. Checking tyre pressures regularly and having new steering or suspension parts inspected can also help keep handling predictable.</p>
    `,
  },
  "mot-near-me-bolton-walkden": {
    title: "MOT Near Me Bolton: Same-Day Slots, £39.99, Free Retest",
    category: "MOT Testing",
    date: "2026-11-28",
    readTime: "5 min",
    content: `
<h2>Looking for an MOT Near Bolton or Walkden?</h2>
<p>If you've searched "MOT near me Bolton" or "MOT Walkden", you've found us. Sleek Automotive is located at Unit 7, Walkden Business Park, Manchester M38 9AL — 2 minutes off Junction 4 of the M61, serving Bolton, Walkden, Salford, Worsley, and Little Hulton.</p>

<h3>Our MOT Pricing</h3>
<ul>
  <li><strong>MOT Test: £39.99</strong> — DVSA maximum is £54.85, we charge less</li>
  <li><strong>Free retest</strong> — if your car fails and returns within 10 working days</li>
  <li><strong>Free pre-MOT check</strong> — we flag issues before the test so there are no surprises</li>
</ul>

<h3>Same-Day MOT Slots Available</h3>
<p>Unlike bigger chains, we don't make you wait weeks. Most days we have same-day or next-day availability. Call 01617 063 645 before 10am and we'll usually fit you in that afternoon.</p>

<h3>What We Check in Your MOT</h3>
<ul>
  <li><strong>Lights:</strong> Headlights, brake lights, indicators, number plate lights</li>
  <li><strong>Brakes:</strong> Pads, discs, handbrake, brake fluid</li>
  <li><strong>Tyres:</strong> Tread depth (min 1.6mm), condition, pressure</li>
  <li><strong>Steering:</strong> Play, response, power steering</li>
  <li><strong>Suspension:</strong> Shock absorbers, springs, bushings</li>
  <li><strong>Emissions:</strong> Exhaust gases for petrol & diesel</li>
  <li><strong>Body & Structure:</strong> Rust, damage, wipers, horn, seatbelts</li>
</ul>

<h3>Most Common MOT Failures We See in Bolton</h3>
<p>Based on the thousands of MOTs we've done since 2018:</p>
<ol>
  <li><strong>Lighting faults (32%)</strong> — a bulb costs £5-15 and takes 5 minutes</li>
  <li><strong>Tyre condition (21%)</strong> — worn below 1.6mm or cracked sidewalls</li>
  <li><strong>Brake issues (18%)</strong> — worn pads or seized caliper</li>
  <li><strong>Suspension (12%)</strong> — worn shock absorbers from Bolton's potholes</li>
  <li><strong>Emissions (9%)</strong> — DPF issues on diesels</li>
</ol>

<h3>How to Prepare for Your MOT</h3>
<p>Takes 5 minutes the night before — could save your MOT fee:</p>
<ul>
  <li>Walk around the car and check all lights work</li>
  <li>Check tyre tread with a 20p coin (can't see the outer band = illegal)</li>
  <li>Make sure windscreen washer fluid is topped up</li>
  <li>Check number plates are clean and secure</li>
  <li>Make sure horn works</li>
</ul>

<h3>Can I Drive to an MOT Without a Valid MOT?</h3>
<p><strong>Yes — but only to a pre-booked test.</strong> This is the one exception to the law. If your MOT has expired, you can drive directly to your pre-booked test appointment and back — nothing else.</p>
<p>Driving anywhere else with an expired MOT is illegal: up to £1,000 fine + insurance void.</p>

<h3>How Far Are We From Bolton Town Centre?</h3>
<p>We're in Walkden, Little Hulton — approximately:</p>
<ul>
  <li><strong>Bolton town centre:</strong> 8 minutes (via A6053)</li>
  <li><strong>Worsley:</strong> 5 minutes</li>
  <li><strong>Salford:</strong> 12 minutes</li>
  <li><strong>Swinton:</strong> 8 minutes</li>
  <li><strong>M61 Junction 4:</strong> 2 minutes</li>
</ul>
<p><strong>Address:</strong> Unit 7, Walkden Business Park, Mount Skip Lane, Walkden, Manchester M38 9AL</p>

<h3>Book Your MOT Today</h3>
<p>Call <strong>01617 063 645</strong> or book online. Mon–Fri 9am–6pm, Sat 9am–4pm.</p>
<p>We're DVSA approved, fully insured, and we've passed over 15,000 vehicles since 2018.</p>
    `,
  },

  "how-much-does-car-service-cost-uk-2026": {
    title: "How Much Does a Car Service Cost in 2026? Honest UK Prices",
    category: "Car Servicing",
    date: "2026-11-26",
    readTime: "6 min",
    content: `
<h2>What Does a Car Service Actually Cost in 2026?</h2>
<p>It's one of the most Googled questions about cars — and the answers online are either vague or wildly out of date. Here's what you'll actually pay at an independent garage in the North West, and what's included.</p>

<h3>Service Prices at Sleek Automotive (2026)</h3>

<h4>Interim Service — £89</h4>
<p><strong>Best for:</strong> High-mileage drivers (15,000+ miles/year) or every 6 months</p>
<p><strong>Includes:</strong></p>
<ul>
  <li>Engine oil change (up to 5L quality oil)</li>
  <li>Oil filter replacement</li>
  <li>Fluid level checks (coolant, brake, washer, power steering)</li>
  <li>Tyre condition & pressure check (all 4)</li>
  <li>Visual brake inspection</li>
  <li>Lights check</li>
  <li>Digital inspection report</li>
</ul>

<h4>Full Service — £149</h4>
<p><strong>Best for:</strong> Annual service for most drivers</p>
<p><strong>Everything in interim, plus:</strong></p>
<ul>
  <li>Air filter replacement</li>
  <li>Cabin pollen filter replacement</li>
  <li>Spark plugs inspection (petrol)</li>
  <li>Coolant concentration check</li>
  <li>Exhaust system check</li>
  <li>Suspension & steering inspection</li>
  <li>Full diagnostic scan (checks for hidden fault codes)</li>
  <li>50-point inspection with photos</li>
  <li>Service history stamp</li>
</ul>

<h4>Major Service — £249</h4>
<p><strong>Best for:</strong> Every 2 years or 24,000 miles</p>
<p><strong>Everything in full service, plus:</strong></p>
<ul>
  <li>Brake fluid replacement</li>
  <li>Coolant flush & replacement</li>
  <li>Fuel filter (diesel cars)</li>
  <li>Timing belt inspection (or replacement if due)</li>
  <li>Gearbox fluid check</li>
</ul>

<h3>What Affects the Price?</h3>

<h4>1. Engine Oil Grade</h4>
<p>Standard semi-synthetic is included in our price. If your car requires fully synthetic (most modern cars do), add £15-25. We'll always confirm before we start.</p>

<h4>2. Vehicle Type</h4>
<p>Diesel cars sometimes cost slightly more — DPF checks, diesel-specific filters. We'll quote upfront.</p>

<h4>3. Additional Parts Found During Inspection</h4>
<p>If we find worn spark plugs, a cracked air filter, or low brake fluid — we'll quote before touching anything. You choose what to fix.</p>

<h3>Main Dealer vs Independent Garage — The Real Cost Difference</h3>
<table style="width:100%; border-collapse:collapse; font-size:14px;">
  <thead style="background:#1a56db; color:white;">
    <tr><th style="padding:10px; text-align:left;">Service</th><th style="padding:10px;">Main Dealer</th><th style="padding:10px;">Sleek Automotive</th></tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #ddd;"><td style="padding:10px;">Interim Service</td><td style="padding:10px; text-align:center;">£140-180</td><td style="padding:10px; text-align:center;"><strong>£89</strong></td></tr>
    <tr style="border-bottom:1px solid #ddd;"><td style="padding:10px;">Full Service</td><td style="padding:10px; text-align:center;">£220-320</td><td style="padding:10px; text-align:center;"><strong>£149</strong></td></tr>
    <tr style="border-bottom:1px solid #ddd;"><td style="padding:10px;">Major Service</td><td style="padding:10px; text-align:center;">£380-500</td><td style="padding:10px; text-align:center;"><strong>£249</strong></td></tr>
  </tbody>
</table>
<p style="margin-top:10px; font-size:13px; color:#666;">We use the same quality OEM-spec parts. Your manufacturer warranty stays valid under Block Exemption Regulation.</p>

<h3>Does Independent Servicing Void My Warranty?</h3>
<p><strong>No.</strong> Under EU Block Exemption Regulation (retained in UK law), manufacturers cannot void your warranty because you used an independent garage — as long as the service is carried out to their schedule using equivalent quality parts. We always use OEM-spec parts and stamp your service book.</p>

<h3>How Often Should You Service Your Car?</h3>
<ul>
  <li><strong>Under 10,000 miles/year:</strong> Full service annually</li>
  <li><strong>10,000-15,000 miles/year:</strong> Full service annually</li>
  <li><strong>Over 15,000 miles/year:</strong> Interim service every 6 months + full service annually</li>
</ul>

<h3>Book a Service in Bolton</h3>
<p>Call <strong>01617 063 645</strong> or book online. We'll confirm the exact price for your vehicle before you arrive — no surprises.</p>
<p>Walkden, Manchester M38 9AL — 8 minutes from Bolton town centre.</p>
    `,
  },

  "dpf-cleaning-bolton-manchester": {
    title: "DPF Warning Light On? DPF Cleaning Bolton — What It Costs & How It Works",
    category: "Diagnostics",
    date: "2026-11-22",
    readTime: "7 min",
    content: `
<h2>DPF Warning Light On? Don't Ignore It</h2>
<p>The DPF (Diesel Particulate Filter) warning light is one of the most misunderstood dashboard lights on modern diesel cars. Many drivers ignore it — and end up paying £1,200+ for a replacement that could have been avoided with a £150 clean.</p>

<h3>What Is a DPF?</h3>
<p>The DPF traps soot from your diesel exhaust to reduce emissions. Over time — especially in town driving — it fills up. When it gets too full, the warning light comes on.</p>
<p>Normally the DPF cleans itself through a process called <strong>passive regeneration</strong> — when you drive at motorway speeds, the exhaust gets hot enough to burn off the soot automatically. If you mostly do short town trips, it never gets hot enough and soot builds up.</p>

<h3>DPF Warning Light — What It Means</h3>

<h4>Amber DPF Light (Early Warning)</h4>
<p>The filter is getting full but can still be saved. At this stage:</p>
<ul>
  <li><strong>Try a motorway run first:</strong> Drive at 60mph+ for 30 minutes. This may trigger passive regeneration and clear the light</li>
  <li><strong>If the light stays on after the motorway run:</strong> Come in for a forced regeneration</li>
</ul>

<h4>Orange/Red DPF Light (Serious)</h4>
<p>The filter is critically blocked. Do not attempt a motorway run. Come straight to us — forced regeneration in our workshop is needed.</p>

<h4>DPF Light + Other Warning Lights</h4>
<p>If you see DPF light alongside engine management light, glow plug light, or limp mode — stop driving and call us on 01617 063 645. This usually means the DPF is beyond forced regeneration and may need replacement.</p>

<h3>DPF Cleaning Options & Costs</h3>

<h4>Option 1: Forced Regeneration (In-Workshop) — From £150</h4>
<p>We connect our diagnostic equipment and run a forced regeneration cycle. The workshop computer controls the process — raising exhaust temperatures to burn off the soot safely. Takes 45-90 minutes.</p>
<p><strong>Works when:</strong> Soot loading below 85%, no other faults present</p>
<p><strong>Success rate:</strong> ~85% of cases at this stage</p>

<h4>Option 2: DPF Chemical Clean — From £250</h4>
<p>We inject specialist cleaning solution into the DPF and run a hot forced regeneration cycle. This tackles stubborn blockages that forced regen alone can't clear.</p>
<p><strong>Works when:</strong> Soot loading 85-95%, heavy ash accumulation</p>

<h4>Option 3: DPF Replacement — £600-1,400</h4>
<p>When the filter is damaged, cracked, or beyond cleaning. Price depends heavily on the vehicle:</p>
<ul>
  <li>Ford Focus/Fiesta diesel: £600-800 fitted</li>
  <li>VW Golf/Passat TDI: £750-950 fitted</li>
  <li>BMW 3 Series diesel: £900-1,200 fitted</li>
  <li>Range Rover: £1,100-1,400 fitted</li>
</ul>

<h3>Why Bolton Drivers Get DPF Problems</h3>
<p>Short journeys dominate Bolton driving patterns — school runs, town centre trips, A580 stop-start traffic. These short trips don't give the DPF time to regenerate.</p>
<p><strong>If you drive mostly in town:</strong></p>
<ul>
  <li>Take a 30-minute motorway run every 2-3 weeks</li>
  <li>Use quality diesel (Shell V-Power, BP Ultimate) occasionally — better for DPF</li>
  <li>Consider an annual DPF service as preventive maintenance</li>
</ul>

<h3>Can I Drive With the DPF Light On?</h3>
<ul>
  <li><strong>Amber light only:</strong> Try a motorway run. If it stays on, book same week.</li>
  <li><strong>Red/orange light:</strong> Stop motorway driving immediately. Book within 24 hours.</li>
  <li><strong>Multiple warning lights:</strong> Stop driving. Call us.</li>
</ul>
<p>Continuing to drive with a critically blocked DPF can damage the turbo, catalytic converter, and engine — turning a £150 problem into a £3,000+ repair.</p>

<h3>DPF Diagnostic & Cleaning in Bolton</h3>
<p>We use the latest diagnostic equipment to read exact soot loading levels before recommending any work. We'll always tell you honestly whether cleaning will work or if replacement is needed.</p>
<p><strong>DPF diagnostic:</strong> £45 (free if you proceed with cleaning or repair)</p>
<p><strong>Call 01617 063 645</strong> — same-day diagnostic appointments usually available.</p>
<p>Unit 7, Walkden Business Park, Manchester M38 9AL — 8 minutes from Bolton.</p>
    `,
  },

  "pothole-damage-car-bolton": {
    title: "Hit a Pothole in Bolton? Here's What to Check (And Who to Claim From)",
    category: "Repairs",
    date: "2026-11-18",
    readTime: "6 min",
    content: `
<h2>Bolton's Potholes Are Getting Worse — And Your Car Is Paying the Price</h2>
<p>Greater Manchester has some of the worst road surfaces in England. A 2024 RAC report ranked Greater Manchester in the bottom 5 regions for road quality. If you've hit a pothole on the A6, A580, or any of Bolton's residential roads recently, here's exactly what to do.</p>

<h3>Check These Immediately After Hitting a Pothole</h3>
<p>Pull over safely as soon as you can and check:</p>

<h4>1. Tyres (Most Common Damage)</h4>
<ul>
  <li><strong>Bulge or bubble on sidewall:</strong> Stop driving immediately — tyre could blow out at any moment</li>
  <li><strong>Flat tyre:</strong> Obvious, but check all 4 — sometimes slow punctures take minutes to show</li>
  <li><strong>Cuts or gashes:</strong> Even small cuts in the sidewall mean replacement</li>
  <li><strong>Cracking along tread:</strong> May indicate impact damage inside</li>
</ul>
<p><strong>Important:</strong> A sidewall bulge is NOT repairable. The tyre must be replaced — usually £60-100 fitted.</p>

<h4>2. Wheels (Alloy Damage)</h4>
<ul>
  <li>Look for cracks, bends, or chips on the rim</li>
  <li>A bent alloy causes vibration and uneven tyre wear</li>
  <li>Cracked alloy is dangerous — the tyre can deflate suddenly</li>
</ul>
<p>Minor cosmetic scuffs are fine. Structural damage needs repair or replacement (£80-200 per wheel).</p>

<h4>3. Steering (Do This Test)</h4>
<p>On a safe, straight empty road, briefly let go of the steering wheel. If the car pulls to one side, your wheel alignment is out. Pothole hits commonly knock alignment out — causing:</p>
<ul>
  <li>Uneven tyre wear (can destroy a tyre in weeks)</li>
  <li>Worse fuel economy</li>
  <li>Pulling to one side under braking (dangerous)</li>
</ul>
<p><strong>Wheel alignment check & adjustment: £45</strong> — always worth doing after a big pothole hit.</p>

<h4>4. Suspension</h4>
<p>Serious pothole hits can damage:</p>
<ul>
  <li><strong>Shock absorbers</strong> — if car bounces more than once after a bump</li>
  <li><strong>Springs</strong> — car sitting lower on one corner</li>
  <li><strong>Wishbones & control arms</strong> — clunking noise over bumps</li>
  <li><strong>Steering rack</strong> — stiff steering or pulling</li>
</ul>

<h4>5. Exhaust</h4>
<p>Deep potholes can catch your exhaust — especially on lowered cars. Listen for loud rattling or scraping underneath. A cracked exhaust gets worse quickly and will fail MOT.</p>

<h3>How to Claim Compensation from Bolton Council</h3>
<p>You can claim for pothole damage from the local authority responsible for that road. Here's how:</p>

<h4>Step 1: Document Everything</h4>
<ul>
  <li>Take photos of the pothole (with something for scale — your foot or a coin)</li>
  <li>Note the exact location (street name, nearest landmark)</li>
  <li>Time and date of the incident</li>
  <li>Photos of your tyre/wheel damage</li>
  <li>Keep all repair receipts</li>
</ul>

<h4>Step 2: Who Is Responsible?</h4>
<ul>
  <li><strong>Bolton Council:</strong> Local roads, residential streets — <a href="https://www.bolton.gov.uk/roads" style="color:#1a56db;">www.bolton.gov.uk/roads</a></li>
  <li><strong>Transport for Greater Manchester:</strong> Some A-roads</li>
  <li><strong>National Highways:</strong> Motorways (M61, M60, M62)</li>
</ul>

<h4>Step 3: Submit Your Claim</h4>
<p>Visit <strong>www.bolton.gov.uk</strong> → Highways → Report a pothole / Make a claim. Include:</p>
<ul>
  <li>Your photos and incident details</li>
  <li>Repair quotes or receipts</li>
  <li>Your vehicle details</li>
</ul>

<h4>Realistic Expectations</h4>
<p>Councils often reject first claims — especially if the pothole was recently reported. Keep all evidence and appeal if rejected. Many drivers get £100-300 back on successful claims.</p>

<h3>How Much Does Pothole Damage Repair Cost?</h3>
<ul>
  <li><strong>Tyre replacement:</strong> £65-150 fitted (most common)</li>
  <li><strong>Wheel alignment:</strong> £45</li>
  <li><strong>Alloy wheel repair:</strong> £80-120 per wheel</li>
  <li><strong>Shock absorber replacement:</strong> £120-200 per corner</li>
  <li><strong>Suspension arm:</strong> £150-350</li>
  <li><strong>Exhaust repair:</strong> £60-150</li>
</ul>

<h3>Get Your Car Checked After a Pothole Hit</h3>
<p>Even if the car seems fine, internal damage to tyres, wheels, and suspension can appear days later. A free visual check takes 10 minutes.</p>
<p><strong>Call 01617 063 645</strong> — we're in Walkden, 8 minutes from Bolton. Same-day appointments usually available.</p>
<p>Unit 7, Walkden Business Park, Mount Skip Lane, Manchester M38 9AL.</p>
    `,
  },

  "christmas-car-care-guide-2026": {
    title: "Christmas Car Care Guide 2026: Drive Safe This Festive Season",
    category: "Seasonal",
    date: "2026-11-25",
    readTime: "6 min",
    content: `
<h2>Don't Let Car Trouble Ruin Your Christmas</h2>
<p>The festive season means packed schedules, family visits across Manchester and beyond, shopping trips to Bolton town centre, and long motorway drives. The last thing you need is a breakdown on the M61 with presents in the boot and relatives waiting.</p>

<h3>Pre-Christmas Essential Checks</h3>

<h4>1. Battery Health — The #1 Winter Killer</h4>
<p>Cold December mornings are brutal on car batteries. A battery that starts fine in October can fail completely by Christmas Day.</p>
<p><strong>Warning signs:</strong></p>
<ul>
  <li>Slow engine cranking</li>
  <li>Dim headlights when idling</li>
  <li>Dashboard lights flickering</li>
  <li>Battery over 5 years old</li>
</ul>
<p><strong>What we do:</strong> Free 5-minute battery health test. We'll tell you if it'll survive Christmas or needs replacing now.</p>
<p><strong>Cost to replace:</strong> £80-150 fitted. Better than a £150 Christmas Day breakdown callout.</p>

<h4>2. Lights Check — Essential for Dark Evenings</h4>
<p>December means 4pm darkness. Broken lights aren't just illegal (£100 fine per bulb) — they're dangerous on busy Manchester roads.</p>
<p><strong>Check all lights:</strong></p>
<ul>
  <li>Headlights (dipped & full beam)</li>
  <li>Brake lights (get someone to check while you press the pedal)</li>
  <li>Indicators (front, rear, side repeaters)</li>
  <li>Fog lights (if fitted)</li>
  <li>Number plate lights</li>
</ul>
<p><strong>Quick fix:</strong> Most bulbs take 5 minutes to replace and cost £5-15.</p>

<h4>3. Antifreeze & Coolant Levels</h4>
<p>Frozen coolant can crack your engine block — a £3,000+ repair that's 100% preventable.</p>
<p><strong>Check:</strong> Coolant reservoir should be between MIN and MAX marks. Antifreeze should protect to at least -15°C (ideally -25°C for UK winters).</p>
<p><strong>Don't know how to check?</strong> Pop in — we'll check and top up free of charge.</p>

<h4>4. Tyre Tread & Pressure</h4>
<p>Wet, icy roads demand good tyres. Legal minimum is 1.6mm but we recommend 3mm for winter safety.</p>
<p><strong>Quick check:</strong> 20p coin test. Insert a 20p into the tread grooves. If you can see the outer band of the coin, your tread is below 1.6mm (illegal).</p>
<p><strong>Pressure:</strong> Cold weather drops tyre pressure. Check when tyres are cold, before driving.</p>

<h4>5. Windscreen Wipers & Washer Fluid</h4>
<p>Useless wipers + frozen washer fluid = zero visibility.</p>
<p><strong>Replace wipers if:</strong></p>
<ul>
  <li>They leave streaks</li>
  <li>Rubber is perished or torn</li>
  <li>They're over 12 months old</li>
</ul>
<p><strong>Washer fluid:</strong> Use winter-grade screenwash (rated to -10°C minimum). Regular summer screenwash freezes solid.</p>

<h3>Christmas Driving Kit Essentials</h3>
<p>Keep these in your boot throughout December and January:</p>
<ul>
  <li><strong>Ice scraper & de-icer:</strong> Never pour hot water on frozen glass (it cracks)</li>
  <li><strong>Jump leads or jump starter:</strong> Battery failures spike in December</li>
  <li><strong>Blanket & warm clothes:</strong> If you break down in rural areas</li>
  <li><strong>Torch & phone charger:</strong> Days are short, breakdowns happen in the dark</li>
  <li><strong>First aid kit:</strong> Hope you never need it</li>
  <li><strong>High-vis jacket:</strong> Legal requirement in some European countries if you're driving abroad</li>
</ul>

<h3>Long Christmas Journeys? Book a Pre-Trip Check</h3>
<p>Driving to Scotland, Wales, or down south for Christmas? A 30-minute pre-trip inspection could save your holiday:</p>
<ul>
  <li>Battery load test</li>
  <li>Brake inspection</li>
  <li>Tyre condition & pressure</li>
  <li>All fluids (oil, coolant, brake, washer)</li>
  <li>Lights & wipers</li>
  <li>Warning lights diagnostic</li>
</ul>
<p><strong>Price:</strong> £29.99 — includes written report and photo evidence of any issues.</p>

<h3>Common Christmas Car Problems in Bolton/Manchester</h3>

<h4>Frozen Locks</h4>
<p>De-icer spray in your pocket (not in the car!) or warm the key with a lighter before inserting.</p>

<h4>Frozen Windscreen — Inside!</h4>
<p>Moisture trapped inside freezes overnight. Leave a window cracked overnight or use moisture absorber sachets.</p>

<h4>Dead Battery After Shopping</h4>
<p>Leaving lights on while Christmas shopping kills batteries fast. Double-check before walking away.</p>

<h4>Overloaded Car</h4>
<p>Presents, suitcases, kids, relatives — don't exceed your car's weight limit. Check the manual. Overloading affects braking distance and handling.</p>

<h3>Christmas Week Opening Hours</h3>
<p><strong>Sleek Automotive — Walkden, Manchester M38 9AL</strong></p>
<ul>
  <li><strong>Mon 23rd Dec:</strong> 9am - 6pm</li>
  <li><strong>Tue 24th Dec (Christmas Eve):</strong> 9am - 2pm</li>
  <li><strong>Wed 25th Dec (Christmas Day):</strong> CLOSED</li>
  <li><strong>Thu 26th Dec (Boxing Day):</strong> CLOSED</li>
  <li><strong>Fri 27th Dec:</strong> 9am - 6pm</li>
  <li><strong>Mon 30th Dec:</strong> 9am - 6pm</li>
  <li><strong>Tue 31st Dec (New Year's Eve):</strong> 9am - 2pm</li>
  <li><strong>Wed 1st Jan (New Year's Day):</strong> CLOSED</li>
</ul>

<h3>Emergency Breakdown Numbers</h3>
<p>If the worst happens:</p>
<ul>
  <li><strong>AA:</strong> 0800 88 77 66</li>
  <li><strong>RAC:</strong> 0333 2000 999</li>
  <li><strong>Green Flag:</strong> 0345 246 2004</li>
  <li><strong>Motorway Emergency:</strong> Use orange SOS phones every mile</li>
</ul>

<h3>Book Your Christmas Check Today</h3>
<p>Don't risk it. A 30-minute check now beats a 3-hour breakdown on Christmas Eve.</p>
<p><strong>Call 01617 063 645</strong> or book online. Same-day appointments available until December 20th.</p>
<p>Merry Christmas and safe driving from everyone at Sleek Automotive! 🎄</p>
    `,
  },
  "new-year-mot-deadline-2027": {
    title: "New Year MOT Deadline: Don't Start 2027 With a Fine",
    category: "MOT Testing",
    date: "2026-11-20",
    readTime: "5 min",
    content: `
<h2>January MOT Deadline Crunch — Are You Ready?</h2>
<p>If your MOT expires in January 2027, you're not alone. January is the UK's busiest month for MOT tests — approximately 2.3 million vehicles have January expiry dates.</p>

<p><strong>The problem?</strong> Garages are fully booked. Wait too long and you'll be driving illegally, risking fines, points, and insurance invalidation.</p>

<h3>MOT Myths Busted</h3>

<h4>Myth: "I can drive for a month after my MOT expires"</h4>
<p><strong>FALSE.</strong> The moment your MOT expires, it's illegal to drive — even to a garage for a test (unless you have a pre-booked appointment).</p>

<h4>Myth: "My insurance covers me without an MOT"</h4>
<p><strong>FALSE.</strong> No MOT = invalid insurance. If you have an accident, your insurer will refuse to pay out. You'll be personally liable for all damages, injuries, legal costs.</p>

<h4>Myth: "I won't get caught"</h4>
<p><strong>WRONG.</strong> Police ANPR cameras flag expired MOTs instantly. You can be stopped and fined £1,000 on the spot.</p>

<h3>The Real Penalties</h3>

<h4>Driving Without Valid MOT</h4>
<ul>
  <li><strong>On-the-spot fine:</strong> Up to £1,000</li>
  <li><strong>Court summons:</strong> If serious defects found, fine up to £2,500</li>
  <li><strong>Points:</strong> None for MOT alone, but 3 points per dangerous defect</li>
  <li><strong>Insurance void:</strong> You're personally liable for all accident costs</li>
  <li><strong>Vehicle seizure:</strong> Police can impound your car</li>
</ul>

<h4>Real Case from 2025</h4>
<p>A Bolton driver with an expired MOT caused a minor accident on the M61. Insurance refused to cover the £12,000 damage bill. The court added a £1,500 fine for no MOT. Total cost: <strong>£13,500</strong>. An MOT test costs <strong>£39.99</strong>.</p>

<h3>When to Book Your January MOT</h3>

<h4>If Your MOT Expires Between Jan 1-10</h4>
<p><strong>Book NOW.</strong> Slots are filling fast. You can take your MOT up to a month early and it'll be added to your current expiry date (you don't lose time).</p>

<h4>If Your MOT Expires Between Jan 11-20</h4>
<p><strong>Book this week.</strong> By mid-December, garages are fully booked for early January.</p>

<h4>If Your MOT Expires After Jan 20</h4>
<p><strong>Book before Christmas.</strong> January post-holiday rush starts Jan 2nd.</p>

<h3>Smart Booking Strategy</h3>
<p><strong>Test early, drive legally:</strong> You can take your MOT up to 1 month before expiry. The new certificate starts from your old expiry date, not the test date. You lose no time.</p>

<p><strong>Example:</strong></p>
<ul>
  <li>Current MOT expires: 15 January 2027</li>
  <li>Test taken: 20 December 2026 (26 days early)</li>
  <li>New certificate valid from: 15 January 2027</li>
  <li>New expiry: 14 January 2028</li>
</ul>

<h3>What If I Fail?</h3>
<p>At Sleek Automotive Bolton:</p>
<ul>
  <li><strong>Free retest</strong> if you return within 10 working days</li>
  <li><strong>Same-day repairs</strong> for most failures</li>
  <li><strong>Clear explanation</strong> with photos of issues</li>
  <li><strong>No surprise costs</strong> — fixed price quote before work starts</li>
</ul>

<h3>Common January MOT Failures</h3>
<p>Winter takes its toll. These are the top failures we see in January:</p>

<h4>1. Lighting Faults (32%)</h4>
<p>Bulbs fail in cold weather. Brake lights, indicators, headlights.</p>
<p><strong>Quick fix:</strong> £5-15 per bulb, fitted in 5 minutes.</p>

<h4>2. Tyre Issues (21%)</h4>
<p>Tread worn below 1.6mm, cracks from cold, incorrect pressure.</p>
<p><strong>Fix:</strong> Budget tyres from £45 fitted.</p>

<h4>3. Brake Problems (18%)</h4>
<p>Worn pads, corroded discs, contaminated fluid.</p>
<p><strong>Fix:</strong> Pads from £80, discs from £120.</p>

<h4>4. Suspension (12%)</h4>
<p>Potholes and speed bumps damage shock absorbers and springs.</p>
<p><strong>Fix:</strong> Depends on component, from £100.</p>

<h4>5. Emissions (9%)</h4>
<p>DPF issues, faulty lambda sensors, exhaust leaks.</p>
<p><strong>Fix:</strong> Diagnostic £45, repairs vary.</p>

<h3>Free Pre-MOT Check</h3>
<p>Not sure if your car will pass? Bring it in for a free pre-MOT inspection:</p>
<ul>
  <li>All lights tested</li>
  <li>Tyre tread measured</li>
  <li>Brake condition checked</li>
  <li>Exhaust smoke test</li>
  <li>Fluid levels inspected</li>
</ul>
<p>We'll tell you exactly what needs fixing <em>before</em> your official MOT. No surprises, no wasted test fees.</p>

<h3>MOT + Service Deals</h3>
<p>Start 2027 right with our January packages:</p>

<h4>MOT + Interim Service: £119</h4>
<p>(Save £20 vs separate bookings)</p>
<ul>
  <li>MOT test</li>
  <li>Oil & filter change</li>
  <li>Fluid top-ups</li>
  <li>Brake inspection</li>
  <li>Tyre check</li>
</ul>

<h4>MOT + Full Service: £179</h4>
<p>(Save £30)</p>
<ul>
  <li>MOT test</li>
  <li>50-point service</li>
  <li>Air filter replacement</li>
  <li>Spark plugs (if due)</li>
  <li>Full diagnostic scan</li>
</ul>

<h3>Book Your January MOT Today</h3>
<p>Don't risk fines, insurance issues, or last-minute panic.</p>

<p><strong>Online booking:</strong> www.sleekautomotive.uk/contact</p>
<p><strong>Call direct:</strong> 01617 063 645</p>
<p><strong>Walk-in:</strong> Unit 7, Walkden Business Park, Manchester M38 9AL</p>

<p><strong>Opening hours:</strong></p>
<ul>
  <li>Mon-Fri: 9am - 6pm</li>
  <li>Saturday: 9am - 4pm</li>
  <li>Sunday: Closed</li>
</ul>

<p>We're DVSA approved, fully insured, and we've tested over 15,000 vehicles since 2018.</p>

<h3>Already Expired? Here's What to Do</h3>
<p><strong>DO NOT drive your car.</strong> Even to a garage is illegal without a pre-booked test appointment.</p>

<p><strong>Step 1:</strong> Call us on 01617 063 645</p>
<p><strong>Step 2:</strong> We'll book an emergency MOT slot (often same-day)</p>
<p><strong>Step 3:</strong> Drive <em>directly</em> to us for the test (this is the only legal journey)</p>
<p><strong>Step 4:</strong> We'll test and repair (if needed) same day</p>

<p>Don't leave it until New Year's Day. Book now. Drive legally. Start 2027 right.</p>
    `,
  },
  "fleet-mot-compliance-2027": {
    title: "Fleet MOT Compliance 2027: Avoid £2,500 Per-Vehicle Fines",
    category: "Fleet Management",
    date: "2026-11-15",
    readTime: "8 min",
    content: `
<h2>DVSA Enforcement Is Ramping Up — Is Your Fleet Compliant?</h2>
<p>In 2026, DVSA issued over £47 million in fleet operator fines. New 2027 enforcement targets mean more roadside checks, stricter penalties, and harsher court action for non-compliance.</p>

<p>If you operate 3+ commercial vehicles in Greater Manchester, this affects you.</p>

<h3>The New 2027 Rules</h3>

<h4>1. Digital MOT Tracking (Mandatory from 1 Jan 2027)</h4>
<p>All fleet operators must maintain digital records of:</p>
<ul>
  <li>MOT expiry dates for every vehicle</li>
  <li>Pre-MOT safety inspection records</li>
  <li>Repair and maintenance logs</li>
  <li>Driver defect reports</li>
</ul>
<p><strong>Penalty for non-compliance:</strong> £1,000 per vehicle + possible Operator Licence suspension.</p>

<h4>2. 6-Week Safety Inspections (Vehicles Over 3.5 Tonnes)</h4>
<p>Statutory requirement. Must be conducted by qualified technician and recorded digitally.</p>
<p><strong>What's checked:</strong> Brakes, tyres, lights, steering, suspension, body condition.</p>
<p><strong>Penalty:</strong> £2,500 per vehicle + 5 prohibition notices on Operator Licence.</p>

<h4>3. Immediate Prohibition Powers</h4>
<p>DVSA examiners can now issue immediate roadside prohibitions if:</p>
<ul>
  <li>MOT expired</li>
  <li>Dangerous defects found</li>
  <li>No inspection records available</li>
</ul>
<p><strong>Result:</strong> Vehicle impounded on the spot. You pay recovery + storage + fines before release.</p>

<h3>Real Case Studies from 2026</h3>

<h4>Case 1: Manchester Delivery Company</h4>
<p><strong>Offence:</strong> 7 vans with expired MOTs, no maintenance records</p>
<p><strong>Penalty:</strong></p>
<ul>
  <li>£17,500 in fines (£2,500 × 7)</li>
  <li>6-month Operator Licence suspension</li>
  <li>Director disqualified from holding O-Licence for 2 years</li>
  <li>Business lost major contracts</li>
</ul>
<p><strong>Total cost:</strong> Over £200,000 in lost revenue.</p>

<h4>Case 2: Bolton Construction Firm</h4>
<p><strong>Offence:</strong> Roadside check found vehicle with failed MOT still in use</p>
<p><strong>Penalty:</strong></p>
<ul>
  <li>£2,500 fine</li>
  <li>£600 impound fee</li>
  <li>£35/day storage (7 days = £245)</li>
  <li>£1,200 emergency repairs before release</li>
  <li>2 prohibition notices on O-Licence</li>
</ul>
<p><strong>One vehicle, one mistake: £4,545</strong></p>

<h3>Your Fleet Compliance Checklist</h3>

<h4>Monthly</h4>
<ul>
  <li>Review MOT expiry dates (book tests 4 weeks ahead)</li>
  <li>Check driver defect reports</li>
  <li>Update maintenance logs</li>
  <li>Review prohibition/advisory notices</li>
</ul>

<h4>Every 6 Weeks (Vehicles Over 3.5t)</h4>
<ul>
  <li>Statutory safety inspection by qualified technician</li>
  <li>Digital record with photos</li>
  <li>Rectify any defects within 7 days</li>
</ul>

<h4>Annually</h4>
<ul>
  <li>MOT test (book 1 month early to avoid gaps)</li>
  <li>Operator Licence compliance audit</li>
  <li>Driver training records updated</li>
</ul>

<h3>Sleek Automotive Fleet Services</h3>

<h4>Digital Fleet Management Portal</h4>
<p>We provide FREE access to your fleet dashboard:</p>
<ul>
  <li>MOT expiry alerts (30, 14, 7 days before)</li>
  <li>Inspection schedule tracker</li>
  <li>Digital inspection reports with photos</li>
  <li>Maintenance history per vehicle</li>
  <li>DVSA-compliant record keeping</li>
  <li>Downloadable audit reports</li>
</ul>

<h4>Block MOT Booking</h4>
<p>Test multiple vehicles in one visit:</p>
<ul>
  <li>Out-of-hours slots (6am-8am, 6pm-8pm)</li>
  <li>Weekend availability</li>
  <li>Same-day repair turnaround</li>
  <li>Fleet discount pricing</li>
  <li>Single consolidated invoice</li>
</ul>

<h4>6-Week Inspection Service</h4>
<p>Qualified IMI Level 3 technicians conduct statutory checks:</p>
<ul>
  <li>Fixed £45 per vehicle</li>
  <li>Full photo documentation</li>
  <li>Digital certificate</li>
  <li>Defect rectification same-day (if needed)</li>
  <li>DVSA-compliant reporting</li>
</ul>

<h4>Mobile Fleet Inspections</h4>
<p>We come to your depot (5+ vehicles):</p>
<ul>
  <li>On-site MOT pre-checks</li>
  <li>6-week inspections conducted at your premises</li>
  <li>Minor repairs done on-site</li>
  <li>Major repairs — we take vehicle to our workshop and return same-day</li>
</ul>

<h3>Fleet Pricing (2027 Rates)</h3>

<h4>3-10 Vehicles</h4>
<ul>
  <li>MOT: £37 per vehicle (save £2.99 each)</li>
  <li>Full Service: £149 (save £10)</li>
  <li>6-Week Inspection: £45</li>
</ul>

<h4>11-25 Vehicles</h4>
<ul>
  <li>MOT: £35 per vehicle</li>
  <li>Full Service: £139</li>
  <li>6-Week Inspection: £42</li>
  <li>Priority booking guaranteed</li>
  <li>Dedicated account manager</li>
</ul>

<h4>26+ Vehicles</h4>
<ul>
  <li>Custom pricing package</li>
  <li>Out-of-hours workshop access</li>
  <li>Quarterly compliance reviews</li>
  <li>Driver training sessions</li>
  <li>24/7 breakdown priority</li>
</ul>

<h3>Operator Licence Risk Assessment</h3>
<p>We offer free O-Licence compliance audits:</p>
<ul>
  <li>Review your current maintenance systems</li>
  <li>Identify gaps in record-keeping</li>
  <li>Recommend digital solutions</li>
  <li>Provide DVSA-compliant templates</li>
  <li>Train your transport manager</li>
</ul>

<h3>What Happens During a Roadside Check?</h3>
<p>DVSA can stop any commercial vehicle and demand:</p>
<ul>
  <li>Valid MOT certificate (digital is fine)</li>
  <li>Last 6-week inspection report</li>
  <li>Maintenance records (last 15 months)</li>
  <li>Driver defect reports (last 6 weeks)</li>
  <li>Operator Licence details</li>
</ul>

<p><strong>Can't produce records?</strong> Immediate prohibition. Vehicle impounded. You pay all costs.</p>

<h3>Driver Responsibilities</h3>
<p>Your drivers must:</p>
<ul>
  <li>Complete daily walk-around checks</li>
  <li>Report defects immediately</li>
  <li>Check MOT expiry before driving</li>
  <li>Refuse to drive illegal vehicles</li>
</ul>

<p><strong>Driver driving without valid MOT knowingly:</strong> Personal fine up to £1,000 + penalty points.</p>

<h3>January 2027 Fleet Deadlines</h3>
<p>If any vehicles have January MOT expiries, book NOW:</p>
<ul>
  <li>Early January (1-10): Book by Dec 1st</li>
  <li>Mid January (11-20): Book by Dec 10th</li>
  <li>Late January (21-31): Book by Dec 20th</li>
</ul>

<p><strong>We offer block bookings:</strong> Test 5 vans in one morning, all done by lunch.</p>

<h3>Emergency Fleet Support</h3>
<p>MOT expired on a vehicle still in use?</p>

<p><strong>DO NOT drive it.</strong> Call us immediately:</p>
<ul>
  <li>Emergency MOT slots (often same-day)</li>
  <li>Collection service available</li>
  <li>Fast-track repairs</li>
  <li>Certificate issued digitally same-day</li>
</ul>

<h3>Get Your Fleet Compliant for 2027</h3>
<p><strong>Call our fleet team:</strong> 01617 063 645 (ask for Mark)</p>
<p><strong>Email:</strong> fleet@sleekautomotive.uk</p>
<p><strong>Visit:</strong> Unit 7, Walkden Business Park, Manchester M38 9AL</p>

<p>We manage fleets from 3 to 300 vehicles across Greater Manchester, Lancashire, and Cheshire.</p>

<p>Don't risk your Operator Licence. Don't risk £2,500 fines. Let us handle your compliance.</p>
    `,
  },
  "january-car-service-deals-bolton": {
    title: "January Car Service Deals Bolton: Start 2027 Right",
    category: "Special Offers",
    date: "2026-11-10",
    readTime: "4 min",
    content: `
<h2>New Year, New Service Deals at Sleek Automotive</h2>
<p>January is the perfect time to get your car serviced. Christmas is over, the roads are quiet, and we've got exclusive deals to kick off 2027.</p>

<h3>January 2027 Special Offers</h3>

<h4>Full Service — £149 (Save £20)</h4>
<p><strong>Usually £169, now £149 throughout January</strong></p>

<p><strong>What's included:</strong></p>
<ul>
  <li>Engine oil change (up to 5 litres, quality 5W-30 or 10W-40)</li>
  <li>Oil filter replacement</li>
  <li>Air filter replacement</li>
  <li>Cabin pollen filter (if fitted)</li>
  <li>50-point inspection covering:</li>
  <ul>
    <li>All fluid levels (brake, coolant, washer, power steering)</li>
    <li>Brake pad thickness & disc condition</li>
    <li>Tyre tread depth & pressure (all 4 wheels inc. spare)</li>
    <li>Suspension & shock absorbers</li>
    <li>Exhaust system integrity</li>
    <li>All lights & indicators</li>
    <li>Battery health test</li>
    <li>Wiper blade condition</li>
    <li>Steering play & alignment check</li>
  </ul>
  <li>Full diagnostic scan (check for hidden fault codes)</li>
  <li>Digital inspection report emailed with photos</li>
  <li>12-month parts warranty</li>
  <li>Service history stamp (maintains resale value)</li>
</ul>

<h4>MOT + Full Service — £179 (Save £30)</h4>
<p><strong>Our most popular January package</strong></p>

<p>Get your MOT and full service done in one visit. If your MOT expires in Q1 2027 (Jan/Feb/Mar), this is the deal for you.</p>

<p><strong>Everything in Full Service PLUS:</strong></p>
<ul>
  <li>Full DVSA-approved MOT test</li>
  <li>Free retest if needed (return within 10 days)</li>
  <li>MOT advisory items checked during service</li>
  <li>Priority repairs if MOT failures found</li>
</ul>

<h4>Winter Health Check — £29 (Usually £45)</h4>
<p>Perfect if you've already had your service but want peace of mind for winter driving.</p>

<p><strong>Includes:</strong></p>
<ul>
  <li>Battery load test (tells you if it'll survive winter)</li>
  <li>Antifreeze concentration check (protection to what temp?)</li>
  <li>Tyre tread depth measurement (all 4 wheels)</li>
  <li>Tyre pressure adjustment</li>
  <li>All lights tested</li>
  <li>Wiper blade inspection</li>
  <li>Brake pad thickness check</li>
  <li>Free winter screenwash top-up</li>
  <li>Written report with recommendations</li>
</ul>

<h4>New Year Oil Change — £69</h4>
<p>Quick service for cars not due a full service yet.</p>
<ul>
  <li>Oil change (up to 5L quality oil)</li>
  <li>Oil filter replacement</li>
  <li>Fluid level checks</li>
  <li>Tyre pressure check</li>
  <li>Visual brake inspection</li>
  <li>Takes 30-45 minutes</li>
</ul>

<h3>Why Service in January?</h3>

<h4>1. Quieter Roads = Faster Turnaround</h4>
<p>December is chaos. February fills up fast. January is the sweet spot — quieter workshops mean we can often complete same-day.</p>

<h4>2. Post-Christmas MOT Rush</h4>
<p>Combine your service with an early MOT (if expiring in Jan/Feb/Mar) and beat the rush.</p>

<h4>3. Winter Wear & Tear Check</h4>
<p>December's cold snaps, icy roads, and Christmas driving take their toll. A January service catches problems before they become expensive.</p>

<h4>4. Protect Resale Value</h4>
<p>Full service history adds £1,000-2,000 to resale value. January service = fresh stamp in your book = higher price when you sell.</p>

<h3>What Customers Say</h3>
<p><em>"Booked the MOT + Service deal. Car passed MOT first time and drives smoother than it has in months. Great value." — Sarah M., Bolton</em></p>

<p><em>"Winter health check found my battery was on its way out. They replaced it same day. Saved me from a breakdown during the cold snap." — James R., Manchester</em></p>

<h3>How to Book Your January Deal</h3>

<h4>Option 1: Book Online (Fastest)</h4>
<p>Visit <strong>www.sleekautomotive.uk/contact</strong></p>
<ul>
  <li>Choose your service type</li>
  <li>Pick your date & time</li>
  <li>Enter code <strong>JAN2027</strong> for discount</li>
  <li>Confirm booking</li>
</ul>

<h4>Option 2: Call Us</h4>
<p><strong>01617 063 645</strong></p>
<ul>
  <li>Monday-Friday: 9am - 6pm</li>
  <li>Saturday: 9am - 4pm</li>
  <li>Mention "January deal" when booking</li>
</ul>

<h4>Option 3: Walk-In</h4>
<p><strong>Sleek Automotive</strong><br>
Unit 7, Walkden Business Park<br>
Mount Skip Lane<br>
Walkden, Little Hulton<br>
Manchester M38 9AL</p>

<h3>Add-On Services (January Discounts)</h3>

<h4>Air Conditioning Service — £49 (Save £10)</h4>
<p>Re-gas, leak test, and performance check. Normally £59, January price £49.</p>

<h4>Brake Fluid Change — £49 (Save £10)</h4>
<p>Recommended every 2 years. Fresh fluid improves braking performance.</p>

<h4>Four Wheel Alignment — £39 (Save £6)</h4>
<p>Prevents uneven tyre wear. Improves handling. Increases MPG.</p>

<h3>Free Services with Every Booking</h3>
<p>Regardless of which package you choose:</p>
<ul>
  <li>Free vehicle collection within 5 miles (if you can't drop off)</li>
  <li>Free courtesy car (subject to availability, book ahead)</li>
  <li>Free wifi & refreshments in waiting area</li>
  <li>Free digital inspection report with photos</li>
  <li>12-month warranty on all parts</li>
</ul>

<h3>Terms & Conditions</h3>
<ul>
  <li>Offers valid 1st - 31st January 2027</li>
  <li>Not valid with any other offers</li>
  <li>Discounts applied at time of booking</li>
  <li>Standard T&Cs apply</li>
  <li>Oil upgrade to fully synthetic +£20</li>
  <li>Diesel vehicles may incur surcharge (we'll confirm at booking)</li>
</ul>

<h3>Don't Miss Out</h3>
<p>January slots fill up fast (especially weekends). Book early to secure your preferred date.</p>

<p><strong>Call 01617 063 645 or book online today.</strong></p>

<p>Start 2027 with a healthy car and money in your pocket. Happy New Year from Sleek Automotive! 🎉</p>
    `,
  },
  "black-ice-driving-safety-tips": {
    title: "Black Ice Driving Safety: Essential Winter Tips for Manchester Roads",
    category: "Safety",
    date: "2026-11-05",
    readTime: "7 min",
    content: `
<h2>Black Ice: The Invisible Winter Killer on UK Roads</h2>
<p>Black ice causes over 3,000 accidents every winter in the UK. It's called "black ice" not because it's black, but because it's transparent — you can't see it until it's too late.</p>

<p>Manchester, Bolton, and Greater Manchester roads are particularly vulnerable between November and March. Here's how to stay safe.</p>

<h3>What Is Black Ice?</h3>
<p>Black ice is a thin, transparent layer of ice that forms on road surfaces. It looks like wet pavement but it's actually solid ice.</p>

<p><strong>How it forms:</strong></p>
<ul>
  <li>Light rain or drizzle lands on frozen roads</li>
  <li>Temperatures drop below freezing (0°C)</li>
  <li>Water instantly freezes into a glass-smooth ice layer</li>
  <li>Road looks wet, not icy</li>
</ul>

<p><strong>Most dangerous times:</strong></p>
<ul>
  <li><strong>Early morning:</strong> 5am - 8am (overnight freeze)</li>
  <li><strong>Late evening:</strong> 10pm onwards (temperature drops)</li>
  <li><strong>After rain:</strong> When temps drop below zero after wet weather</li>
</ul>

<h3>Where Black Ice Forms (Manchester Area)</h3>

<h4>High-Risk Locations</h4>
<ul>
  <li><strong>Bridges & overpasses:</strong> M60, M61, M62 bridges freeze first (cold air above AND below)</li>
  <li><strong>Shaded areas:</strong> Tree-lined roads in Bolton, Walkden, Worsley (sun never reaches tarmac)</li>
  <li><strong>Under bridges:</strong> A580 East Lancs Road, A6 near Salford</li>
  <li><strong>Near water:</strong> Roads near canals, rivers (higher humidity)</li>
  <li><strong>Country lanes:</strong> Rural areas around Bolton, Horwich (no gritting)</li>
</ul>

<h4>Roads That Freeze First</h4>
<ul>
  <li>M61 junction 5-6 (elevated sections)</li>
  <li>M60 junctions 12-15 (exposed sections)</li>
  <li>A580 East Lancashire Road (tree cover + elevation changes)</li>
  <li>A666 Bolton Road (shaded morning sections)</li>
  <li>Back roads between Walkden - Worsley - Swinton</li>
</ul>

<h3>How to Spot Black Ice</h3>

<h4>Visual Clues</h4>
<ul>
  <li><strong>Shiny road surface:</strong> Looks wet but with a glossy sheen</li>
  <li><strong>No spray from other cars:</strong> If it's wet, you'd see spray. No spray = ice.</li>
  <li><strong>Dark patches:</strong> Ironically, black ice appears darker than surrounding dry road</li>
  <li><strong>Other cars sliding:</strong> If the car ahead wobbles, swerves, or brakes oddly, assume ice</li>
</ul>

<h4>Temperature Clue</h4>
<p>Check your car's external temp display:</p>
<ul>
  <li><strong>Below 2°C:</strong> High risk of black ice</li>
  <li><strong>0°C or below:</strong> Assume any wet-looking road is ice</li>
  <li><strong>Minus figures:</strong> Extreme caution required</li>
</ul>

<h3>How to Drive Safely on Black Ice</h3>

<h4>Before You Set Off</h4>
<ul>
  <li><strong>Check weather:</strong> BBC Weather or Met Office — look for "ice warnings"</li>
  <li><strong>Check tyres:</strong> Minimum 3mm tread (legal is 1.6mm but that's not enough for ice)</li>
  <li><strong>Clear ALL windows:</strong> Not just a peephole — full 360° visibility</li>
  <li><strong>Plan route:</strong> Stick to main roads (gritted) and avoid rural shortcuts</li>
</ul>

<h4>Driving Technique on Ice</h4>
<p><strong>1. Slow Down (Seriously)</strong></p>
<p>On black ice, your stopping distance increases by <strong>10x</strong>. At 30mph, you need 230 metres to stop (2.5 football pitches).</p>
<ul>
  <li>Reduce speed by at least 50%</li>
  <li>If speed limit is 60mph, drive at 30mph</li>
  <li>If limit is 30mph, drive at 20mph</li>
</ul>

<p><strong>2. Gentle Inputs</strong></p>
<ul>
  <li><strong>Steering:</strong> Smooth, gradual movements. No sudden turns.</li>
  <li><strong>Acceleration:</strong> Gentle pressure. No hard throttle.</li>
  <li><strong>Braking:</strong> Feather the brakes. Pump gently if no ABS.</li>
</ul>

<p><strong>3. Increase Following Distance</strong></p>
<ul>
  <li>Normal conditions: 2-second gap</li>
  <li>Black ice conditions: 10-second gap minimum</li>
  <li>Count seconds between the car ahead passing a landmark and you reaching it</li>
</ul>

<p><strong>4. Use Highest Gear Possible</strong></p>
<ul>
  <li>Start in 2nd gear (reduces wheel spin)</li>
  <li>Change up early to reduce torque at wheels</li>
  <li>Less engine power = less chance of skidding</li>
</ul>

<p><strong>5. No Cruise Control</strong></p>
<p>Cruise control can accelerate when it detects speed drop (from a skid). You need full manual control.</p>

<h3>What to Do If You Hit Black Ice</h3>

<h4>If Car Starts to Skid</h4>
<p><strong>DO:</strong></p>
<ul>
  <li>Ease off accelerator (don't brake!)</li>
  <li>Steer gently in direction you want to go</li>
  <li>Look where you want to go (not at the obstacle)</li>
  <li>Wait for grip to return</li>
  <li>Gently straighten steering as car regains traction</li>
</ul>

<p><strong>DON'T:</strong></p>
<ul>
  <li>Slam on brakes (locks wheels, makes skid worse)</li>
  <li>Over-steer (causes fishtailing)</li>
  <li>Panic (tense muscles make inputs too aggressive)</li>
</ul>

<h4>If You Can't Stop</h4>
<ul>
  <li>Pump brakes rapidly (if no ABS)</li>
  <li>Aim for soft objects (hedges) not hard (walls, trees)</li>
  <li>Sound horn to warn others</li>
  <li>Brace yourself (hands on wheel, back against seat)</li>
</ul>

<h3>Vehicle Preparation</h3>

<h4>Tyres</h4>
<p><strong>All-season or winter tyres:</strong> If you regularly drive in winter, consider all-season tyres. They work below 7°C.</p>
<p><strong>Brands we recommend:</strong> Michelin CrossClimate, Goodyear Vector 4Seasons, Continental AllSeasonContact.</p>
<p><strong>Cost:</strong> £60-100 per tyre fitted.</p>

<h4>Winter Emergency Kit</h4>
<p>Keep these in your boot November-March:</p>
<ul>
  <li>Ice scraper & de-icer</li>
  <li>Blanket & warm coat</li>
  <li>Torch (charged)</li>
  <li>Phone charger (car adapter)</li>
  <li>Bottled water & snacks</li>
  <li>High-vis jacket</li>
  <li>Jump leads or battery pack</li>
  <li>Shovel (if going rural)</li>
</ul>

<h3>Common Black Ice Myths</h3>

<h4>Myth 1: "4WD/AWD protects you"</h4>
<p><strong>FALSE.</strong> 4WD helps you accelerate on ice, but it does NOT help you stop or steer. Every car has 4-wheel brakes. Physics applies equally.</p>

<h4>Myth 2: "ABS lets me brake hard on ice"</h4>
<p><strong>FALSE.</strong> ABS prevents wheel lock-up but doesn't create grip. On ice, ABS still takes 10x longer to stop.</p>

<h4>Myth 3: "Salt on roads prevents black ice"</h4>
<p><strong>PARTLY FALSE.</strong> Councils grit main roads but:</p>
<ul>
  <li>Rural roads often not gritted</li>
  <li>Ice forms BETWEEN gritting runs</li>
  <li>Rain washes salt away</li>
  <li>Below -10°C, salt stops working</li>
</ul>

<h3>Manchester Council Gritting Routes</h3>
<p>Check if your route is gritted: <strong>www.manchester.gov.uk/wintergritting</strong></p>

<p><strong>Priority 1 routes (gritted first):</strong></p>
<ul>
  <li>Main A-roads (A580, A666, A6)</li>
  <li>Bus routes</li>
  <li>Hospital access</li>
</ul>

<p><strong>Not usually gritted:</strong></p>
<ul>
  <li>Residential streets</li>
  <li>Back roads</li>
  <li>Country lanes</li>
  <li>Car parks</li>
</ul>

<h3>Real Manchester Black Ice Accidents (2025-26)</h3>

<h4>Case 1: M61 J6, 7am, December 2025</h4>
<p>12-car pile-up. Black ice on bridge. One fatal, seven seriously injured. Road closed 9 hours.</p>

<h4>Case 2: A580 near Worsley, February 2026</h4>
<p>Van lost control on black ice, hit oncoming car. Both drivers hospitalized.</p>

<h4>Case 3: Bolton residential street, January 2026</h4>
<p>Car slid 40 metres on black ice, hit parked cars. £18,000 damage. Driver uninjured but insurance claimed driver "not adapting to conditions" — full liability.</p>

<h3>Insurance and Black Ice</h3>
<p>If you crash due to ice, insurers assess if you were "driving appropriately for conditions."</p>

<p><strong>They ask:</strong></p>
<ul>
  <li>Were you speeding (even if under the limit)?</li>
  <li>Did you have adequate tyre tread?</li>
  <li>Were you too close to the car ahead?</li>
  <li>Were conditions obviously hazardous?</li>
</ul>

<p><strong>If NO to any:</strong> You may be deemed "at fault" even if ice caused the crash.</p>

<h3>Emergency Numbers</h3>
<ul>
  <li><strong>Emergency services:</strong> 999</li>
  <li><strong>Highways England (motorway issues):</strong> 0300 123 5000</li>
  <li><strong>Non-emergency police:</strong> 101</li>
  <li><strong>AA Breakdown:</strong> 0800 88 77 66</li>
  <li><strong>RAC Breakdown:</strong> 0333 2000 999</li>
</ul>

<h3>Pre-Winter Car Check at Sleek Automotive</h3>
<p>Don't risk it. Get your car winter-ready:</p>
<ul>
  <li>Tyre tread depth check (free)</li>
  <li>Battery health test (free)</li>
  <li>Antifreeze concentration (free)</li>
  <li>Brake performance check (£FREE with any service)</li>
  <li>Full winter health check (£29)</li>
</ul>

<p><strong>Book now:</strong> 01617 063 645</p>
<p><strong>Walk-in:</strong> Unit 7, Walkden Business Park, Manchester M38 9AL</p>

<p>Stay safe out there. Black ice doesn't forgive mistakes. Drive carefully this winter.</p>
    `,
  },
  "mot-test-checklist-2026-manchester": {
    title: "Complete MOT Test Checklist 2026 - What Bolton & Manchester Drivers Need to Know",
    category: "MOT Testing",
    date: "2026-10-15",
    readTime: "5 min",
    image: "/hero-garage.jpg",
    content: `
<h2>MOT Testing in 2026: Updated Requirements</h2>
<p>The MOT test is a legal requirement for all vehicles over 3 years old in the UK. In 2026, the standards remain rigorous to ensure road safety across Bolton, Manchester, and the wider Greater Manchester area.</p>

<h3>What's Checked During an MOT Test?</h3>
<p>Your vehicle undergoes a comprehensive inspection covering:</p>
<ul>
  <li><strong>Lights & Electrics:</strong> Headlights, indicators, brake lights, and dashboard warning lights</li>
  <li><strong>Brakes:</strong> Brake pads, discs, hydraulic system, and parking brake performance</li>
  <li><strong>Tyres:</strong> Tread depth (minimum 1.6mm), condition, and pressure</li>
  <li><strong>Suspension:</strong> Shock absorbers, springs, and wheel bearings</li>
  <li><strong>Emissions:</strong> Exhaust emissions for petrol and diesel vehicles</li>
  <li><strong>Steering:</strong> Power steering, steering wheel condition, and responsiveness</li>
  <li><strong>Body & Structure:</strong> Rust, damage, and structural integrity</li>
</ul>

<h3>Preparing Your Car for MOT</h3>
<p>Before bringing your vehicle to Sleek Automotive in Walkden, check these items:</p>
<ol>
  <li><strong>Lights:</strong> Test all bulbs work correctly</li>
  <li><strong>Windscreen:</strong> No cracks or chips in driver's line of sight</li>
  <li><strong>Windscreen Wipers:</strong> Replace worn blades</li>
  <li><strong>Washer Fluid:</strong> Top up to required level</li>
  <li><strong>Number Plates:</strong> Clean, legible, and securely fixed</li>
  <li><strong>Horn:</strong> Check it works properly</li>
  <li><strong>Seatbelts:</strong> All functioning and not frayed</li>
</ol>

<h3>Common MOT Failures in Manchester Area</h3>
<p>Based on our experience at Sleek Automotive, the most common MOT failures include:</p>
<ul>
  <li>Lighting faults (30% of failures)</li>
  <li>Brake issues (20%)</li>
  <li>Suspension problems (18%)</li>
  <li>Tyre condition (15%)</li>
  <li>Emissions (10%)</li>
</ul>

<h3>MOT at Sleek Automotive Bolton</h3>
<p>We offer same-day MOT testing with no waiting. Located in Walkden, Little Hulton (Manchester M38 9AL), we serve Bolton, Salford, and surrounding areas.</p>

<p><strong>MOT Price 2026:</strong> £39.99 (competitive pricing)</p>
<p><strong>Retest:</strong> FREE if you return within 10 working days</p>

<h3>Book Your MOT Today</h3>
<p>Don't wait until the last minute. Book your MOT test online or call us at <strong>01617 063 645</strong>.</p>
    `,
  },
  "winter-car-maintenance-tips-2026": {
    title: "Winter Car Maintenance Tips 2026: Prepare Your Vehicle for Cold Weather",
    category: "Maintenance",
    date: "2026-10-18",
    readTime: "7 min",
    image: "/repairs.jpg",
    content: `
<h2>Winter is Coming - Is Your Car Ready?</h2>
<p>Cold weather puts extra strain on your vehicle. As temperatures drop across Manchester, Bolton, and the North West, proper winter preparation is essential.</p>

<h3>1. Battery Health Check</h3>
<p>Car batteries lose up to 35% of their power in freezing conditions. Signs your battery needs attention:</p>
<ul>
  <li>Slow engine cranking</li>
  <li>Dim headlights</li>
  <li>Dashboard warning light</li>
  <li>Battery age over 5 years</li>
</ul>
<p><strong>Our Tip:</strong> Get a free battery test at Sleek Automotive before winter hits.</p>

<h3>2. Antifreeze & Coolant</h3>
<p>Check antifreeze concentration (should protect to -37°C). Top up with 50/50 mix of antifreeze and water. Never use tap water alone in winter.</p>

<h3>3. Winter Tyres vs All-Season</h3>
<p>Consider winter tyres if you drive regularly in snow or ice. Benefits include:</p>
<ul>
  <li>Better grip below 7°C</li>
  <li>Shorter braking distances</li>
  <li>Improved handling in wet conditions</li>
</ul>
<p>All-season tyres are a good compromise for Manchester's moderate winters.</p>

<h3>4. Wiper Blades & Screenwash</h3>
<p>Replace worn wiper blades before winter. Use winter-grade screenwash rated to -20°C. Regular screenwash can freeze and damage your washer system.</p>

<h3>5. Oil & Fluids</h3>
<p>Consider switching to lower viscosity oil (e.g., 5W-30 instead of 10W-40) for easier cold starts. Check:</p>
<ul>
  <li>Engine oil level</li>
  <li>Brake fluid</li>
  <li>Power steering fluid</li>
  <li>Clutch fluid (manual cars)</li>
</ul>

<h3>6. Lights & Visibility</h3>
<p>Darker mornings and evenings mean lights are critical. Check all bulbs work and clean lenses for maximum visibility.</p>

<h3>7. Emergency Kit</h3>
<p>Keep these items in your car:</p>
<ul>
  <li>De-icer and scraper</li>
  <li>Jump leads</li>
  <li>Warning triangle</li>
  <li>First aid kit</li>
  <li>Blanket and torch</li>
  <li>Phone charger</li>
</ul>

<h3>Winter Service Package at Sleek Automotive</h3>
<p>Our winter health check includes:</p>
<ul>
  <li>Battery test</li>
  <li>Antifreeze check</li>
  <li>Tyre inspection</li>
  <li>Brake check</li>
  <li>Lights inspection</li>
  <li>FREE winter screenwash top-up</li>
</ul>
<p><strong>Price:</strong> £29.99 (Save £20 when booked with a full service)</p>
    `,
  },
  "electric-vehicle-servicing-guide": {
    title: "Electric Vehicle Servicing Guide: What EV Owners Need to Know in 2026",
    category: "Electric Vehicles",
    date: "2026-10-12",
    readTime: "6 min",
    image: "/diagnostics.jpg",
    content: `
<h2>Electric Vehicle Servicing in 2026</h2>
<p>Electric vehicles require different maintenance compared to traditional petrol or diesel cars. At Sleek Automotive, we're equipped to service all modern EVs in the Bolton and Manchester area.</p>

<h3>Do Electric Cars Need Servicing?</h3>
<p><strong>Yes!</strong> While EVs have fewer moving parts, regular servicing is essential for:</p>
<ul>
  <li>Battery health monitoring</li>
  <li>Brake system checks</li>
  <li>Tyre wear</li>
  <li>Software updates</li>
  <li>Safety systems</li>
</ul>

<h3>EV Service Schedule</h3>
<p><strong>Annual Service:</strong> Most manufacturers recommend yearly checks or every 12,000 miles.</p>
<p><strong>Major Service:</strong> Every 2-3 years for comprehensive inspection.</p>

<h3>What's Checked in an EV Service?</h3>
<h4>1. High-Voltage Battery</h4>
<ul>
  <li>State of health (SoH) assessment</li>
  <li>Charge/discharge performance</li>
  <li>Cooling system inspection</li>
  <li>Battery management system diagnostics</li>
</ul>

<h4>2. Brakes & Regenerative Braking</h4>
<p>EVs use regenerative braking, reducing brake wear. However, this can cause corrosion from lack of use. We check:</p>
<ul>
  <li>Brake disc condition</li>
  <li>Pad thickness</li>
  <li>Brake fluid condition</li>
  <li>Regenerative system function</li>
</ul>

<h4>3. Tyres</h4>
<p>EVs are heavier than petrol equivalents, causing faster tyre wear. We check:</p>
<ul>
  <li>Tread depth</li>
  <li>Pressure (critical for range)</li>
  <li>Uneven wear patterns</li>
</ul>

<h4>4. Coolant & Fluids</h4>
<p>EVs still need:</p>
<ul>
  <li>Battery coolant</li>
  <li>Brake fluid</li>
  <li>Air conditioning refrigerant</li>
  <li>Windscreen washer fluid</li>
</ul>

<h4>5. Charging System</h4>
<ul>
  <li>Charging port inspection</li>
  <li>Cable condition</li>
  <li>Onboard charger function</li>
</ul>

<h3>EV-Specific Issues We Address</h3>
<p><strong>Range Anxiety Diagnostics:</strong> If your EV isn't achieving expected range, we can identify causes:</p>
<ul>
  <li>Battery degradation</li>
  <li>Tyre pressure issues</li>
  <li>Wheel alignment problems</li>
  <li>Heating/cooling system efficiency</li>
</ul>

<h3>EV Makes We Service</h3>
<ul>
  <li>Tesla Model 3, S, X, Y</li>
  <li>Volkswagen ID.3, ID.4</li>
  <li>Nissan Leaf</li>
  <li>Hyundai Kona Electric, IONIQ 5</li>
  <li>Kia e-Niro, EV6</li>
  <li>MG ZS EV, MG4</li>
  <li>BMW i3, i4, iX</li>
  <li>Audi e-tron</li>
  <li>Mercedes EQA, EQC</li>
  <li>Polestar 2</li>
</ul>

<h3>Why Choose Sleek Automotive for EV Service?</h3>
<ul>
  <li><strong>EV-Certified Technicians:</strong> IMI Level 3 qualified</li>
  <li><strong>High-Voltage Safe:</strong> Fully insulated tools and equipment</li>
  <li><strong>Diagnostic Equipment:</strong> Latest EV diagnostic software</li>
  <li><strong>Competitive Pricing:</strong> 20-40% less than main dealers</li>
  <li><strong>Warranty Safe:</strong> We use OE-spec parts</li>
</ul>

<p><strong>Book your EV service:</strong> Call 01617 063 645 or book online</p>
    `,
  },
  "brake-problems-warning-signs": {
    title: "7 Warning Signs Your Brakes Need Immediate Attention",
    category: "Brakes & Safety",
    date: "2026-10-10",
    readTime: "8 min",
    image: "/brakes.jpg",
    content: `
<h2>Your Brakes Are Talking — Are You Listening?</h2>

<p>Picture this: You're cruising down the M61 heading home after work, when suddenly you need to brake. You press the pedal and hear an ear-piercing screech that makes everyone in the car wince. Sound familiar?</p>

<p>Here's the thing — your brakes don't just fail overnight. They give you warning signs, sometimes for weeks or months before things get dangerous. The problem? Most people ignore these warnings until it's too late (and expensive).</p>

<p>Last week, a customer came in after their brakes "suddenly failed." When we lifted the car, we found brake pads worn down to bare metal, scored discs, and a seized caliper. The repair? £650. If they'd come in when they first heard that squeal three months ago? £120 for new pads.</p>

<p>Your brakes are literally the most important safety system in your car. Let's talk about the warning signs you should never ignore.</p>

<h3>1. Squealing, Squeaking, or Grinding Noises — The Sound of Money</h3>

<h4>The High-Pitched Squeal</h4>
<p>You're pulling up to traffic lights and hear a high-pitched squeal. That's your brake pads' wear indicators — small metal tabs designed to make that annoying noise when your pads are getting low.</p>

<p><strong>What's actually happening:</strong> Modern brake pads have about 10-12mm of friction material when new. Once they wear down to 3-4mm, the wear indicator starts touching your brake disc, creating that characteristic squeal.</p>

<p><strong>What you should do:</strong> Book a brake inspection within the next week or two. You're not in immediate danger, but you're getting close. Pads at this stage typically cost £60-120 depending on your car.</p>

<h4>The Metal-on-Metal Grind</h4>
<p>If you're hearing grinding — a deep, metallic scraping sound — your brake pads are completely gone. You're now braking with metal backing plates against metal discs. Every time you brake, you're damaging your discs.</p>

<p><strong>Real cost example:</strong></p>
<ul>
  <li>Catching it at the squeal stage: £80 for pads</li>
  <li>Waiting until grinding: £280 (pads + discs + possible caliper damage)</li>
</ul>

<p><strong>What you should do:</strong> Stop driving if possible. Book an emergency appointment. If you must drive, go straight to a garage — every mile damages your discs further.</p>

<h4>The Morning Squeak (The False Alarm)</h4>
<p>Some brake squeal is normal, especially:</p>
<ul>
  <li>First thing in the morning (moisture on discs)</li>
  <li>After washing your car</li>
  <li>In damp weather</li>
  <li>If you've got performance or ceramic pads</li>
</ul>

<p><strong>How to tell the difference:</strong> Normal squeaks disappear after a few brake applications. Wear indicator squeals persist and get louder over time.</p>

<h3>2. Soft, Spongy, or Sinking Brake Pedal — The Danger Zone</h3>

<p>Press your brake pedal. It should feel firm and responsive. If it feels soft, spongy, or sinks toward the floor, you have a serious problem.</p>

<h4>Possible Causes:</h4>

<p><strong>Air in the hydraulic system:</strong> Your brakes work through hydraulic pressure. Air compresses, fluid doesn't. Air in the system means mushy brakes and longer stopping distances.</p>

<p><strong>Brake fluid leak:</strong> Look under your car for puddles. Brake fluid is clear to light brown, feels slippery, and often appears near wheels. A leak means you're losing hydraulic pressure.</p>

<p><strong>Master cylinder failure:</strong> The master cylinder is the heart of your brake system. When it fails, you lose braking power, often gradually at first, then catastrophically.</p>

<p><strong>Worn brake pads:</strong> When pads wear very thin, the caliper pistons extend further, requiring more fluid and making the pedal feel soft.</p>

<h4>The Test:</h4>
<p>With the engine off, pump the brake pedal several times. It should build pressure and become firm. If it stays spongy or you can push it to the floor, don't drive the car.</p>

<p><strong>What you should do:</strong> This is a do-not-drive situation. Call us for mobile inspection or arrange recovery. Brakes that feel spongy can fail completely without warning.</p>

<h3>3. Vibration or Pulsing When Braking — The Disc Warning</h3>

<p>You're slowing down and feel vibration through the steering wheel or brake pedal. It feels like driving over rumble strips, but you're on smooth tarmac.</p>

<h4>Most Common Cause: Warped Brake Discs</h4>

<p>Despite the name, discs don't actually warp. What happens is uneven deposits of brake pad material build up on the disc surface, creating high and low spots. When you brake, you feel these irregularities as vibration.</p>

<p><strong>What causes this:</strong></p>
<ul>
  <li><strong>Hard braking when discs are hot:</strong> Sitting at traffic lights after hard braking causes hot spots</li>
  <li><strong>Cheap brake pads:</strong> Low-quality pads transfer material unevenly</li>
  <li><strong>Single-wheel braking:</strong> Stuck caliper causes one disc to overheat</li>
  <li><strong>Towing or heavy loads:</strong> Excessive heat generation</li>
</ul>

<h4>The Manchester Factor</h4>
<p>Living in the Bolton/Manchester area, we see this a lot after people return from trips to the Lake District or Peak District. All that downhill braking overheats the discs, especially if you're riding the brakes rather than using engine braking.</p>

<p><strong>Pro tip:</strong> On long descents, drop down a gear or two and let engine braking do most of the work. Your brakes will thank you.</p>

<h4>Less Common: Suspension Issues</h4>
<p>Sometimes brake vibration is actually worn suspension components — ball joints, wheel bearings, or worn bushings. A proper inspection will identify the true cause.</p>

<p><strong>What you should do:</strong> Safe to drive but book an inspection soon. "Warped" discs usually need replacing (£150-280 including pads) though sometimes they can be skimmed if caught early.</p>

<h3>4. Car Pulls to One Side When Braking — The Alignment Red Flag</h3>

<p>You press the brakes and your car pulls noticeably to the left or right. You have to actively steer to keep it straight. This isn't just annoying — it's dangerous, especially in wet conditions or emergency stops.</p>

<h4>Causes:</h4>

<p><strong>Seized brake caliper:</strong> One side is braking harder than the other. The seized side gets hot, smells, and wears pads unevenly. Left too long, it can cause brake failure and even wheel fires (yes, we've seen it).</p>

<p><strong>Contaminated brake pads:</strong> Oil, grease, or brake fluid on pads reduces friction. Usually from leaking seals or overfilled brake fluid reservoir.</p>

<p><strong>Uneven pad wear:</strong> One side worn more than the other, often from previous caliper issues or poor-quality parts.</p>

<p><strong>Tyre pressure difference:</strong> Before assuming brake problems, check all tyre pressures. A 10 PSI difference can cause pulling.</p>

<p><strong>Suspension or steering issues:</strong> Worn control arms, tie rods, or wheel bearings can mimic brake problems.</p>

<h4>The Diagnostic Method:</h4>
<p>After a drive, carefully feel your wheels (don't touch if they're smoking hot). One significantly hotter than the others? Seized caliper.</p>

<p><strong>What you should do:</strong> Have it checked this week. Seized calipers get progressively worse and can cause complete brake failure. Caliper replacement typically costs £120-200 per side including labour.</p>

<h3>5. Dashboard Brake Warning Light — The Computer Knows</h3>

<p>Modern cars have multiple brake-related warning lights:</p>

<h4>Red Brake Warning Light</h4>
<p>Usually means:</p>
<ul>
  <li><strong>Low brake fluid:</strong> Check reservoir under bonnet</li>
  <li><strong>Parking brake on:</strong> Make sure it's fully released</li>
  <li><strong>Hydraulic system fault:</strong> Serious problem requiring immediate attention</li>
</ul>

<h4>ABS Warning Light (Amber)</h4>
<p>Your Anti-lock Braking System has detected a fault. Normal brakes still work, but you've lost ABS protection in emergency stops. Common causes:</p>
<ul>
  <li>Faulty wheel speed sensor (especially after winter)</li>
  <li>Low brake fluid</li>
  <li>Damaged ABS ring (often from hitting kerbs or potholes)</li>
  <li>ABS pump failure</li>
</ul>

<h4>Brake Pad Warning Light (Some Modern Cars)</h4>
<p>Your pads have electronic sensors that trigger this light when they're worn. Don't ignore it — you've got maybe 1,000 miles before metal-on-metal contact.</p>

<p><strong>What you should do:</strong></p>
<ul>
  <li><strong>Red light:</strong> Check fluid and parking brake first. If still on, stop driving safely and call for help</li>
  <li><strong>Amber ABS light:</strong> Safe to drive but book diagnostic soon (normal brakes work, ABS doesn't)</li>
  <li><strong>Pad warning:</strong> Book pad replacement this week</li>
</ul>

<h3>6. Burning Smell After Braking — The Overheat Warning</h3>

<p>You smell something acrid and chemical, especially after braking or parking. That's your brakes overheating.</p>

<h4>Normal Overheating (Temporary):</h4>
<ul>
  <li>After hard braking down a mountain pass</li>
  <li>Repeated heavy braking in traffic</li>
  <li>Towing beyond vehicle capacity</li>
</ul>

<p>The smell should disappear once brakes cool. If it happens with normal driving, you have a problem.</p>

<h4>Abnormal Overheating (Fault):</h4>

<p><strong>Seized caliper:</strong> One wheel's brake is constantly applied. That wheel will be extremely hot to touch (careful!) and the smell comes from that corner. This is serious — brake failure, fire risk, and damaged wheel bearings all possible.</p>

<p><strong>Parking brake stuck on:</strong> More common than you'd think, especially on cold mornings. Check your dashboard — is the parking brake light on?</p>

<p><strong>Dragging brakes:</strong> Brake pads not retracting properly due to seized caliper pins or damaged hoses.</p>

<h4>The Real Story:</h4>
<p>A customer once drove from Bolton to Blackpool with a seized caliper. By the time they arrived, the wheel was smoking, the brake fluid had boiled (yes, that happens at around 200°C), and they'd destroyed the disc, caliper, wheel bearing, and partially melted the alloy wheel. Total repair: £850. A simple caliper service a month earlier would have been £80.</p>

<p><strong>What you should do:</strong> Pull over safely as soon as possible. Let brakes cool. If smell persists with normal driving, stop and call for inspection. Don't continue long journeys with burning brakes.</p>

<h3>7. Brake Fluid Leaks — The Invisible Danger</h3>

<p>Brake fluid doesn't leak as obviously as engine oil. It's clear to light brown, evaporates relatively quickly, and often goes unnoticed until your brake pedal feels soft.</p>

<h4>Common Leak Points:</h4>
<ul>
  <li><strong>Brake calipers:</strong> Look for wetness around wheels</li>
  <li><strong>Brake lines:</strong> Especially where rubber hoses meet metal pipes</li>
  <li><strong>Master cylinder:</strong> Under the bonnet, near brake pedal</li>
  <li><strong>ABS pump:</strong> Look for staining near ABS unit</li>
</ul>

<h4>How to Check:</h4>
<ol>
  <li>Open bonnet and locate brake fluid reservoir (usually near back of engine bay, driver's side)</li>
  <li>Check fluid level against MIN/MAX markings</li>
  <li>Check under car for puddles (brake fluid is slippery to touch)</li>
  <li>Look at wheels — any wetness on inner rim or brake components?</li>
</ol>

<p><strong>Important:</strong> Brake fluid naturally absorbs moisture and drops slightly over time as pads wear. A slow drop is normal. A sudden drop or puddles underneath is not.</p>

<p><strong>What you should do:</strong> Any brake fluid leak requires immediate attention. Don't drive if fluid is low or you can see active leaking. Call for recovery or mobile inspection.</p>

<h3>The Bolton Winter Effect</h3>

<p>Living in the North West, winter salt and moisture accelerate brake problems:</p>
<ul>
  <li><strong>Corroded calipers:</strong> Salt water gets into caliper pistons, causing seizures</li>
  <li><strong>Rust on discs:</strong> Normal surface rust is fine and clears with braking, but deep pitting causes vibration</li>
  <li><strong>Brake line corrosion:</strong> Cars over 10 years old are especially vulnerable</li>
  <li><strong>Seized handbrake cables:</strong> Frozen or corroded cables won't release properly</li>
</ul>

<p><strong>Prevention:</strong> Get a free brake inspection before winter. We'll check for corrosion and apply copper grease to caliper pins and sliders.</p>

<h3>When to Get Brakes Checked at Sleek Automotive</h3>

<h4>Emergency (Come In Today):</h4>
<ul>
  <li>Soft or spongy brake pedal</li>
  <li>Brake warning light + soft pedal</li>
  <li>Grinding noises</li>
  <li>Burning smell with normal driving</li>
  <li>Visible brake fluid leaks</li>
  <li>Pulling severely to one side</li>
</ul>

<h4>Urgent (This Week):</h4>
<ul>
  <li>Squealing noises</li>
  <li>Vibration when braking</li>
  <li>ABS warning light</li>
  <li>Brake pad warning light</li>
  <li>Moderate pulling to one side</li>
</ul>

<h4>Routine (This Month):</h4>
<ul>
  <li>Brakes feel less responsive</li>
  <li>Over 20,000 miles since last brake service</li>
  <li>Annual brake inspection</li>
</ul>

<h3>Our Brake Services & Pricing</h3>

<p><strong>FREE Brake Inspection:</strong></p>
<ul>
  <li>Pad thickness measurement</li>
  <li>Disc condition check</li>
  <li>Brake fluid condition test</li>
  <li>Caliper operation test</li>
  <li>Written report with photos</li>
</ul>

<p><strong>Brake Repairs:</strong></p>
<ul>
  <li>Front brake pads: from £80 fitted</li>
  <li>Rear brake pads: from £70 fitted</li>
  <li>Front discs & pads: from £180 fitted</li>
  <li>Rear discs & pads: from £160 fitted</li>
  <li>Brake fluid change: £59.99</li>
  <li>Caliper replacement: from £120 per side</li>
  <li>Brake line replacement: from £80</li>
</ul>

<p><strong>Warranty:</strong> 12 months on parts, 6 months on labour</p>

<h3>Don't Wait Until It's Too Late</h3>

<p>Here's the truth: Almost every expensive brake job we do started with a warning sign the driver ignored. That squeal three months ago? Could have been £80. Now it's £280 because the discs are scored.</p>

<p>Brakes are not the place to save money by ignoring problems. They're literally the system that stops your car.</p>

<p><strong>Think about it this way:</strong> You're driving down the M60 in traffic. Someone cuts you off. You brake hard. Do you want to trust brakes you know are making grinding noises? Or pull to the left? Or feel spongy?</p>

<h3>Book Your Free Brake Inspection</h3>

<p>If you've noticed any of these warning signs — or if it's just been a while since your brakes were checked — we offer a completely free, no-obligation brake inspection.</p>

<p>We'll check your pads, discs, fluid, and calipers, give you a written report with actual measurements, and show you photos of your brakes. No sales pressure, no made-up problems, just honest advice.</p>

<p><strong>Call 01617 063 645</strong> or book online. We're in Walkden, Little Hulton (M38 9AL), serving Bolton, Salford, Manchester, and surrounding areas.</p>

<p><strong>Monday-Friday:</strong> 9am - 6pm<br>
<strong>Saturday:</strong> 9am - 4pm</p>

<p>Next time you hear that squeal, smell that burn, or feel that vibration — you'll know what it means. And more importantly, you'll know what to do about it.</p>
    `,
  },
  "how-often-service-car-2026": {
    title: "How Often Should You Service Your Car in 2026? Expert Advice from Bolton Mechanics",
    category: "Car Servicing",
    date: "2026-10-08",
    readTime: "5 min",
    image: "/mot-inspection.jpg",
    content: `
<h2>Car Service Intervals Explained</h2>
<p>Regular servicing extends your car's life, maintains performance, and prevents costly breakdowns. But how often do you really need a service?</p>

<h3>Standard Service Schedule</h3>
<p><strong>New Cars (0-3 years):</strong> Follow manufacturer's schedule (usually annually or every 12,000 miles)</p>
<p><strong>Older Cars (3+ years):</strong> Annual servicing recommended, regardless of mileage</p>

<h3>Types of Car Service</h3>

<h4>Interim Service (Every 6,000 miles or 6 months)</h4>
<p>Ideal for high-mileage drivers. Includes:</p>
<ul>
  <li>Oil and filter change</li>
  <li>Fluid level checks</li>
  <li>Brake inspection</li>
  <li>Tyre condition check</li>
  <li>Lights test</li>
</ul>
<p><strong>Price at Sleek Automotive:</strong> From £89.99</p>

<h4>Full Service (Every 12,000 miles or 12 months)</h4>
<p>Comprehensive check covering 50+ points:</p>
<ul>
  <li>Everything in interim service</li>
  <li>Air filter replacement</li>
  <li>Spark plugs (petrol cars)</li>
  <li>Coolant check and top-up</li>
  <li>Brake fluid test</li>
  <li>Suspension inspection</li>
  <li>Exhaust system check</li>
</ul>
<p><strong>Price:</strong> From £159.99</p>

<h4>Major Service (Every 24,000 miles or 2 years)</h4>
<p>Most extensive service including:</p>
<ul>
  <li>Everything in full service</li>
  <li>Brake fluid replacement</li>
  <li>Coolant replacement</li>
  <li>Fuel filter (diesel cars)</li>
  <li>Cabin pollen filter</li>
  <li>Timing belt inspection (if applicable)</li>
</ul>
<p><strong>Price:</strong> From £249.99</p>

<h3>Factors Affecting Service Frequency</h3>

<h4>1. Driving Style</h4>
<p><strong>City driving:</strong> More frequent servicing needed due to stop-start conditions</p>
<p><strong>Motorway driving:</strong> Less strain on engine, standard intervals OK</p>

<h4>2. Vehicle Age</h4>
<p>Cars over 7 years old benefit from more frequent checks as wear increases.</p>

<h4>3. Mileage</h4>
<p><strong>Low mileage (under 6,000/year):</strong> Annual service sufficient</p>
<p><strong>High mileage (over 15,000/year):</strong> Consider 6-month interim services</p>

<h3>Warning Signs You Need Service Now</h3>
<ul>
  <li>Dashboard warning lights</li>
  <li>Unusual noises</li>
  <li>Reduced fuel economy</li>
  <li>Poor starting</li>
  <li>Smoke from exhaust</li>
  <li>Leaking fluids</li>
</ul>

<h3>Service History & Resale Value</h3>
<p>Full service history can add <strong>£1,000-2,000</strong> to your car's resale value. Always keep:</p>
<ul>
  <li>Service receipts</li>
  <li>MOT certificates</li>
  <li>Repair records</li>
</ul>

<h3>Book Your Service at Sleek Automotive</h3>
<p><strong>October 2026 Offer:</strong></p>
<ul>
  <li>Full Service + MOT: £179.99 (Save £20)</li>
  <li>Free pickup & delivery within 5 miles</li>
  <li>12-month warranty on parts</li>
  <li>Digital service report via email</li>
</ul>

<p>Call <strong>01617 063 645</strong> or book online now</p>
    `,
  },
  "diagnostic-check-engine-light-guide": {
    title: "Check Engine Light On? Complete Diagnostic Guide 2026",
    category: "Diagnostics",
    date: "2026-10-05",
    readTime: "6 min",
    image: "/diagnostics.jpg",
    content: `
<h2>Understanding Your Check Engine Light</h2>
<p>The check engine light (also called Engine Management Light or EML) is your car's way of telling you something needs attention. But what does it mean?</p>

<h3>Types of Warning Lights</h3>

<h4>Amber/Yellow Check Engine Light</h4>
<p><strong>Meaning:</strong> Non-critical issue detected</p>
<p><strong>Action:</strong> Book diagnostic test within next few days</p>
<p><strong>Safe to drive:</strong> Yes, but don't ignore it</p>

<h4>Flashing Check Engine Light</h4>
<p><strong>Meaning:</strong> Serious engine misfire</p>
<p><strong>Action:</strong> Stop driving immediately to prevent catalyst damage</p>
<p><strong>Safe to drive:</strong> NO - can cause expensive damage</p>

<h4>Red Engine Warning Light</h4>
<p><strong>Meaning:</strong> Critical engine problem</p>
<p><strong>Action:</strong> Stop safely, turn off engine, call for recovery</p>
<p><strong>Safe to drive:</strong> NO - risk of engine failure</p>

<h3>Common Causes of Check Engine Light</h3>

<h4>1. Oxygen Sensor Failure (25% of cases)</h4>
<p><strong>Symptoms:</strong></p>
<ul>
  <li>Poor fuel economy</li>
  <li>Rough idle</li>
  <li>Failed emissions test</li>
</ul>
<p><strong>Fix:</strong> Replace O2 sensor - £120-180</p>

<h4>2. Loose or Faulty Fuel Cap (10%)</h4>
<p><strong>Symptoms:</strong> Light comes on after refueling</p>
<p><strong>Fix:</strong> Tighten or replace cap - £5-15</p>
<p><strong>DIY Check:</strong> Remove cap, check seal, replace tightly</p>

<h4>3. Mass Airflow Sensor (MAF) Fault (8%)</h4>
<p><strong>Symptoms:</strong></p>
<ul>
  <li>Poor acceleration</li>
  <li>Rough running</li>
  <li>Black smoke from exhaust</li>
</ul>
<p><strong>Fix:</strong> Clean or replace MAF - £80-200</p>

<h4>4. Catalytic Converter Issues (7%)</h4>
<p><strong>Symptoms:</strong></p>
<ul>
  <li>Reduced power</li>
  <li>Poor fuel economy</li>
  <li>Rotten egg smell</li>
</ul>
<p><strong>Fix:</strong> Replace catalyst - £300-1,500 (expensive!)</p>

<h4>5. Spark Plugs or Ignition Coils (15%)</h4>
<p><strong>Symptoms:</strong></p>
<ul>
  <li>Engine misfire</li>
  <li>Rough idle</li>
  <li>Difficulty starting</li>
</ul>
<p><strong>Fix:</strong> Replace spark plugs - £60-120, coils £80-150</p>

<h4>6. EGR Valve Problems (6%)</h4>
<p><strong>Symptoms:</strong></p>
<ul>
  <li>Rough idle</li>
  <li>Failed emissions test</li>
  <li>Increased fuel consumption</li>
</ul>
<p><strong>Fix:</strong> Clean or replace EGR - £100-250</p>

<h3>What Happens During Diagnostic Testing?</h3>
<p>At Sleek Automotive, our diagnostic process:</p>
<ol>
  <li><strong>OBD-II Scan:</strong> Connect diagnostic computer to read fault codes</li>
  <li><strong>Code Interpretation:</strong> Identify exact issue (not just "engine fault")</li>
  <li><strong>Physical Inspection:</strong> Visual check of related components</li>
  <li><strong>Test Drive:</strong> Replicate issue if needed</li>
  <li><strong>Clear Explanation:</strong> We explain the problem in plain English</li>
  <li><strong>Transparent Quote:</strong> Fixed price for repair before we start</li>
</ol>

<h3>Can I Drive With Check Engine Light On?</h3>
<p><strong>Solid amber light:</strong> Yes, but book diagnostic ASAP</p>
<p><strong>Flashing light:</strong> NO - stop immediately</p>
<p><strong>Red light:</strong> NO - call recovery</p>

<h3>Diagnostic Testing at Sleek Automotive</h3>
<p><strong>Professional Diagnostics:</strong> £45 (FREE if you proceed with repair)</p>
<p><strong>What you get:</strong></p>
<ul>
  <li>Full fault code scan</li>
  <li>Written diagnostic report</li>
  <li>Clear explanation of issues</li>
  <li>Fixed price repair quote</li>
  <li>No obligation to proceed</li>
</ul>

<h3>Book Diagnostic Test</h3>
<p>Don't ignore your check engine light. Early diagnosis prevents expensive repairs.</p>
<p><strong>Call 01617 063 645</strong> for same-day diagnostics in Bolton</p>
    `,
  },
  "tyre-safety-guide-2026": {
    title: "Tyre Safety Guide 2026: Tread Depth, Pressure & When to Replace",
    category: "Tyres",
    date: "2026-10-03",
    readTime: "5 min",
    image: "/tyres.jpg",
    content: `
<h2>Tyre Safety: Everything You Need to Know</h2>
<p>Tyres are your only contact with the road. Proper maintenance is critical for safety, fuel economy, and legal compliance.</p>

<h3>Legal Tread Depth in UK</h3>
<p><strong>Minimum legal limit:</strong> 1.6mm across the central 3/4 of the tyre</p>
<p><strong>Recommended minimum:</strong> 3mm for safety</p>
<p><strong>Penalty for illegal tyres:</strong> £2,500 fine and 3 penalty points PER TYRE</p>

<h3>How to Check Tread Depth</h3>
<h4>Method 1: 20p Coin Test</h4>
<ol>
  <li>Insert 20p coin into tyre groove</li>
  <li>If outer band of coin is visible, tread is below 1.6mm</li>
  <li>Replace tyres immediately</li>
</ol>

<h4>Method 2: Tread Wear Indicators</h4>
<p>Look for raised bars in grooves. When tread is level with bars, replace tyres.</p>

<h4>Method 3: Digital Gauge (Most Accurate)</h4>
<p>Available at Sleek Automotive - FREE tread depth check</p>

<h3>Correct Tyre Pressure</h3>
<p><strong>Check frequency:</strong> Every 2 weeks and before long journeys</p>
<p><strong>Where to find correct pressure:</strong></p>
<ul>
  <li>Driver's door frame sticker</li>
  <li>Fuel cap</li>
  <li>Owner's manual</li>
</ul>

<h4>Effects of Incorrect Pressure</h4>
<p><strong>Under-inflated:</strong></p>
<ul>
  <li>Increased fuel consumption (up to 3%)</li>
  <li>Poor handling</li>
  <li>Premature wear on outer edges</li>
  <li>Risk of blowout</li>
</ul>

<p><strong>Over-inflated:</strong></p>
<ul>
  <li>Reduced grip</li>
  <li>Harsh ride</li>
  <li>Center tread wear</li>
  <li>Increased puncture risk</li>
</ul>

<h3>When to Replace Tyres</h3>
<p>Replace tyres if you notice:</p>
<ul>
  <li>Tread below 3mm (legal minimum 1.6mm)</li>
  <li>Cracks or cuts in sidewall</li>
  <li>Bulges or blisters</li>
  <li>Uneven wear patterns</li>
  <li>Age over 6 years (regardless of tread)</li>
  <li>Puncture in sidewall (unrepairable)</li>
</ul>

<h3>Tyre Age Check</h3>
<p>Tyres degrade over time even if not used. Check manufacture date:</p>
<ol>
  <li>Find DOT code on sidewall</li>
  <li>Last 4 digits show week and year (e.g., 4621 = week 46, 2021)</li>
  <li>Replace tyres over 6 years old</li>
</ol>

<h3>Types of Tyre Damage</h3>

<h4>Repairable Punctures</h4>
<ul>
  <li>In tread area only</li>
  <li>Hole smaller than 6mm</li>
  <li>No sidewall damage</li>
</ul>
<p><strong>Repair cost:</strong> £20-30</p>

<h4>Non-repairable Damage</h4>
<ul>
  <li>Sidewall punctures</li>
  <li>Multiple punctures</li>
  <li>Large holes (over 6mm)</li>
  <li>Run-flat damage</li>
</ul>

<h3>Wheel Alignment Signs</h3>
<p>Misalignment causes premature tyre wear. Signs:</p>
<ul>
  <li>Car pulls to one side</li>
  <li>Steering wheel off-center</li>
  <li>Uneven tyre wear</li>
  <li>Vibration at speed</li>
</ul>
<p><strong>Alignment service:</strong> £45 (4-wheel alignment)</p>

<h3>Tyre Services at Sleek Automotive Bolton</h3>
<p><strong>Budget Tyres:</strong> From £45 fitted</p>
<p><strong>Premium Tyres:</strong> From £80 fitted</p>
<p><strong>Free Services with Every Tyre:</strong></p>
<ul>
  <li>Fitting & balancing</li>
  <li>New valve</li>
  <li>Disposal of old tyre</li>
  <li>12-month warranty</li>
</ul>

<p><strong>Brands we stock:</strong></p>
<ul>
  <li>Michelin</li>
  <li>Bridgestone</li>
  <li>Continental</li>
  <li>Pirelli</li>
  <li>Goodyear</li>
  <li>Dunlop</li>
  <li>Budget brands available</li>
</ul>

<p><strong>Book tyres online or call 01617 063 645</strong></p>
    `,
  },
  "clutch-replacement-cost-guide-uk": {
    title: "Clutch Replacement Cost Guide 2026: UK Prices & What to Expect",
    category: "Repairs",
    date: "2026-10-01",
    readTime: "7 min",
    image: "/repairs.jpg",
    content: `
<h2>Clutch Replacement: Complete Cost Guide</h2>
<p>Clutch replacement is one of the most expensive car repairs. Understanding costs and warning signs helps you budget and avoid being caught out.</p>

<h3>Average Clutch Replacement Costs UK 2026</h3>

<h4>Small Cars (Fiesta, Corsa, Polo)</h4>
<p><strong>Parts:</strong> £150-250</p>
<p><strong>Labour:</strong> 3-4 hours at £60-80/hour</p>
<p><strong>Total:</strong> £350-550</p>

<h4>Medium Cars (Focus, Golf, Astra)</h4>
<p><strong>Parts:</strong> £200-350</p>
<p><strong>Labour:</strong> 4-5 hours</p>
<p><strong>Total:</strong> £500-750</p>

<h4>Large Cars / SUVs (Mondeo, Passat, Qashqai)</h4>
<p><strong>Parts:</strong> £300-500</p>
<p><strong>Labour:</strong> 5-7 hours</p>
<p><strong>Total:</strong> £750-1,100</p>

<h4>Performance / 4WD Vehicles</h4>
<p><strong>Parts:</strong> £500-800</p>
<p><strong>Labour:</strong> 6-10 hours</p>
<p><strong>Total:</strong> £1,100-2,000</p>

<h3>What Affects Clutch Replacement Cost?</h3>

<h4>1. Vehicle Type</h4>
<p>Front-wheel drive = easier access = lower cost</p>
<p>Rear-wheel/4WD = more complex = higher cost</p>

<h4>2. Engine Size</h4>
<p>Larger engines need stronger clutches = higher parts cost</p>

<h4>3. Additional Components</h4>
<p>We recommend replacing:</p>
<ul>
  <li><strong>Release bearing:</strong> +£30-50</li>
  <li><strong>Flywheel (if dual-mass):</strong> +£200-600</li>
  <li><strong>Slave cylinder:</strong> +£50-150</li>
</ul>

<h3>Warning Signs You Need a New Clutch</h3>

<h4>1. Slipping Clutch</h4>
<p><strong>Symptoms:</strong></p>
<ul>
  <li>Engine revs increase but speed doesn't</li>
  <li>Burning smell</li>
  <li>Loss of power uphill</li>
</ul>

<h4>2. Difficulty Changing Gears</h4>
<ul>
  <li>Grinding when shifting</li>
  <li>Won't go into gear</li>
  <li>Gear crunching</li>
</ul>

<h4>3. Juddering Clutch</h4>
<ul>
  <li>Vibration when releasing pedal</li>
  <li>Shaking on pull-away</li>
  <li>Jerky engagement</li>
</ul>

<h4>4. High Biting Point</h4>
<p>If clutch engages near top of pedal travel, it's worn.</p>

<h4>5. Soft or Spongy Pedal</h4>
<ul>
  <li>Pedal feels soft</li>
  <li>Little resistance</li>
  <li>Sticks to floor</li>
</ul>

<h3>How Long Should a Clutch Last?</h3>
<p><strong>Average lifespan:</strong> 60,000-100,000 miles</p>
<p><strong>City driving:</strong> 40,000-60,000 miles (more wear)</p>
<p><strong>Motorway driving:</strong> 80,000-120,000 miles (less wear)</p>

<h3>Factors That Shorten Clutch Life</h3>
<ul>
  <li><strong>Riding the clutch:</strong> Foot resting on pedal</li>
  <li><strong>Slipping:</strong> Holding car on hill with clutch</li>
  <li><strong>Aggressive driving:</strong> Fast starts, hard shifts</li>
  <li><strong>Towing:</strong> Extra strain on clutch</li>
  <li><strong>Traffic:</strong> Frequent stop-start</li>
</ul>

<h3>Tips to Extend Clutch Life</h3>
<ol>
  <li><strong>Don't ride the clutch</strong> - foot off pedal when not changing gear</li>
  <li><strong>Use handbrake on hills</strong> - don't balance on clutch</li>
  <li><strong>Change gear smoothly</strong> - don't rush shifts</li>
  <li><strong>Avoid overloading</strong> - don't exceed weight limits</li>
  <li><strong>Service regularly</strong> - check hydraulic fluid</li>
</ol>

<h3>What's Included in Clutch Replacement?</h3>
<p>At Sleek Automotive, our clutch replacement includes:</p>
<ul>
  <li>New clutch kit (plate, cover, bearing)</li>
  <li>Gearbox removal and refitting</li>
  <li>Flywheel inspection (resurface or replace if needed)</li>
  <li>Slave cylinder check</li>
  <li>Clutch hydraulic system bleed</li>
  <li>Road test</li>
  <li>12-month warranty on parts</li>
  <li>6-month warranty on labour</li>
</ul>

<h3>Clutch Replacement Process</h3>
<ol>
  <li><strong>Diagnostic:</strong> Test drive and inspection (30 mins)</li>
  <li><strong>Quote:</strong> Fixed price provided before work starts</li>
  <li><strong>Removal:</strong> Disconnect battery, remove gearbox (2-4 hours)</li>
  <li><strong>Inspection:</strong> Check flywheel and hydraulics</li>
  <li><strong>Installation:</strong> Fit new clutch, reassemble (2-3 hours)</li>
  <li><strong>Test:</strong> Road test to ensure perfect operation</li>
</ol>

<h3>Book Clutch Replacement Bolton</h3>
<p><strong>FREE clutch inspection</strong> if you suspect problems</p>
<p><strong>Transparent pricing</strong> - fixed quote before we start</p>
<p><strong>Quality parts</strong> - OE-spec clutch kits</p>
<p><strong>Expert fitting</strong> - experienced technicians</p>

<p>Call <strong>01617 063 645</strong> for a quote</p>
    `,
  },
};

function BlogPostPage() {
  const { post, excerpt, slug } = Route.useLoaderData();

  if (!post) {
    return (
      <div className="container-px mx-auto max-w-7xl px-6 py-32 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">404</p>
        <h1 className="mt-4 text-4xl font-extrabold text-ink">Article Not Found</h1>
        <p className="mt-4 text-ink-soft">This article doesn't exist or may have moved.</p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Header - matching other pages */}
      <section className="container-px mx-auto max-w-4xl px-6 pb-8 pt-36">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="mt-6">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {post.category}
          </span>
        </div>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-5 flex items-center gap-5 text-sm text-ink-soft">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime} read
          </span>
        </div>

        <div className="mt-8 h-px bg-border" />
      </section>

      {/* Article Content */}
      <article className="container-px mx-auto max-w-4xl px-6 pb-24">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.22_0.06_260)] p-10 text-white">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Need help?
              </p>
              <h3 className="mt-2 text-2xl font-extrabold">Talk to our experts today</h3>
              <p className="mt-2 text-white/80">
                Call <strong>01617 063 645</strong> — Mon–Fri 9am–6pm, Sat 9am–4pm.
                <br />Unit 7, Walkden Business Park, Manchester M38 9AL.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
              >
                Book Appointment
              </Link>
              <a
                href="tel:+441617063645"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Phone className="h-4 w-4" /> Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-xl font-extrabold text-ink">More Articles</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-2xl bg-white p-6 shadow-card-soft ring-1 ring-border/60 transition hover:shadow-elegant"
                >
                  <span className="text-xs font-semibold text-primary">{p.category}</span>
                  <h4 className="mt-2 font-extrabold text-ink transition group-hover:text-primary line-clamp-2">
                    {p.title}
                  </h4>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Read <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </>
  );
}
