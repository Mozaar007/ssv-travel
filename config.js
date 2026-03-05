// ============================================================
// ⚙️  SSV TRAVEL — CONFIGURATION DE L'ENTREPRISE
// ============================================================
// 
// 📝 INSTRUCTIONS :
// Modifiez les valeurs ci-dessous avec vos vraies informations.
// Rechargez la page pour voir les changements.
//
// ============================================================

const SITE_CONFIG = {

    // ──────────────────────────────────────────────
    // 🏢  INFORMATIONS GÉNÉRALES
    // ──────────────────────────────────────────────
    nomEntreprise: "SSV Travel",
    slogan: "Plus de stress!!! Reservez en clic, nous faisons le reste ",
    anneeCreation: 2026,

    // ──────────────────────────────────────────────
    // 📞  NUMÉROS DE TÉLÉPHONE
    // ──────────────────────────────────────────────
    telephonePrincipal: "+237 656 979 239",       // Numéro principal affiché sur le site
    telephoneSecondaire: "+237 673 47 49 79",      // Numéro secondaire (optionnel)

    // ──────────────────────────────────────────────
    // 💬  WHATSAPP
    // ──────────────────────────────────────────────
    whatsappNumero: "+237 656 979 239",           // Numéro WhatsApp (avec indicatif +237)
    whatsappLien: "https://wa.me/237656979239",   // Lien direct WhatsApp (remplacez les X)

    // ──────────────────────────────────────────────
    // 📧  EMAILS
    // ──────────────────────────────────────────────
    emailPrincipal: "ssvreservation@gmail.com",          // Email principal
    emailReservation: "ssvreservation@gmail.com", // Email pour les réservations

    // ──────────────────────────────────────────────
    // 📍  ADRESSES PHYSIQUES
    // ──────────────────────────────────────────────
    adressePrincipale: "Yaoundé, Cameroun",        // Agence principale
    adresseComplete: "Pétrolex Ngousso,Yaounde Cameroun", // Adresse complète
    adresseSecondaire: "",                        // Agence secondaire (laisser vide si aucune)

    // ──────────────────────────────────────────────
    // 🕐  HORAIRES D'OUVERTURE
    // ──────────────────────────────────────────────
    horairesLundiVendredi: "08h00 - 18h00",
    horairesSamedi: "09h00 - 15h00",
    horairesDimanche: "Fermé",

    // ──────────────────────────────────────────────
    // 🌐  RÉSEAUX SOCIAUX (Liens vers vos pages)
    // ──────────────────────────────────────────────
    facebookUrl: "https://facebook.com/ssvtravel",
    instagramUrl: "https://instagram.com/ssvtravel",
    tiktokUrl: "",                                 // Laisser vide si pas de TikTok
    youtubeUrl: "",                                // Laisser vide si pas de YouTube
    linkedinUrl: "",                               // Laisser vide si pas de LinkedIn

    // ──────────────────────────────────────────────
    // 💳  MODES DE PAIEMENT ACCEPTÉS
    // ──────────────────────────────────────────────
    modesPaiement: [
        "Orange Money",
        "MTN Mobile Money",
        "Carte Bancaire (Visa / Mastercard)",
        "Virement Bancaire",
        "Espèces en agence"
    ],

    // ──────────────────────────────────────────────
    // 📊  STATISTIQUES (affichées dans le hero)
    // ──────────────────────────────────────────────
    statsClients: 2500,
    statsDestinations: 85,
    statsAnnees: 10,

    // ──────────────────────────────────────────────
    // 🗺️  GOOGLE MAPS (lien vers votre agence)
    // ──────────────────────────────────────────────
    googleMapsLien: "https://maps.google.com/?q=Douala+Cameroun",

};

// ============================================================
// 🔄  APPLICATION AUTOMATIQUE DE LA CONFIGURATION
// ============================================================
// Ce code injecte automatiquement vos informations dans la page.
// Vous n'avez PAS besoin de modifier cette partie.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
});

function applyConfig() {
    const C = SITE_CONFIG;

    // --- Statistiques Hero ---
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length >= 3) {
        statNumbers[0].setAttribute('data-target', C.statsClients);
        statNumbers[1].setAttribute('data-target', C.statsDestinations);
        statNumbers[2].setAttribute('data-target', C.statsAnnees);
    }

    // --- Contact info (section formulaire) ---
    const contactItems = document.querySelectorAll('#contact .contact-item');
    if (contactItems.length >= 3) {
        // Téléphone / WhatsApp
        const phoneDiv = contactItems[0].querySelector('div:last-child');
        if (phoneDiv) {
            phoneDiv.querySelector('span').textContent = C.telephoneSecondaire ? `${C.telephonePrincipal} / ${C.telephoneSecondaire}` : C.telephonePrincipal;
        }
        // Email
        const emailDiv = contactItems[1].querySelector('div:last-child');
        if (emailDiv) {
            emailDiv.querySelector('span').textContent = C.emailPrincipal;
        }
        // Adresse
        const addrDiv = contactItems[2].querySelector('div:last-child');
        if (addrDiv) {
            addrDiv.querySelector('span').textContent = C.adressePrincipale;
        }
    }

    // --- Footer contact ---
    const footerContact = document.getElementById('footerContactList');
    if (footerContact) {
        footerContact.innerHTML = `
            <li>📞 ${C.telephoneSecondaire ? `${C.telephonePrincipal} / ${C.telephoneSecondaire}` : C.telephonePrincipal}</li>
            <li>💬 WhatsApp: ${C.telephoneSecondaire ? `${C.telephonePrincipal} / ${C.telephoneSecondaire}` : C.telephonePrincipal}</li>
            <li>📧 ${C.emailPrincipal}</li>
            <li>📍 ${C.adressePrincipale}</li>
            ${C.adresseComplete ? `<li>🏢 ${C.adresseComplete}</li>` : ''}
        `;
    }

    // --- Footer horaires ---
    const footerHoraires = document.getElementById('footerHorairesList');
    if (footerHoraires) {
        footerHoraires.innerHTML = `
            <li>Lun - Ven: ${C.horairesLundiVendredi}</li>
            <li>Samedi: ${C.horairesSamedi}</li>
            <li>Dimanche: ${C.horairesDimanche}</li>
        `;
    }

    // --- Footer paiement ---
    const footerPaiement = document.getElementById('footerPaiementList');
    if (footerPaiement) {
        footerPaiement.innerHTML = C.modesPaiement.map(m => `<li>✓ ${m}</li>`).join('');
    }

    // --- Réseaux sociaux ---
    const fbLink = document.getElementById('socialFacebook');
    const igLink = document.getElementById('socialInstagram');
    const waLink = document.getElementById('socialWhatsapp');

    if (fbLink) fbLink.href = C.facebookUrl || '#';
    if (igLink) igLink.href = C.instagramUrl || '#';
    if (waLink) waLink.href = C.whatsappLien || '#';

    // --- Copyright ---
    const copyright = document.getElementById('copyrightText');
    if (copyright) {
        copyright.textContent = `© ${C.anneeCreation} ${C.nomEntreprise}. Tous droits réservés.`;
    }

    // --- Footer slogan ---
    const footerSlogan = document.getElementById('footerSlogan');
    if (footerSlogan) {
        footerSlogan.textContent = C.slogan;
    }
}
