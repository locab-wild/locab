import React, { useState } from "react";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../../components/Layout";
import styles from "../../styles/SendEmailMdp.module.css";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function ResetMdp() {
  const { t } = useTranslation("SendEmailResetPassword");
  const [email, setEmail] = useState("");
  const [showform, setShowForm] = useState(true);
  const [showResultMessage, setShowResultMessage] = useState(false);
  const notify = () => toast.success("Email envoyé avec succès !");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/reset-password-email", { email })
      .then(() => {
        setShowForm(!showform);
        setShowResultMessage(!showResultMessage);
      })
      .catch(() => {
        toast.error("cet email n'appartient à aucun utilisateur actif");
      });
    notify();
  };
  return (
    <Layout>
      <Head>
        <title>{t("Modifiervotremotdepasse")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {showform && (
          <>
            <h4 className={styles.title}>
              {t("Réinitialiservotremotdepasse")}
            </h4>
            <div className={styles.containerGlobal}>
              <div className={styles.forms}>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="emailreset" className={styles.label}>
                    {t("Entrezunemail")}
                  </label>
                  <input
                    type="email"
                    name="emailreset"
                    id="emailreset"
                    data-cy="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    data-cy="sendResetLinkBtn"
                    className={styles.button}
                  >
                    {t("Envoyer")}
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
        {showResultMessage && (
          <div className={styles.divMessage}>
            <h2 className={styles.title1}>{t("Vérifiezvotreboiteemail")}</h2>
            <span>
              <Toaster position="top-center" reverseOrder={true} />
            </span>
            <p className={styles.paragraphe1}>
              {t(
                "Sivotreemailexistedansnotrebasededonnées,vousrecevrezunemailvousexpliquantlamarcheàsuivrepourréinitialiservotremotdepasse"
              )}
            </p>
            <div className={styles.email}>{email}</div>
            <p className={styles.paragraphe1}>
              {t("Sivousnevoyezpasl'email,vérifiezdansvosspams")}
            </p>
            <button
              className={styles.button1}
              onClick={() => {
                setShowForm(!showform);
                setShowResultMessage(!showResultMessage);
              }}
            >
              {t("Jeveuxunnouveaulien")}
            </button>
          </div>
        )}
      </main>
    </Layout>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "banner",
        "cart",
        "header",
        "home",
        "connection",
        "profile",
        "common",
        "signIn",
        "NewPassword",
        "SendEmailResetPassword",
        "footer",
        "reservation",
      ])),
    },
  };
}
