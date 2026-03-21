import { useState, useEffect, useRef } from "react";
import "./onboarding.css";

const slides = [
  {
    eyebrow: "Empire AI",
    title: ["Res tillbaka i ", "tiden"],
    highlight: 0,
    desc: "Din guide till de stora imperiernas historia — Osmanerna och Rom. Välj kunskapsnivå och utforska en värld av erövringar, kulturer och legender.",
    iconClass: "icon-welcome",
    detail: { label: "Tre kunskapsnivåer", text: "Välj mellan Kort, Fördjupad eller Gymnasienivå." },
    tags: ["Osmanska riket", "Romarriket", "Historia"],
  },
  {
    eyebrow: "AI-chatten",
    title: ["Din personliga ", "historiker"],
    highlight: 1,
    desc: "Chatta med en AI specialiserad på Osmanerna och Rom. Spara dina konversationer och återvänd när du vill.",
    iconClass: "icon-chat",
    detail: { label: "Sparade chattar", text: "Alla konversationer sparas automatiskt." },
    tags: ["Sparade chattar", "Tre nivåer", "Specialist-AI"],
  },
  {
    eyebrow: "Tidslinjen",
    title: ["Historien år ", "för år"],
    highlight: 1,
    desc: "Bläddra genom avgörande år — från 1299 till imperiets fall. Varje händelse med djupanalys och nyckelpersoner.",
    iconClass: "icon-timeline",
    detail: { label: "Exempel: år 1299", text: "Osmanska rikets grundande av Osman I." },
    tags: ["Kronologiskt", "Nyckelpersoner", "AI-djupanalys"],
  },
  {
    eyebrow: "Quizzen",
    title: ["Tävla om ", "historiens topp"],
    highlight: 1,
    desc: "Testa dina kunskaper om sultaner och kejsare. Saml
