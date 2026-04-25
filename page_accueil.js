const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) { // Apparaît après 500px de scroll
            backToTop.style.opacity = "1";
            backToTop.style.pointerEvents = "auto";
        } else {
            backToTop.style.opacity = "0";
            backToTop.style.pointerEvents = "none";
        }
    });

// --- EFFET TILT 3D SUR LES AFFICHES ---

const tiltImages = document.querySelectorAll('.graph-preview img');
const intensity = 15; // Augmente ici pour plus de force

tiltImages.forEach(img => {
    img.addEventListener('mousemove', e => {
        const rect = img.getBoundingClientRect();
        
        // Calcul de la position de la souris relative au CENTRE de l'image
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calcul de l'angle (-1 à 1)
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;

        // INVERSION LOGIQUE : 
        // Le mouvement horizontal (X) fait pivoter sur l'axe Vertical (Y)
        // Le mouvement vertical (Y) fait pivoter sur l'axe Horizontal (X)
        const rotateX = (percentY * -intensity).toFixed(2); 
        const rotateY = (percentX * intensity).toFixed(2);

        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

let index=0;

function moveSlide(direction) {
    const track = document.getElementById('track');
    const cards = document.querySelectorAll('.theme-card');
    const totalCards = cards.length;
    
    // 1. MODIFICATION : Calculer la largeur pour 2 photos au lieu de 3
    // On prend la largeur d'une carte + le gap (ici 15px ou 20px selon ton CSS)
    const cardWidth = cards[0].offsetWidth + 15; 

    index += direction;

    // 2. MODIFICATION : Empêcher d'aller trop loin
    // Si on voit 2 photos, on doit s'arrêter à "Total - 2"
    if (index < 0) index = 0;
    if (index > totalCards - 2) index = totalCards - 2; 

    const amountToMove = index * cardWidth;
    track.style.transform = `translateX(${-amountToMove}px)`;
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightbox.style.display = "flex";
    lightboxImg.src = src;
}

// Fonction pour fermer la lightbox
const lightbox = document.getElementById('lightbox');
lightbox.onclick = function(e) {
    // Si on clique sur la croix ou à côté de l'image, on ferme
    if (e.target !== document.getElementById('lightbox-img')) {
        lightbox.style.display = "none";
    }
}

// Remplace les noms de fichiers par tes vrais fichiers
const galleries = {
    'Chromatic': { 
        title: 'Chromatic 2000', 
        description : 'Exercice académique sur le portrait. Avec mes deux camarades, nous avons exploré une ligne directrice audacieuse : saturation extrême, accessoires colorés, jeux de perspectives et une touche d\'absurde, le tout infusé par une esthétique nostalgique des années 2000.',
        imgs: ['Images/photos/Portrait/portrait1.webp', 'Images/photos/Portrait/portrait2.webp' , 'Images/photos/Portrait/portrait3.webp', 'Images/photos/Portrait/portrait4.webp' , 'Images/photos/Portrait/portrait5.webp', 'Images/photos/Portrait/portrait6.webp', 'Images/photos/Portrait/portrait7.webp', 'Images/photos/Portrait/portrait8.webp'] },
    'Onirique': { 
        title: 'Ambiance Onirique', 
        description :'Il s’agit de photographies personnelles à travers lesquelles je cherche à créer des atmosphères douces, oniriques et légèrement romantiques. J’accorde une attention particulière à la lumière naturelle, notamment aux teintes chaudes du soleil et aux jeux de rayons traversant les arbres ou les fenêtres. L’utilisation du flou fait également partie de ma démarche, apportant une dimension poétique et sensible à mes images.' ,
        imgs: ['Images/photos/Onirique/oni1.webp', 'Images/photos/Onirique/oni2.webp', 'Images/photos/Onirique/oni3.webp', 'Images/photos/Onirique/oni4.webp', 'Images/photos/Onirique/oni6.webp', 'Images/photos/Onirique/oni7.webp', 'Images/photos/Onirique/oni8.webp', 'Images/photos/Onirique/oni9.webp', 'Images/photos/Onirique/oni10.webp', 'Images/photos/Onirique/oni11.webp', 'Images/photos/Onirique/oni12.webp'] },
    'Architecture': { 
        title: 'Architecture', 
        description : 'À travers cette série personnelle, je cherche à révéler la beauté de l’architecture sous différentes formes. J’explore aussi bien des bâtiments majestueux, comme les églises ou les châteaux, que des lieux plus ordinaires, tels qu’un coin de rue ou un bâtiment abandonné. Mon regard s’attarde autant sur la richesse des constructions que sur leur évolution, notamment lorsqu’elles sont marquées par le temps ou progressivement envahies par la nature.',
        imgs: ['Images/photos/Archi/Archi1.webp','Images/photos/Archi/Archi1.2.webp', 'Images/photos/Archi/Archi2.webp', 'Images/photos/Archi/Archi3.webp', 'Images/photos/Archi/Archi4.webp', 'Images/photos/Archi/Archi5.webp', 'Images/photos/Archi/Archi6.webp', 'Images/photos/Archi/Archi8.webp', 'Images/photos/Archi/Archi9.webp'] },
    'details': { 
        title: "Les détails de Blois", 
        description : 'Ce thème est né d\'un projet académique dont l\'objectif était de photographier le ville de Blois avec notre propre regard, un regard nouveau. J\'ai choisi de suivre une ligne artistique centrée sur le détail : de petites constructions isolées, des ornements discrets ou des éléments du quotidien plus insolites comme des pots de fleurs amusants. C\'est une exploration de ce qui compose l\'identité de la ville au-delà de ses grands monuments.',
        imgs: ['Images/photos/Details/detail1.webp', 'Images/photos/Details/detail2.webp', 'Images/photos/Details/detail3.jpg', 'Images/photos/Details/detail4.webp', 'Images/photos/Details/detail5.webp', 'Images/photos/Details/detail6.webp', 'Images/photos/Details/detail7.webp'] },
    'saturee': { 
        title: "L'Instant Vif", 
        description :'Ce thème regroupe des photos personnelles qui illustrent un style que j\'affectionne beaucoup : des photos lumineuses, vibrantes, avec des couleurs hyper saturées. Je joue sur la vivacité des couleurs pour donner une énergie pop et percutante à mes images.' ,
        imgs: ['Images/photos/Saturee/Sat1.webp','Images/photos/Saturee/Sat2.webp', 'Images/photos/Saturee/Sat3.webp', 'Images/photos/Saturee/Sat4.webp' ] }
};
function showGallery(theme) {
    const grid = document.getElementById('gallery-grid');
    const title = document.getElementById('gallery-title');
    const desc = document.getElementById('gallery-description');
    
    grid.innerHTML = ''; 
    title.innerText = galleries[theme].title;
    desc.innerText = galleries[theme].description;

    galleries[theme].imgs.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        img.classList.add('img-loading');
        img.onload = function() {
        img.classList.remove('img-loading');
    };
        img.onclick = () => openLightbox(src);
        img.style.cursor = "zoom-in"; // Curseur loupe pour l'utilisateur


        grid.appendChild(img);

    });
    setTimeout(() => {
        title.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // 100ms c'est le temps d'un clin d'œil, assez pour que la page "s'allonge"
}


    
