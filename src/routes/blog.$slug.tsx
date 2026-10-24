import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowLeft, Phone, ArrowRight } from "lucide-react";
import { blogPosts } from "./blog";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

// SEO-optimized blog content with trending automotive keywords 2026
const blogContent: Record<string, any> = {
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
  const { slug } = Route.useParams();
  const post = blogContent[slug];

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
