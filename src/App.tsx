import { useMemo, useState } from "react";
import { App as KonstaApp, Button, Navbar, Page } from "konsta/react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  color: string;
  tag?: string;
};

type CartItem = { product: Product; quantity: number };

const products: Product[] = [
  {
    id: 1,
    name: "Divoom Ditoo Pro",
    category: "Pixel Art Speaker",
    price: 1299000,
    description: "Speaker Bluetooth bergaya retro dengan layar pixel art yang dapat dikustomisasi.",
    color: "mint",
    tag: "Best seller",
  },
  {
    id: 2,
    name: "Divoom Tivoo Max",
    category: "Pixel Art Speaker",
    price: 1899000,
    description: "Speaker desktop dengan visual pixel art dan suara yang memenuhi ruangan.",
    color: "lavender",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Divoom Pixoo 64",
    category: "Pixel Display",
    price: 1599000,
    description: "Layar pixel art 64 × 64 untuk dekorasi meja dan kreasi visual digital.",
    color: "blue",
  },
  {
    id: 4,
    name: "Divoom Times Gate",
    category: "Pixel Display",
    price: 999000,
    description: "Display pixel art multi-panel untuk mempercantik setup meja kerja.",
    color: "peach",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

function ProductVisual({ color, compact = false }: { color: string; compact?: boolean }) {
  return (
    <div className={`product-visual visual-${color} ${compact ? "is-compact" : ""}`}>
      <div className="visual-device">
        <div className="visual-screen">
          <span className="visual-sun" />
          <span className="visual-landscape landscape-back" />
          <span className="visual-landscape landscape-front" />
          <span className="visual-pixel pixel-one" />
          <span className="visual-pixel pixel-two" />
        </div>
        <div className="visual-controls"><i /><i /><i /></div>
      </div>
      <span className="visual-glow" />
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [category, setCategory] = useState("Semua");

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const filteredProducts = useMemo(
    () => category === "Semua" ? products : products.filter((product) => product.category === category),
    [category],
  );

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    setActiveTab("Cart");
    setSelectedProduct(null);
  };

  const changeQuantity = (productId: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) => item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0),
    );
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const goTo = (tab: string) => {
    setSelectedProduct(null);
    setActiveTab(tab);
  };

  return (
    <KonstaApp theme="ios" safeAreas>
      <Page className="store-page">
        <div className="store-shell">
          <Navbar
            title={
              <span className="brand-lockup">
                <span className="brand-mark">D</span>
                <span>DIVOOM</span>
              </span>
            }
            right={
              <button className="icon-button cart-shortcut" type="button" aria-label={`Keranjang, ${cartCount} item`} onClick={() => goTo("Cart")}>
                <span aria-hidden="true">⌑</span>
                {cartCount > 0 && <b>{cartCount}</b>}
              </button>
            }
            className="store-navbar"
          />

          <main className="store-content">
            {selectedProduct ? (
              <section className="detail-screen">
                <button className="back-link" type="button" onClick={() => setSelectedProduct(null)}>← Kembali ke katalog</button>
                <ProductVisual color={selectedProduct.color} />
                <div className="detail-copy">
                  {selectedProduct.tag && <span className="product-tag">{selectedProduct.tag}</span>}
                  <p className="product-category">{selectedProduct.category}</p>
                  <h1>{selectedProduct.name}</h1>
                  <p className="detail-description">{selectedProduct.description}</p>
                  <p className="detail-price">{formatPrice(selectedProduct.price)}</p>
                  <div className="detail-meta"><span>✓ Produk pilihan</span><span>✓ Garansi resmi*</span></div>
                  <Button large rounded className="primary-action" onClick={() => addToCart(selectedProduct)}>Tambah ke keranjang</Button>
                  <p className="sample-disclaimer">*Informasi garansi perlu dikonfirmasi. Harga dan produk merupakan data contoh.</p>
                </div>
              </section>
            ) : activeTab === "Home" ? (
              <HomeScreen onExplore={() => goTo("Catalog")} onProduct={openProduct} />
            ) : activeTab === "Catalog" ? (
              <CatalogScreen
                category={category}
                onCategory={setCategory}
                products={filteredProducts}
                onProduct={openProduct}
              />
            ) : activeTab === "Cart" ? (
              <CartScreen cart={cart} subtotal={subtotal} onQuantity={changeQuantity} onBrowse={() => goTo("Catalog")} />
            ) : (
              <ProfileScreen />
            )}
          </main>

          {!selectedProduct && (
            <nav className="bottom-navigation" aria-label="Navigasi utama">
              {[
                { label: "Home", icon: "⌂" },
                { label: "Catalog", icon: "▦" },
                { label: "Cart", icon: "⌑" },
                { label: "Profile", icon: "○" },
              ].map((item) => (
                <button
                  className={activeTab === item.label ? "nav-item is-active" : "nav-item"}
                  key={item.label}
                  type="button"
                  onClick={() => goTo(item.label)}
                  aria-current={activeTab === item.label ? "page" : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.label === "Cart" && cartCount > 0 && <b className="nav-count">{cartCount}</b>}
                </button>
              ))}
            </nav>
          )}
        </div>
      </Page>
    </KonstaApp>
  );
}

