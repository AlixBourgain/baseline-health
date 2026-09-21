import Link from "next/link";
import { Logo } from "@/components/logo";

export default function PrivacyPage() {
  return <Legal title="Politique de confidentialité" updated="Version de travail · 20 septembre 2026">
    <p>Cette page est un modèle produit et doit être finalisée avec l'identité du responsable de traitement, ses coordonnées, ses sous-traitants, ses durées de conservation et les résultats de l'analyse d'impact avant mise en production.</p>
    <h2>1. Données traitées</h2><p>Compte utilisateur, informations de profil, documents de biologie importés, résultats structurés extraits de ces documents, métadonnées techniques strictement nécessaires à la sécurité et à l'exploitation du service.</p>
    <h2>2. Finalités</h2><p>Créer un espace personnel, stocker les documents choisis par l'utilisateur, extraire et organiser des biomarqueurs, afficher leur évolution dans le temps, assurer la sécurité et permettre l'exercice des droits.</p>
    <h2>3. Base juridique</h2><p>Le fonctionnement du compte repose sur l'exécution du service demandé. Le traitement des données de santé est prévu dans ce MVP sur la base d'un consentement explicite distinct. Cette qualification doit être confirmée juridiquement avant lancement.</p>
    <h2>4. Hébergement et sous-traitants</h2><p>[À compléter] L'environnement de production devra faire l'objet d'une analyse HDS au regard du périmètre exact du service. Aucun prestataire d'IA tiers n'est activé par défaut dans cette V1.</p>
    <h2>5. Conservation</h2><p>Les données actives sont conservées tant que le compte existe et qu'elles sont nécessaires au service. La politique de suppression des sauvegardes et journaux techniques doit être documentée avec le prestataire d'hébergement avant lancement.</p>
    <h2>6. Vos droits</h2><p>Accès, rectification, effacement, limitation et, lorsqu'elle s'applique, portabilité. L'application propose déjà un export structuré et une suppression de compte. Un canal de contact humain doit être ajouté avant mise en production.</p>
    <h2>7. Contact</h2><p>[Responsable de traitement / DPO / adresse / e-mail à compléter]</p>
  </Legal>;
}

function Legal({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return <main className="mx-auto max-w-3xl px-6 py-10"><Logo/><div className="mt-12"><p className="text-sm text-neutral-500">{updated}</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h1><article className="prose prose-neutral mt-10 max-w-none space-y-5 text-sm leading-7 text-neutral-700 [&_h2]:pt-5 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-neutral-950">{children}</article><Link href="/" className="mt-10 inline-block text-sm underline">Retour</Link></div></main>;
}
