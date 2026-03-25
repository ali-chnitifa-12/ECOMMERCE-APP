/**
 * FitTrack Product Seeder
 * Run: node scripts/seedProducts.mjs
 * Credentials: $env:ADMIN_EMAIL="you@email.com"; $env:ADMIN_PASSWORD="secret"; node scripts/seedProducts.mjs
 *
 * ⚠️  DELETE old products from Admin panel before re-seeding, or you'll get duplicates.
 *
 * All images: https://images.unsplash.com/photo-{ID}?w=800&q=80&auto=format&fit=crop
 * Each photo ID was individually verified against Unsplash to match its product.
 */

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@fittrack.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

const u = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

//  CATEGORY → verified Unsplash photo IDs per product
//  Tested: paste URL in browser to confirm the right image shows
const products = [

    // ══ SNEAKERS ══════════════════════════════════════════════════════════════
    // Nike Air Max 270 — black/white shoe studio
    {
        name: 'Nike Air Max 270', price: 150.00, stock: 45, is_active: true,
        image: u('1542291026-7eec264c27ff'),
        description: 'Iconic silhouette featuring the largest Nike Air unit ever created. Delivers all-day comfort with bold, expressive style.'
    },

    // Adidas Ultraboost 23 — white adidas running shoe, clean bg
    {
        name: 'Adidas Ultraboost 23', price: 190.00, stock: 32, is_active: true,
        image: u('1608231387042-66d1773070a5'),
        description: 'Engineered for epic energy return. Primeknit+ upper wraps your foot in adaptive comfort while Boost midsole propels every stride.'
    },

    // Converse Chuck Taylor — white high-top on white bg
    {
        name: 'Converse Chuck Taylor All Star', price: 65.00, stock: 80, is_active: true,
        image: u('1607522370275-f14206abe5d3'),
        description: 'A cultural icon for over a century. The timeless canvas high-top worn by athletes, musicians and rebels from every generation.'
    },

    // Vans Old Skool — black/white Vans side view
    {
        name: 'Vans Old Skool Skate', price: 70.00, stock: 60, is_active: true,
        image: u('1525966222134-fcfa99b8ae77'),
        description: 'The original side-stripe skate shoe. Durable suede and canvas upper with the legendary Vans waffle outsole for superior boardfeel.'
    },

    // New Balance 574 — retro runner grey/navy
    {
        name: 'New Balance 574 Classic', price: 89.99, stock: 40, is_active: true,
        image: u('1539185441755-769473a23570'),
        description: 'The definitive heritage runner. ENCAP midsole technology provides lasting support without sacrificing the iconic retro athletic silhouette.'
    },

    // Puma RS-X — colourful chunky sneaker
    {
        name: 'Puma RS-X³ Puzzle', price: 110.00, stock: 25, is_active: true,
        image: u('1552346154-21d32810aba3'),
        description: 'Retro-futuristic chunkiness meets modern cushioning tech. The RS-X³ remixes vintage running DNA with bold colorways.'
    },

    // ══ ELECTRONICS ═══════════════════════════════════════════════════════════
    // MacBook Air — laptop on desk
    {
        name: 'Apple MacBook Air M3', price: 1299.00, stock: 15, is_active: true,
        image: u('1517336714731-489689fd1ca8'),
        description: 'Supercharged by the M3 chip. Impossibly thin fanless design with Liquid Retina display and all-day battery life.'
    },

    // Sony WH-1000XM5 headphones — black headphones flat lay
    {
        name: 'Sony WH-1000XM5 Headphones', price: 348.00, stock: 28, is_active: true,
        image: u('1505740420928-5e560c06d30e'),
        description: 'Industry-leading noise cancellation with 8 microphones, 30h battery and multipoint connection.'
    },

    // Apple Watch — silver Apple Watch on wrist
    {
        name: 'Apple Watch Series 9', price: 399.00, stock: 22, is_active: true,
        image: u('1434493789847-2f02dc6ca35d'),
        description: 'Double tap. The most powerfully intelligent Apple Watch with advanced health insights and crash detection.'
    },

    // Samsung Galaxy S24 Ultra — black phone flat lay
    {
        name: 'Samsung Galaxy S24 Ultra', price: 1199.99, stock: 18, is_active: true,
        image: u('1610945415295-d9bbf067e59c'),
        description: 'Built-in S Pen meets titanium. 200MP camera and Galaxy AI bring photography and productivity to unprecedented heights.'
    },

    // Sony Alpha A7 IV — DSLR / mirrorless camera
    {
        name: 'Sony Alpha A7 IV Camera', price: 2499.00, stock: 8, is_active: true,
        image: u('1516035069371-29a1b244cc32'),
        description: '33MP full-frame mirrorless. Real-time Eye AF for humans and animals, 4K 60p video and advanced subject recognition.'
    },

    // iPad Pro — tablet on wooden desk
    {
        name: 'iPad Pro 12.9" M2', price: 1099.00, stock: 20, is_active: true,
        image: u('1544244015-0df4b3ffc6b0'),
        description: 'M2 chip powers the ProMotion display and Apple Pencil hover detection. Desktop-class performance in your hands.'
    },

    // ══ CLOTHING ══════════════════════════════════════════════════════════════
    // Oxford shirt — white button-down shirt on hanger
    {
        name: 'Oxford Button-Down Shirt', price: 59.99, stock: 70, is_active: true,
        image: u('1596755094514-f87e34085b2c'),
        description: 'Tailored from 100% cotton Oxford cloth. Sharp enough for the boardroom, relaxed enough for weekend errands.'
    },

    // Slim jeans — dark denim jeans flat lay
    {
        name: 'Slim Fit Stretch Denim Jeans', price: 79.99, stock: 55, is_active: true,
        image: u('1542272454315-4c01d7abdf4a'),
        description: 'Modern slim-fit in four-way stretch denim. Moves with you through everything from commute to cocktails.'
    },

    // Oversized hoodie — pullover hoodie on model
    {
        name: 'Oversized Fleece Hoodie', price: 49.99, stock: 90, is_active: true,
        image: u('1556821840-3a63f15732ce'),
        description: 'Ultra-heavyweight 450gsm fleece in a roomy silhouette. The ultimate comfort uniform with clean cut seams.'
    },

    // Merino sweater — cream knit crewneck folded
    {
        name: 'Merino Crew Neck Sweater', price: 119.00, stock: 30, is_active: true,
        image: u('1434389677669-e08b4cac3105'),
        description: '100% grade-A merino wool. Naturally temperature-regulating and itch-free — a perfect lightweight layer.'
    },

    // Leather biker jacket — black moto jacket on model
    {
        name: 'Genuine Leather Biker Jacket', price: 349.00, stock: 12, is_active: true,
        image: u('1551028719-00167b16eac5'),
        description: 'Full-grain lambskin in a heritage moto silhouette. Asymmetric zip, quilted shoulders and a supple hand feel.'
    },

    // Floral midi dress — woman in floral dress
    {
        name: 'Floral Chiffon Midi Dress', price: 89.00, stock: 42, is_active: true,
        image: u('1572804013427-4d7ca7268217'),
        description: 'Fluid chiffon in a bold botanical print with V-neck, adjustable tie waist and an airy midi length.'
    },

    // ══ ACCESSORIES ═══════════════════════════════════════════════════════════
    // Aviator sunglasses — classic aviators on white bg
    {
        name: 'Ray-Ban Aviator Classic', price: 163.00, stock: 50, is_active: true,
        image: u('1511499767150-a48a237f0083'),
        description: 'Engineered for U.S. military pilots in 1937. Crystal glass lenses filter UV perfectly inside a lightweight metal frame.'
    },

    // Waxed canvas backpack — tan/brown canvas backpack
    {
        name: 'Waxed Canvas Backpack 30L', price: 129.00, stock: 38, is_active: true,
        image: u('1553062407-98eeb64c6a62'),
        description: 'Water-resistant waxed canvas with full-grain leather straps, padded laptop sleeve and separate organiser compartment.'
    },

    // Slim wallet — brown leather bifold wallet
    {
        name: 'Slim RFID Leather Wallet', price: 45.00, stock: 100, is_active: true,
        image: u('1627123424574-724758594e93'),
        description: 'Full-grain leather bifold at 8mm. RFID-blocking inner lining, 6 card slots and a cash pocket.'
    },

    // Luxury perfume — glass perfume bottle
    {
        name: 'Noir Oud Luxury Perfume', price: 220.00, stock: 20, is_active: true,
        image: u('1541643600914-78b084683702'),
        description: 'Rare oud wood meets bergamot and dark amber in a sillage that commands attention from first impression to final note.'
    },

    // Insulated water bottle — stainless steel thermos
    {
        name: 'Triple-Insulated Water Bottle 1L', price: 34.99, stock: 120, is_active: true,
        image: u('1602143407151-7111542de6e8'),
        description: 'Vacuum-sealed 18/8 stainless steel. Ice-cold for 48h, piping hot for 24h. No sweat guarantee.'
    },

    // Gold minimalist watch — gold watch flat lay
    {
        name: 'Gold Minimalist Watch', price: 249.00, stock: 18, is_active: true,
        image: u('1523275335684-37898b6baf30'),
        description: 'Swiss quartz movement in a brushed stainless case with sapphire-coated glass. Luxury without shouting.'
    },

    // ══ BEAUTY & WELLNESS ═════════════════════════════════════════════════════
    // Vitamin C serum — amber glass serum dropper bottle
    {
        name: 'Vitamin C Brightening Serum 30ml', price: 39.99, stock: 65, is_active: true,
        image: u('1620916566398-39f1143ab7be'),
        description: '20% stabilised ascorbic acid with hyaluronic acid and vitamin E. Brightens and fades dark spots in two weeks.'
    },

    // Dyson Airwrap — purple/pink professional hair styler
    {
        name: 'Dyson Airwrap Multi-Styler', price: 599.99, stock: 10, is_active: true,
        image: u('1522338242992-e1a54906a8da'),
        description: 'Curl, wave, smooth and dry simultaneously using Coanda airflow — no extreme heat damage.'
    },

    // Yoga mat — purple rolled yoga mat with blocks
    {
        name: 'Yoga Mat Pro 6mm', price: 68.00, stock: 45, is_active: true,
        image: u('1544367567-0f2fcb009e0b'),
        description: 'Natural rubber base with closed-cell surface. Laser-printed alignment lines and carry strap included.'
    },

    // Retinol night cream — white skincare jar on marble
    {
        name: 'Retinol Night Cream 50ml', price: 55.00, stock: 50, is_active: true,
        image: u('1556228720-195a672e8a03'),
        description: '0.3% encapsulated retinol with niacinamide and peptides. Reduces fine lines and improves texture overnight.'
    },

    // Protein shaker — black/red gym shaker bottle
    {
        name: 'Premium Protein Shaker 700ml', price: 24.99, stock: 80, is_active: true,
        image: u('1593095948071-474c5cc2989d'),
        description: 'Leakproof BlenderBall wire whisk for lump-free shakes. Dishwasher safe, BPA-free Tritan plastic.'
    },

    // Jade roller — green jade facial roller on white marble
    {
        name: 'Jade Facial Roller & Gua Sha Set', price: 29.99, stock: 70, is_active: true,
        image: u('1616394584738-fc6e612e71b9'),
        description: 'Authentic cold jade stone roller & gua sha. Reduces puffiness, boosts circulation, enhances absorption.'
    },
];

// ── API runner ───────────────────────────────────────────────────────────────
const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

async function seed() {
    process.stdout.write('\n🔐  Logging in as admin... ');
    const res = await api.post('/login', { email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
    const token = res.data?.token || res.data?.data?.token || res.data?.access_token;
    if (!token) throw new Error('No token returned. Check credentials / response shape.');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('✅  Authenticated.\n');

    let ok = 0, fail = 0;
    for (const [i, p] of products.entries()) {
        const label = `[${String(i + 1).padStart(2, '0')}/${products.length}] ${p.name}`;
        try {
            await api.post('/products', p);
            console.log(`  ✅  ${label}`);
            ok++;
        } catch (err) {
            const msg = err.response?.data?.message ?? JSON.stringify(err.response?.data) ?? err.message;
            console.log(`  ❌  ${label} — ${msg}`);
            fail++;
        }
    }
    console.log(`\n${'─'.repeat(62)}`);
    console.log(`  ✅ Created : ${ok}  |  ❌ Failed : ${fail}  |  📦 Total : ${products.length}`);
    console.log(`${'─'.repeat(62)}\n`);
}

seed().catch(err => {
    console.error('\n💥  Fatal error:', err.response?.data || err.message);
    process.exit(1);
});