function HomeScreen({ onExplore, onProduct }: { onExplore: () => void; onProduct: (product: Product) => void }) {
  return (
    <>
      <section className="welcome-section" aria-labelledby="welcome-title">
        <p className="section-eyebrow">PIXEL ART. SOUND. PERSONALITY.</p>
        <h1 id="welcome-title">Make your<br />world <span>colorful.</span></h1>
        <p className="welcome-copy">Temukan speaker kreatif dan pixel display untuk membuat ruangmu lebih personal.</p>
        <Button large rounded className="discover-button" onClick={onExplore}>Jelajahi koleksi</Button>
        <div className="hero-art" aria-label="Ilustrasi pixel art display">
          <div className="pixel-device">
            <div className="pixel-screen">
              <span className="pixel-sun" />
              <span className="pixel-cloud pixel-cloud-one" />
              <span className="pixel-cloud pixel-cloud-two" />
              <span className="pixel-hill pixel-hill-back" />
              <span className="pixel-hill pixel-hill-front" />
            </div>
            <div className="device-speaker"><span /><span /><span /></div>
          </div>
          <span className="art-caption">A LITTLE MORE YOU.</span>
        </div>
      </section>

      <section className="home-products">
        <div className="section-heading">
          <div><p className="section-eyebrow">PILIHAN UNTUKMU</p><h2>Featured products</h2></div>
          <button className="text-link" type="button" onClick={onExplore}>Lihat semua →</button>
        </div>
        <div className="featured-grid">
          {products.slice(0, 2).map((product) => (
            <button className="featured-card" type="button" key={product.id} onClick={() => onProduct(product)}>
              <ProductVisual color={product.color} compact />
              <span className="featured-name">{product.name}</span>
              <span className="featured-price">{formatPrice(product.price)}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function CatalogScreen({
  category,
  onCategory,
  products: visibleProducts,
  onProduct,
}: {
  category: string;
  onCategory: (category: string) => void;
  products: Product[];
  onProduct: (product: Product) => void;
}) {
  return (
    <section className="catalog-screen">
      <div className="page-heading"><p className="section-eyebrow">TEMUKAN FAVORITMU</p><h1>Catalog</h1><p>Perangkat kreatif untuk ruang dan keseharianmu.</p></div>
      <div className="category-scroller" aria-label="Filter kategori">
        {["Semua", "Pixel Art Speaker", "Pixel Display"].map((item) => (
          <button className={category === item ? "category-chip selected" : "category-chip"} key={item} type="button" onClick={() => onCategory(item)}>{item}</button>
        ))}
      </div>
      <div className="catalog-grid">
        {visibleProducts.map((product) => (
          <button className="catalog-card" type="button" key={product.id} onClick={() => onProduct(product)}>
            <div className="catalog-image"><ProductVisual color={product.color} compact />{product.tag && <span className="product-tag">{product.tag}</span>}</div>
            <span className="product-category">{product.category}</span>
            <span className="catalog-name">{product.name}</span>
            <span className="catalog-price">{formatPrice(product.price)}</span>
          </button>
        ))}
      </div>
      <p className="sample-disclaimer">Produk dan harga di katalog ini merupakan data contoh, bukan penawaran aktual.</p>
    </section>
  );
}

function CartScreen({
  cart,
  subtotal,
  onQuantity,
  onBrowse,
}: {
  cart: CartItem[];
  subtotal: number;
  onQuantity: (productId: number, delta: number) => void;
  onBrowse: () => void;
}) {
  return (
    <section className="cart-screen">
      <div className="page-heading"><p className="section-eyebrow">SEBELUM MELANJUTKAN</p><h1>Keranjang</h1><p>{cart.length} jenis produk dipilih</p></div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">⌑</div>
          <h2>Keranjang masih kosong</h2>
          <p>Temukan perangkat Divoom yang cocok untukmu.</p>
          <Button large rounded className="primary-action" onClick={onBrowse}>Jelajahi katalog</Button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(({ product, quantity }) => (
              <article className="cart-row" key={product.id}>
                <ProductVisual color={product.color} compact />
                <div className="cart-product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <strong>{formatPrice(product.price)}</strong>
                  <div className="quantity-control">
                    <button type="button" aria-label={`Kurangi ${product.name}`} onClick={() => onQuantity(product.id, -1)}>−</button>
                    <span>{quantity}</span>
                    <button type="button" aria-label={`Tambah ${product.name}`} onClick={() => onQuantity(product.id, 1)}>+</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <p>Ongkir dan total akhir dihitung pada tahap checkout.</p>
            <Button large rounded className="primary-action" disabled>Checkout — segera hadir</Button>
            <p className="sample-disclaimer">Checkout dan pembayaran belum aktif pada Phase 2.</p>
          </div>
        </>
      )}
    </section>
  );
}

function ProfileScreen() {
  return (
    <section className="profile-screen">
      <div className="page-heading"><p className="section-eyebrow">AKUN PELANGGAN</p><h1>Profile</h1><p>Belanja sebagai guest. Akun tidak diperlukan untuk melihat katalog.</p></div>
      <div className="profile-card"><div className="profile-avatar">D</div><div><strong>Guest customer</strong><p>Login dan pengelolaan akun belum tersedia.</p></div></div>
      <div className="profile-info"><span>Pesanan</span><span>Fitur segera hadir</span></div>
      <div className="profile-info"><span>Bantuan</span><span>Fitur segera hadir</span></div>
    </section>
  );
}

export default App;
