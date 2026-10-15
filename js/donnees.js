/* ===== DONNÉES DU COUPLE : modifier ce fichier suffit pour un nouveau client ===== */
const U = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const I = ['photo-1519741497674-611481863552', 'photo-1511285560929-80b456fea0bc', 'photo-1465495976277-4387d4b0b4c6', 'photo-1606216794074-735e91aa2c92', 'photo-1583939003579-730e3918a45a', 'photo-1519225421980-715cb0215aed', 'photo-1537633552985-df8429e8048b', 'photo-1522673607200-164d1b6ce486'];
window.DATA = {
    signature: "Million's Dev",
    date: "20 décembre 2026", dateISO: "2026-12-20T16:00:00", lieu: "Douala, Cameroun",
    intro: "Deux âmes, une histoire, un amour éternel.",
    mots: ["Amour", "Promesse", "Élégance", "Éternité", "Famille", "Joie"],
    hero: U(I[0], 2200),
    a: { nom: "Amélie", role: "La mariée", bio: "Lumineuse et rêveuse, elle croit aux petits gestes et aux grandes promesses.", photo: U(I[5], 900) },
    b: { nom: "Daniel", role: "Le marié", bio: "Calme et attentionné, il a trouvé en elle l'évidence d'une vie entière.", photo: U(I[6], 900) },
    citation: "Aimer, ce n'est pas se regarder l'un l'autre, c'est regarder ensemble dans la même direction.",
    chap: [
        { t: "La rencontre", date: "Printemps 2019", txt: "Un regard échangé, un rire partagé, et le monde a basculé doucement.", anec: "Il lui a offert un café renversé, elle lui a offert son premier vrai sourire.", img: [1, 2, 3] },
        { t: "Les fiançailles", date: "Décembre 2025", txt: "Sous un ciel d'or, une question, une larme, un oui pour toujours.", anec: "Elle a dit oui avant même qu'il ait fini sa phrase.", img: [4, 5, 2] },
        { t: "Le mariage", date: "20 décembre 2026", txt: "Préparatifs, alliances, bénédictions, danses : le plus beau jour, entouré de tous ceux qu'ils aiment.", anec: "Ce jour-là, deux familles sont devenues une seule.", img: [0, 6, 7] }],
    photos: [
        ["Rencontre", 1, "Les premiers instants", "2019"], ["Rencontre", 3, "Une complicité naissante", "2019"],
        ["Fiançailles", 4, "La demande", "2025"], ["Fiançailles", 5, "Le oui", "2025"],
        ["Préparatifs", 2, "Dernières retouches", "20 déc."], ["Préparatifs", 7, "Le voile", "20 déc."],
        ["Cérémonie", 0, "L'échange des alliances", "20 déc."], ["Cérémonie", 6, "La bénédiction", "20 déc."],
        ["Séance photo", 5, "Lumière d'or", "20 déc."], ["Séance photo", 1, "Main dans la main", "20 déc."],
        ["Réception", 3, "La première danse", "20 déc."], ["Réception", 4, "Toute la joie réunie", "20 déc."]
    ].map(([album, i, cap, date], n) => ({ album, src: U(I[i], 1400), cap, date, h: n * 31 })),
    albums: ["Rencontre", "Fiançailles", "Préparatifs", "Cérémonie", "Séance photo", "Réception"],
    /* Format uniforme : ar = "Artiste - Titre". Les fichiers doivent être dans assets/musiques/ avec EXACTEMENT ces noms (casse comprise). */
    pistes: [
  { t: "Premier regard", ar: "Fally - 8e Merveille", cat: "Rencontre", src: "assets/musiques/Fally_Ipupa_-_8ème_Merveille__Clip_Vidéo_(256k).mp3", cv: 1 },
  { t: "Le grand oui", ar: "Fally - Deux êtres", cat: "Fiançailles", src: "assets/musiques/Fally Ipupa - Deux êtres.mp3", cv: 4 },
  { t: "Vers l'autel", ar: "Lewis Capaldi - Someone You Loved", cat: "Cérémonie", src: "assets/musiques/Lewis_Capaldi_-_Someone_You_Loved(256k).mp3", cv: 0 },
  { t: "Notre première danse", ar: "Tayc - Forévà", cat: "Première danse", src: "assets/musiques/Tayc_-_Forévà__Visualizer_(256k).mp3", cv: 3 },
  // Remplace ou supprime cette piste : I_Love_You.mp3 n'existe pas
  { t: "Fêtons l'amour", ar: "Tayc", cat: "Célébration", src: "assets/musiques/dad_loveyou.mp3", cv: 7 } // ou choisis un autre fichier existant
],
    /* Catégories musicales (utiles si le filtre des musiques en a besoin) */
    catsMusique: ["Rencontre", "Fiançailles", "Cérémonie", "Première danse", "Célébration"],
    temoins: [{ n: "Claire Mbarga", l: "Témoin de la mariée, amie d'enfance", m: "Je l'ai vue rêver de ce jour depuis toujours.", i: 6 }, { n: "Paul Essomba", l: "Témoin du marié, frère de cœur", m: "Un homme heureux est un homme qui a trouvé sa moitié.", i: 7 }],
    parents: [{ n: "Mme & M. Fotso", l: "Parents de la mariée", m: "Notre fille rayonne : merci de prendre soin d'elle.", i: 2 }, { n: "Mme & M. Nkou", l: "Parents du marié", m: "Fiers de l'homme qu'il est devenu, heureux de vous accueillir.", i: 3 }],
    proches: [{ n: "Tante Béatrice", m: "Que votre maison soit remplie de rires." }, { n: "Les amis de la fac", m: "Vous êtes la preuve que les belles histoires existent." }, { n: "Cousine Sandra", m: "Tout notre amour vous accompagne." }],
    final: "Aujourd'hui, deux chemins n'en forment plus qu'un. Que cette histoire continue de s'écrire dans l'amour, la complicité et le bonheur.",
    sign: "Pour toujours, ensemble."
};
DATA.img = i => U(I[i], 1000);
Object.assign(DATA, {
    chiffres: [[7, "années d'amour"], [250, "invités attendus"], [12, "pays visités ensemble"], [1, "vie à partager"]],
    stats2: [[2019, "l'année de leur rencontre"], [2025, "l'année des fiançailles"], [1000, "messages échangés chaque mois"], [1, "seul et même rêve"]],
    promesses: ["Te choisir chaque matin, même les jours ordinaires.", "Rire ensemble, surtout quand tout va de travers.", "Bâtir un foyer où chacun grandit.", "Garder nos familles au cœur de notre histoire.", "Avancer main dans la main, quoi qu'il arrive."],
    passions: [["Elle aime", "Les fleurs fraîches, la danse, le thé au gingembre et les dimanches sans horloge."], ["Il aime", "La musique, la cuisine du dimanche, les longues marches et les promesses tenues."]],
    frise: [["Printemps 2019", "Le premier regard", "Une rencontre qui change tout."], ["Été 2020", "Le premier voyage", "Deux valises, un seul horizon."], ["Hiver 2022", "La présentation aux familles", "Les deux maisons s'ouvrent."], ["Décembre 2025", "La demande", "Un oui sous un ciel d'or."], ["20 décembre 2026", "Le grand jour", "Deux chemins n'en forment plus qu'un."]],
    programme: [["14h00", "Accueil des invités", "Rafraîchissements et musique douce."], ["15h00", "Cérémonie civile", "Échange des consentements à la mairie."], ["16h30", "Bénédiction nuptiale", "Prières, alliances et signatures."], ["18h00", "Séance photo", "Portraits du couple et des familles."], ["19h30", "Dîner de réception", "Entrées, discours et plat principal."], ["21h00", "Projection de notre histoire", "Le film des souvenirs sur grand écran."], ["22h00", "Première danse", "Les mariés ouvrent le bal."], ["23h00", "Soirée dansante", "La fête continue jusqu'au bout de la nuit."]],
    infos: [["Le lieu", "Salle de réception, Douala. L'adresse exacte est communiquée avec l'invitation."], ["La tenue", "Élégance en tons ivoire, champagne, rose poudré ou vert sauge."], ["Contact", "Pour toute question, écrivez aux organisateurs avant le 1er décembre."]],
    dedicaces: [["De Claire", "Cette chanson, c'est vous deux, simplement."], ["De Paul", "Pour la première danse, laissez le monde disparaître."], ["Des cousins", "Celle-ci, c'est pour faire danser toute la salle !"]],
    lieuTxt: "Une salle baignée de lumière dorée, à Douala, pour accueillir ceux qu'ils aiment."
});

/* Diagnostic audio : à supprimer une fois le problème réglé */
DATA.pistes.forEach(p => {
  fetch(p.src, { method: 'HEAD' })
    .then(r => console.log(r.ok ? '✅' : '❌', r.status, p.src, r.headers.get('content-type')))
    .catch(e => console.log('❌ inaccessible', p.src, e.message));
});