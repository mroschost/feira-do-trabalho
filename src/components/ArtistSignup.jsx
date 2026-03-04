import React from "react";
import { dataService } from "@/services/DataService";

const isArtistSignupActive = (signup) => {
  if (!signup?.formUrl || !signup?.startDate || !signup?.endDate) return false;

  const now = new Date();
  const start = new Date(`${signup.startDate}T00:00:00-03:00`);
  const end = new Date(`${signup.endDate}T23:59:59-03:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  return now >= start && now <= end;
};

const formatSignupPeriod = (start, end) => {
  if (!start || !end) return "";
  const s = new Date(`${start}T00:00:00-03:00`);
  const e = new Date(`${end}T00:00:00-03:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return "";

  const fmt = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `${fmt.format(s)} a ${fmt.format(e)}`;
};

const ArtistSignup = () => {
  const currentEdition = dataService.getCurrentEdition();
  const artistSignup = currentEdition?.artistSignup ?? null;

  const show = isArtistSignupActive(artistSignup);
  if (!show) return null;

  const period = formatSignupPeriod(artistSignup.startDate, artistSignup.endDate);

  return (
    <section aria-label="Chamamento público de artistas" className="w-full bg-white">
      <div className="container px-4 py-10 mx-auto">
        <div
          className="relative max-w-5xl p-6 mx-auto overflow-hidden text-center bg-center bg-cover rounded-2xl ring-1 ring-black/10 sm:p-8 shadow-lg"
          style={{ backgroundImage: "url('/images/artist-signup-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px]" aria-hidden="true" />
          <div className="relative z-10">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Chamamento público de artistas
          </h2>

          <p className="mt-3 text-base text-gray-700 sm:text-lg">
            Quer se apresentar na próxima edição da feira? Faça sua inscrição no formulário.
          </p>

          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Edição:</span> {currentEdition?.name}
          </p>

          {period ? (
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Período de inscrição:</span> {period}
            </p>
          ) : null}

          <div className="flex justify-center mt-6">
            <a
              href={artistSignup.formUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-[#3FA637] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
              aria-label="Abrir formulário de inscrição de artistas"
            >
              Inscrever artista
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            * Ao clicar, você será direcionado para um formulário externo (Google Forms).
          </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSignup;