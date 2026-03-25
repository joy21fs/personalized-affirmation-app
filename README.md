# Personalized Affirmation App

An AI-powered web app that generates short, emotionally aware affirmations based on a user’s mood and life context.

## Live Demo
https://personalized-affirmation-app.vercel.app/


## Why I Built This

Most affirmation tools feel generic and impersonal.

I wanted to explore how AI can generate responses that feel:
- emotionally aware
- context-specific
- grounded instead of cliché

This project focuses on designing AI interactions that feel human, not templated.

## Features

- Select mood (e.g. anxious, overwhelmed)
- Select context (e.g. work, relationships, future)
- Generate personalized AI affirmations
- Regenerate variations instantly
- Copy to clipboard
- Step-based, calming UI flow

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Vercel AI SDK (AI Gateway)
- v0 (AI-assisted UI generation and prototyping)

## Architecture

Client (React UI)
→ API Route (/app/api/route.ts)
→ Vercel AI SDK
→ AI Gateway (model inference)

## Key Decisions

### Prompt Design
- Constrained output to 1–2 sentences
- Avoided generic phrases and clichés
- Focused on emotional specificity instead of advice

### API Design
- Server-side AI calls to protect API keys
- Frontend communicates via fetch to API route

### UX Flow
- Step-based interaction (mood → context → result)
- Designed to reduce friction and cognitive load