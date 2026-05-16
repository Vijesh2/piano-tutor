# Piano Tutor

A low-barrier browser-based piano tutor for iPad. It is built with Expo, React Native, TypeScript, and Expo Router, then exported as a static web app.

The first version is a lesson companion for a real electronic piano. It does not use MIDI, microphone input, or an on-screen keyboard. You read the prompt, play on your piano, and self-check each practice task.

## Local Development

```sh
npm install
npm run web
```

## Static Web Export

```sh
npm run export:web
```

The static site is emitted to `dist/` and can be hosted by Vercel, Netlify, GitHub Pages, or any static web server.

## Railway Deployment

This repo includes Railway config as code:

- `railway.json` tells Railway to use Railpack and run `npm run build`.
- Railway starts the static server with `npx serve dist --listen tcp://0.0.0.0:$PORT`.
- `Staticfile` tells Railway's static file server to serve `dist/`.
- `.node-version` pins Node to `20.19.4`, matching the Expo/React Native requirement.

After logging in and linking a Railway project/service, deploy with:

```sh
railway up --detach -m "Deploy piano tutor web app"
```

## Useful Checks

```sh
npm run typecheck
npm run export:web
```
