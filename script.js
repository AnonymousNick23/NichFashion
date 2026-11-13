const WHATSAPP_NUMBER = "08164406684";
const slides = [
  {title:"THE HERITAGE EDIT", image:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=90"},
  {title:"BOLD BY NATURE", image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=90"},
  {title:"THE OCCASION LOOK", image:"https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=1400&q=90"},
  {title:"MODERN AFRICAN SOUL", image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90"},
  {title:"ELEGANCE IN COLOUR", image:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1400&q=90"},
  {title:"MADE FOR THE MOMENT", image:"https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=90"},
  {title:"A NEW CLASSIC", image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=90"},
  {title:"THE STATEMENT SERIES", image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90"},
  {title:"TIMELESS DETAILS", image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90"},
  {title:"CULTURE, REIMAGINED", image:"https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1400&q=90"}
];
const products = [
  ["Aso-Oke Royal Set","Traditional","₦85,000","A regal Aso-Oke inspired two-piece look for celebrations and cultural occasions.","https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85"],
  ["Ankara Bloom Dress","Traditional","₦62,000","A vibrant Ankara-inspired dress with a confident, feminine silhouette.","https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=800&q=85"],
  ["Modern Agbada Luxe","Traditional","₦120,000","A modern take on a classic flowing Agbada look.","https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85"],
  ["The Adire Muse","Modern","₦58,000","A contemporary look inspired by the expressive beauty of Adire patterns.","https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=85"],
  ["Celebration Kaftan","Occasion","₦75,000","An elegant kaftan silhouette made for memorable entrances.","https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85"],
  ["Owambe Statement","Occasion","₦95,000","A standout celebration outfit with rich colour and presence.","https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=85"],
  ["The Lagos Edit","Modern","₦54,000","Effortless city style with a bold fashion-forward finish.","https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85"],
  ["Aso-Ebi Elegance","Occasion","₦110,000","A polished occasion look for weddings, parties and special gatherings.","https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85"],
  ["Heritage Wrap Set","Traditional","₦68,000","A heritage-inspired wrap set with a contemporary feel.","https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=85"],
  ["Golden Hour Gown","Occasion","₦130,000","A graceful statement gown designed for special moments.","https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"],
  ["Everyday Ankara","Modern","₦45,000","A relaxed Ankara-inspired piece for expressive everyday dressing.","https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85"],
  ["Beaded Crown Detail","Accessories","₦25,000","A finishing accessory to bring extra character to your look.","https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"]
];
// Extend the catalogue to a maximum of 50 cards while keeping the demo clearly labelled as sample styles.
const catalogue = Array.from({length:50},(_,i)=> {
  const p = products[i % products.length];
  const suffix = i < products.length ? "" : ` ${String(i+1).padStart(2,"0")}`;
  return {name:p[0]+suffix,category:p[1],price:p[2],description:p[3],image:p[4]};
});
let currentSlide = 0;
const heroImage = document.getElementById("heroImage");
function showSlide(index){
  currentSlide = (index + slides.length) % slides.length;
  heroImage.style.opacity = "0.25";
  setTimeout(()=>{
    heroImage.src = slides[currentSlide].image;
    heroImage.alt = slides[currentSlide].title;
    document.getElementById("heroCaption").textContent = slides[currentSlide].title;
    document.getElementById("heroNumber").textContent = `${String(currentSlide+1).padStart(2,"0")} / 10`;
    document.getElementById("slideProgress").style.width = `${(currentSlide+1)*10}%`;
    heroImage.style.opacity = "1";
  },150);
}
document.getElementById("prevSlide").addEventListener("click",()=>showSlide(currentSlide-1));
document.getElementById("nextSlide").addEventListener("click",()=>showSlide(currentSlide+1));
let slideTimer = setInterval(()=>showSlide(currentSlide+1),5000);
document.querySelector(".hero-visual").addEventListener("mouseenter",()=>clearInterval(slideTimer));
document.querySelector(".hero-visual").addEventListener("mouseleave",()=>slideTimer=setInterval(()=>showSlide(currentSlide+1),5000));

const grid = document.getElementById("productGrid");
let activeFilter = "All";
function renderProducts(){
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const filtered = catalogue.filter(p=>(activeFilter==="All" || p.category===activeFilter) && (p.name.toLowerCase().includes(query)||p.description.toLowerCase().includes(query)));
  grid.innerHTML = "";
  filtered.forEach((p)=>{
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `<div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.category}</span><span class="quick-view">VIEW STYLE & ENQUIRE ↗</span></div><div class="product-info"><div><h3>${p.name}</h3><p>NicholasFashion Word</p></div><span class="product-price">${p.price}</span></div>`;
    card.addEventListener("click",()=>openProduct(p));
    grid.appendChild(card);
  });
  if(!filtered.length) grid.innerHTML = '<p class="empty-state">No styles found. Try another search or category.</p>';
}
document.getElementById("filters").addEventListener("click",e=>{
  const btn=e.target.closest("[data-filter]"); if(!btn)return;
  activeFilter=btn.dataset.filter;
  document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));
  renderProducts();
});
document.getElementById("searchInput").addEventListener("input",renderProducts);

const modal=document.getElementById("productModal");
let selectedProduct=null;
function openProduct(p){
  selectedProduct=p;
  document.getElementById("modalImage").src=p.image;
  document.getElementById("modalImage").alt=p.name;
  document.getElementById("modalTitle").textContent=p.name;
  document.getElementById("modalDescription").textContent=p.description;
  document.getElementById("modalCategory").textContent=p.category;
  document.getElementById("modalPrice").textContent=p.price;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow="";}
document.getElementById("modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
document.getElementById("whatsappButton").addEventListener("click",()=>{
  if(!selectedProduct)return;
  const message=`Hello NicholasFashion Word, I want to buy this: ${selectedProduct.name}. Description: ${selectedProduct.description}. Price shown: ${selectedProduct.price}. Image link: ${selectedProduct.image}`;
  const digits=WHATSAPP_NUMBER.replace(/\D/g,"");
  const phoneNumber=digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,"_blank","noopener");
});
const menuToggle=document.getElementById("menuToggle"), mobileNav=document.getElementById("mobileNav");
menuToggle.addEventListener("click",()=>{
  const open=mobileNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mobileNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();
