Website Demo: https://nail-art-3d-website.vercel.app

# 💅 Aura Nail Art & VIP 3D Booking Platform

<p align="center">
  <img src="src/assets/logos/logonail.png" alt="Aura Nail Logo" width="180px" style="border-radius: 50%; box-shadow: 0 10px 30px rgba(142, 28, 50, 0.3);" />
</p>

<p align="center">
  <strong>Lüks, Minimalizm ve 3D Etkileşimin Kusursuz Uyumu</strong>
</p>

<p align="center">
  Aura Nail Art & Studio için özel olarak geliştirilmiş; modern 3D etkileşimler, fizik tabanlı akıcı animasyonlar ve premium bordo renk paletiyle donatılmış yüksek prestijli bir portföy ve VIP randevu platformu.
</p>

---

## 🚀 Öne Çıkan Özellikler

### 1. 🎫 3D Holografik VIP Rezervasyon Kartı (Ticket)
* **Manyetik Takip (Attractive Drift)**: Sol sütundaki VIP Kart, kullanıcının fare hareketlerini akıcı bir şekilde takip ederek 3D düzlemde gerçeğe yakın bir derinlik (`perspective`) ve eğilme hissi uyandırır.
* **Dinamik Bilgi Eşleme**: Kullanıcı formda ilerledikçe adı, seçtiği hizmet, tasarım uzmanı, randevu tarihi ve saati kartın üzerine anlık ve sinematik geçişlerle yansıtılır.
* **Holografik Yansıma**: Fare hareketine göre kartın üzerinde gerçek zamanlı değişen ışık/parlama efekti (`radial-gradient`) uygulanır.

### 2. 🎡 3D Silindirik Hizmet Seçim Karouseli
* **Trigonometrik Matematiksel Model**: Hizmetler dikey bir silindir yüzeyine yerleştirilmiştir. Kartların konumları (`x`), derinlikleri (`z`), açıları (`rotateY`), opaklıkları (`opacity`) ve boyutları (`scale`) fareyle veya dokunmatik ekranla sürükleme mesafesine bağlı olarak trigonometrik formüllerle (`sin` / `cos`) dinamik hesaplanır.
* **Fizik Tabanlı Jestler**: Framer Motion `PanInfo` jestleri kullanılarak serbestçe sürüklenebilir. Sınır dışı kaydırmalarda esnek bir "rubber-band" direnci uygulanır. Sürükleme bırakıldığında en yakın karta yay (`spring`) mekanizmasıyla pürüzsüzce hizalanır (snap).

### 3. 📑 Akordeon Hizmet Slider'ı
* **Akıcı Boyut Geçişleri**: Hizmet kartları üzerine gelindiğinde anlık sınıf değişimi yerine sayısal flex değerleri (`flex: 5` ve `flex: 0.1`) CSS transition ile enterpolasyon edilerek yumuşakça genişler/daralır.
* **Gecikmeli Yazı Animasyonu**: Kartın genişlemesi tamamlandıktan sonra (650ms gecikmeyle) başlık ve açıklamalar yumuşak bir fade-in efektiyle görünür; kart daralırken ise yazılar anında kaybolur.

### 4. 🗂 Katmanlı Portföy Kartları (Stacked Scroll)
* **Sticky Stacking**: Portföy projeleri sayfa kaydırıldıkça üst üste yığılır (`sticky`).
* **Derinlik Algısı**: Altta kalan kartlar tamamen yarı saydamlaşmak yerine `scale` ve `blur` efektleriyle arka plana itilir, böylece metinlerin üst üste binerek okunabilirliği bozması engellenir.

---

## 🛠 Kullanılan Teknolojiler (Tech Stack)

| Teknoloji | Görevi / Rolü |
| :--- | :--- |
| **React 18** | Bileşen tabanlı modüler mimari ve kararlı state yönetimi |
| **TypeScript 6** | Statik tip güvenliği, ölçeklenebilir kod yapısı ve IDE desteği |
| **Vite 8** | Ultra hızlı yerel geliştirme sunucusu ve optimize edilmiş üretim derlemesi |
| **Tailwind CSS 3** | Tasarım sistemi tokenları, modern ve duyarlı (responsive) yerleşim pratikleri |
| **Framer Motion 12** | Jestler, 3D transformasyonlar ve bileşen arası akıcı geçiş animasyonları |

---

## 🎨 Tasarım Sistemi ve Estetik (Design Tokens)

* **Arka Plan**: `#0C0C0C` (Derin, lüks gece siyahı)
* **Metin / Tipografi**: `#D7E2EA` (Yumuşak platin/gri metalik ton)
* **Aksan / Vurgu**: `#8E1C32` & `#A4163D` (Premium bordo / kadife gül tonları)
* **Yazı Tipi**: **Kanit** (Google Fonts üzerinden yüklenen modern, güçlü sans-serif karakter seti)
* **Mikro Etkileşimler**: Butonlarda bordo metalik gradyanlar, parlayan iç/dış gölgeler ve hover durumlarında yaylanan scale efektleri kullanılmıştır.

---

## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Depoyu Klonlayın**:
   ```bash
   git clone https://github.com/SoykanSOYLU/nail-art-3d-website.git
   ```

2. **Proje Dizinine Gidin**:
   ```bash
   cd nailart
   ```

3. **Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

4. **Geliştirme Sunucusunu Başlatın**:
   ```bash
   npm run dev
   ```
   *Tarayıcınızda `http://localhost:5173` adresine giderek projeyi görüntüleyebilirsiniz.*

5. **Üretim Derlemesi Alın**:
   ```bash
   npm run build
   ```
   *Derlenmiş statik dosyalar `dist/` klasörü altında hazır hale gelecektir.*

---

## ⚙️ Performans Optimizasyonları

* **Bileşen Bellek Yönetimi (Layout Thrashing Prevention)**: VIP Bilet kartının 3D hareketleri esnasında fare konumunu izlemek için her frame'de `getBoundingClientRect` çağrılmamış, bunun yerine koordinat limitleri sayfa boyutlandırma (`resize`) ve fare girişi (`mouseenter`) anlarında bir `ref` içinde önbelleğe alınarak GPU optimizasyonu sağlanmıştır.
* **Scroll Throttling**: Marquee kaydırma şeridi ve genel sayfa animasyonları, ekran dışındayken `IntersectionObserver` ile tamamen pasifleştirilir ve işlemci yorulması önlenir. Tüm scroll güncellemeleri `requestAnimationFrame` ile throttle edilmiştir.
* **React 18 & Hooks Uyumu**: Tüm animasyon durumları ve render döngüleri React'in hook kurallarına tam uyumlu olarak modüler bileşen yapılarında izole edilmiştir.
