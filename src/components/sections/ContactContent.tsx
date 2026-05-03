"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactContent() {
  const t = useTranslations("buyModal");
  const c = useTranslations("footer.contact");

  return (
    <section className="mx-auto max-w-4xl px-4 md:px-6">
      <div className="text-center mb-12 mt-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] text-[var(--text-primary)] mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          href="https://wa.me/213000000000" // Replace with real WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-2xl bg-[#25D366] p-6 sm:p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/20"
        >
          <div className="rounded-full bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
            <FaWhatsapp className="h-12 w-12" />
          </div>
          <span className="text-xl font-bold">WhatsApp</span>
          <span className="text-sm text-white/90 text-center">
            {t("chatDescription")}
          </span>
        </motion.a>

        {/* Facebook Card */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          href={t("facebookUrl")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-2xl bg-[#1877F2] p-6 sm:p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1877F2]/20"
        >
          <div className="rounded-full bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
            <FaFacebook className="h-12 w-12" />
          </div>
          <span className="text-xl font-bold">{t("facebook")}</span>
          <span className="text-sm text-white/90 text-center">
            {t("chatDescription")}
          </span>
        </motion.a>

        {/* Instagram Card */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          href={t("instagramUrl")}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4] p-6 sm:p-8 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#F56040]/20"
        >
          <div className="rounded-full bg-white/20 p-4 transition-transform duration-300 group-hover:scale-110">
            <FaInstagram className="h-12 w-12" />
          </div>
          <span className="text-xl font-bold">{t("instagram")}</span>
          <span className="text-sm text-white/90 text-center">
            {t("chatDescription")}
          </span>
        </motion.a>
      </div>
    </section>
  );
}
