import { Bot, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AssistantPage() {
  return <div className="mx-auto max-w-4xl"><p className="text-sm text-neutral-500">Bientôt</p><h1 className="mt-1 text-4xl font-semibold tracking-tight">Assistant santé</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">L'assistant conversationnel n'est volontairement pas connecté à un modèle externe dans ce MVP. Avant activation, il faudra choisir un prestataire et encadrer contractuellement le traitement des données de santé.</p>
    <Card className="mt-8 p-7"><Bot className="size-7"/><h2 className="mt-5 text-xl font-semibold">Ce que cette brique fera</h2><div className="mt-5 space-y-3 text-sm leading-6 text-neutral-600"><p>• Répondre à partir des données déjà présentes dans le compte.</p><p>• Citer les analyses et dates utilisées dans chaque réponse.</p><p>• Distinguer information générale, évolution personnelle et situations nécessitant un professionnel.</p><p>• Refuser le diagnostic autonome et les décisions thérapeutiques.</p></div></Card>
    <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><ShieldAlert className="mt-1 size-5 shrink-0"/><p>La fonctionnalité est désactivée par défaut afin d'éviter d'envoyer des données sensibles à un sous-traitant non validé.</p></div>
  </div>;
}
