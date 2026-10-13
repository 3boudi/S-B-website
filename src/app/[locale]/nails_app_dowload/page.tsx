import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Download,
  Sparkles,
  ShieldCheck,
  Package,
  Layers,
  FileText,
  Printer,
  Calendar,
  CreditCard,
  Cpu,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
  HardDrive,
  Monitor,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function NailsAppDownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 bg-[var(--bg-primary)] dark:bg-[#0A0F0D] text-[var(--text-primary)]" dir={isAr ? "rtl" : "ltr"}>
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          
          {/* Header Banner */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 fill-current" />
              <span>{isAr ? "برنامج إدارة وتجارة الأظافر ومستحضرات التجميل بالجملة" : "Logiciel de Gestion Vente en Gros Press-on Nails & Beauté"}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-[var(--font-display)] text-slate-900 dark:text-white">
              SHEYMSS <span className="text-pink-600 dark:text-pink-400">Desktop App</span>
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? "تطبيق ويندوز احترافي وسريع، يعمل محلياً بدون إنترنت، مصمم خصيصاً لإدارة منتجات Press-on Nails، طباعة بوالص الشحن الحرارية لـ 58 ولاية لكافة مكاتب وشركات التوصيل، وتتبع المخزون والأقساط."
                : "Application Windows ultra-rapide et sécurisée, fonctionnant 100% hors-ligne. Spécialement conçue pour la gestion des Press-on Nails, étiquettes thermiques multi-transporteurs 58 Wilayas et échéanciers."}
            </p>
          </div>

          {/* Main Download Card */}
          <div className="max-w-4xl mx-auto mb-16 overflow-hidden rounded-3xl border border-pink-500/30 bg-[var(--bg-card)] dark:bg-[#111B21] p-6 sm:p-10 shadow-xl relative">
            <div className="absolute top-0 right-0 bg-pink-600 text-white text-xs font-black uppercase px-6 py-2 rounded-bl-2xl tracking-wider shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>{isAr ? "نسخة رسمية كاملة" : "Version Complète"}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center p-2 shrink-0 shadow-sm">
                    <Image
                      src="/icons8-windows-11-480.png"
                      alt="Windows 11"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      SHEYMSS v2.0 Setup
                    </h2>
                    <p className="text-xs font-semibold text-pink-600 dark:text-pink-400 mt-0.5">
                      Windows 10 / 11 (64-bit) • ~99 MB
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                    <span>{isAr ? "فترة تجريبية مجانية 7 أيام مدمجة تلقائياً" : "Période d'essai gratuite 7 jours incluse"}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                    <span>{isAr ? "قاعدة بيانات محلية آمنة 100% ولا تتطلب إنترنت" : "Base de données locale 100% hors-ligne et ultra-rapide"}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                    <span>{isAr ? "توليد ملصقات الشحن الحرارية 10x15 سم لكافة مكاتب التوصيل لـ 58 ولاية" : "Étiquettes thermiques multi-transporteurs 10x15cm pour 58 Wilayas"}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                    <span>{isAr ? "تتبع الكبسولات والمخزون ووحدات Vernis UV برقم ولون" : "Suivi capsules, matières premières et matrice Vernis UV"}</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-gradient-to-r from-pink-500/15 via-rose-500/10 to-pink-500/5 border border-pink-500/30 text-pink-900 dark:text-pink-200 font-bold text-xs sm:text-sm shadow-2xs">
                    <Palette className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                    <span>
                      {isAr
                        ? "عند شراء نسخة خاصة بك انت يا عزيزي الزبون نغير لك theme لون التطبيق و لوغو لى حسب الطلب"
                        : "Personnalisation sur mesure : À l'achat de votre version, nous adaptons le thème (couleurs) et le logo selon votre demande"}
                    </span>
                  </li>
                </ul>

                {/* Direct Download Button */}
                <div className="pt-2 space-y-3">
                  <a
                    href="/downloads/sheymss-vip-setup.exe"
                    download="sheymss-vip-setup.exe"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-black text-base shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-200 cursor-pointer"
                  >
                    <Download className="w-5 h-5 animate-bounce" />
                    <span>{isAr ? "تحميل التطبيق لويندوز (99 MB)" : "Télécharger SHEYMSS pour Windows (99 MB)"}</span>
                  </a>
                  
                  <p className="text-[11px] text-center text-[var(--text-muted)] font-mono">
                    {isAr ? "ملف التثبيت: sheymss-vip-setup.exe • مثبت آمن وسريع" : "Fichier d'installation : sheymss-vip-setup.exe"}
                  </p>
                </div>
              </div>

              {/* Right App Feature Card */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0D151A] border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span>{isAr ? "المتطلبات التقنية للتشغيل" : "Configuration Requise"}</span>
                </h3>

                <div className="space-y-2.5 text-xs text-[var(--text-secondary)]">
                  <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold">{isAr ? "نظام التشغيل:" : "Système d'exploitation :"}</span>
                    <span className="font-mono">Windows 10 / 11 (64-bit)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold">{isAr ? "المعالج (CPU):" : "Processeur :"}</span>
                    <span className="font-mono">Intel / AMD x64 (2.0 GHz+)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold">{isAr ? "الذاكرة العشوائية (RAM):" : "Mémoire RAM :"}</span>
                    <span className="font-mono">4 GB ({isAr ? "8 GB مستحسن" : "8 GB recommandé"})</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-semibold">{isAr ? "مساحة القرص:" : "Espace Disque :"}</span>
                    <span className="font-mono">~350 MB</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-semibold">{isAr ? "الطابعات المدعومة:" : "Imprimantes :"}</span>
                    <span className="font-mono">Thermique 10x15cm + A4 Laser</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? "فحص الأمان: سليم 100%" : "Garanti sans virus"}</span>
                  </span>
                  <span className="font-bold text-pink-600 dark:text-pink-400">Salon DZ Tech Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Step Quick Install Guide */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 font-[var(--font-display)]">
              {isAr ? "خطوات التثبيت السريعة في 4 خطوات" : "Installation Express en 4 Étapes"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 font-black text-lg flex items-center justify-center mx-auto">
                  1
                </div>
                <h3 className="font-bold text-sm">{isAr ? "حمّل البرنامج" : "Télécharger"}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{isAr ? "انقر على زر التحميل لحفظ ملف sheymss-vip-setup.exe" : "Cliquez sur Télécharger pour obtenir le fichier .exe"}</p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 font-black text-lg flex items-center justify-center mx-auto">
                  2
                </div>
                <h3 className="font-bold text-sm">{isAr ? "شغّل المثبت" : "Lancer le Setup"}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{isAr ? "افتح الملف المنزّل واضغط على تثبيت" : "Ouvrez le fichier d'installation sur votre PC"}</p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 font-black text-lg flex items-center justify-center mx-auto">
                  3
                </div>
                <h3 className="font-bold text-sm">{isAr ? "وافق على الشروط" : "Accepter la Licence"}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{isAr ? "اقرأ شروط الاستخدام واضغط على زر الموافقة والتالي" : "Validez les conditions d'utilisation du logiciel"}</p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-[var(--bg-card)] text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 font-black text-lg flex items-center justify-center mx-auto">
                  4
                </div>
                <h3 className="font-bold text-sm">{isAr ? "ابدأ التجربة" : "Lancer SHEYMSS"}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{isAr ? "يفتح التطبيق فوراً وتبدأ فترة الـ 7 أيام المجانية" : "L'application s'ouvre avec 7 jours d'essai gratuits"}</p>
              </div>
            </div>
          </div>

          {/* Support & Contact Banner */}
          <div className="max-w-4xl mx-auto p-6 rounded-2xl border border-border bg-[var(--bg-card)] dark:bg-[#111B21] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isAr ? "هل تحتاج مساعدة في التثبيت أو التفعيل؟" : "Besoin d'aide pour l'installation ou l'activation ?"}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {isAr ? "فريق الدعم الفني لصالون ديزاد تك جاهز لمرافقتك عبر الواتساب." : "Le support technique Salon DZ Tech est disponible sur WhatsApp."}
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/213661217601"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors shadow-xs"
            >
              <span>WhatsApp: +213 661 21 76 01</span>
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
