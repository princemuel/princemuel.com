# princemuel.netlify.app

Source code for my website, [princemuel.netlify.app](https://princemuel.netlify.app)

This is my personal space on the internet. It is to serve as a portfolio website,
blog, and a way for other like-minded devs who want to reach out to communicate with me.

The website contains [articles I wrote](https://princemuel.netlify.app/blog),
a [list of projects](https://princemuel.netlify.app/projects) I made, and finally,
[a wiki about various things](https://princemuel.netlify.app/wiki) among other stuff.

## Tech stack

Made using [Astro](https://astro.build), styled using [Tailwind](https://tailwindcss.com/)
and the interactive parts are written in [Typescript](https://www.typescriptlang.org/)

### Technical motivations

While I don't necessarily have big ambitions for this website, I'm still trying
to make it a great experience.
As such, here are a few rules that I _(try my best)_ follow for that purpose:

#### Performance

- Pages should be as lightweight as possible. A page shouldn't initially weigh
  more than 2mb. Heavy content such as images or embeds should be lazy-loaded
  when possible, otherwise, only loaded on interaction or through a link.
  Pages should load under 200-300ms on a fast internet and under 2s on much
  slower internet connections. All in all, that means that:
- Javascript should only be ever used for progressive enhancements or if
  there's no alternative. The website should work with Javascript disabled or
  not loaded yet.
- In cases where that isn't possible, an alternative experience albeit
  not as complete should be provided

#### Accessibility

- The website should be as accessible as possible, while I unfortunately
  probably cannot fulfill every needs, low-hanging fruits such as accessible colors,
  alt texts on images, proper usage of headings are all fairly doable
  and should be done
