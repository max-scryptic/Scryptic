---
name: blog
description: Get a draft blog post (Markdown plus any images it links) ready to publish on the Scryptic blog, matching the blog's voice, removing overlap with existing posts, adding internal links and checking images.
argument-hint: <path to draft .md> [image files...]
disable-model-invocation: true
---

My site: [YOUR SITE URL]
Claims never to make (delete this line if none): [CLAIM 1; CLAIM 2]

The draft to work on: $ARGUMENTS

# Get this draft blog post ready to publish

I've attached a draft blog post for my site (a Markdown file plus any image files it links by file name). An SEO tool wrote the draft in one pass. Make it ready to publish: read the site, then edit the post so it sounds like the rest of the blog, says something the blog hasn't said already and points readers to the site's own tools and pages. Work through every step without asking me, then report back as described at the end.

## What's attached

- The post as Markdown. The front matter holds the title, the meta description, the search it targets (`primary_keyword`) and related searches (`keywords`). After it come the title as the H1 and the body.
- Any images the post links by file name.

## What the draft didn't know

It was written from a short product brief (features, pricing, voice, the main call to action) and a list of keywords, with the titles and headings of a few recent posts so it wouldn't copy them. It never saw the site itself: not its tools, its other pages or the full text of its posts. So it couldn't know how the blog sounds, what the other posts already cover or which of the site's tools a reader could use. Filling that in is the job.

## 1. Read the site first

Read my site, starting with its sitemap (`/sitemap.xml`) and blog index. Find:

- The published posts. Read the five most recent in full, and every post on a topic close to the post's `primary_keyword`.
- Everything a reader of this post could use: free tools, calculators, templates, checkers, product features and their pages, guides, glossaries.

The one reason to stop: if a published post already targets the same `primary_keyword` or answers the same question, tell me which before changing anything. Two posts for the same search compete with each other.

## 2. Match the blog

The published posts set the style, not the draft: the same person (we, you or I), tense, spelling (British or American), tone and sentence length, heading case, and habits with bold, lists, tables and quotes. Where the draft describes the product differently from the site, the site is right.

## 3. Make it its own post

Templated posts are what search engines treat as low-effort AI content. Compare the draft with the posts you read:

- Cut or rewrite any section, example or point another post already makes. Where another post covers it in depth, keep a sentence and link there.
- Don't reuse another post's title pattern, opening, heading wording, order of sections or ending.
- Within the post: no section that restates an earlier one, no run of sections built the same way (heading, two paragraphs, a list), no closing summary of what was just said, and no question in a questions section that the body already answers.
- Keep the draft's overall format (list, guide, comparison and so on). Rewrite inside that structure rather than turning it into the blog's usual shape.

## 4. Make it sound written by a person

Rewrite whatever reads as machine-written:

- Stock phrases: "in today's fast-paced world", "let's dive in", "it's worth noting", "when it comes to", "navigate", "landscape", "seamless", "robust", "leverage", "unlock", "elevate", "game-changer", "delve", "in conclusion".
- Patterns: everything in threes, "it's not X, it's Y", a rhetorical question to open a section, a bold lead-in on every bullet, every paragraph the same length, sentences that announce what the next one will say.
- Vague claims with no example, and hedging ("can help", "may potentially").
- Em dashes: use a comma, a colon, brackets or a full stop.

Say things plainly and specifically, and swap generic examples for ones that fit this site's readers. Don't add statistics, studies, customer names, quotes or prices the site doesn't already state.

## 5. Link the rest of the site

- Where the post describes a task one of the site's tools does, or a reader would reach for one, name the tool there, say what it does in the site's own words and link it. This matters most: the draft couldn't know these exist.
- Link related posts and pages with descriptive anchor text, never "click here" or a bare address. Aim for about one internal link per 300 words (at least 3, at most 8), each page linked once.
- Keep the call to action links unless they're broken.
- Only link pages that exist, and check each address. A link that doesn't help the reader at that point is worse than none.

## 6. Check the images

If the post has images, look at each one next to its section. Keep it only if it shows that section's idea at a glance, any text in it is spelt right and it doesn't misrepresent the product; otherwise replace it. If the post is 1,500 words or more and has only one image, add a second where another section would be clearer with a picture.

If the post has no images, add one (two if it's 1,500 words or more), in the sections a picture helps most.

For a new image:

- Style: match the images on the site's other posts. If they have none, use this house style: A flat vector graphic for a business blog article: simple geometric shapes, icons and abstract forms on a plain background, crisp edges, solid fills with at most subtle gradients, a restrained palette, generous empty space, one clear focal point. Not a photograph and not photorealistic or 3D-rendered. No people, faces, hands or body parts, and no laptops, phones, monitors or other devices. Text only where the description quotes it, as a few short, large, clearly spelled words in a clean sans-serif; no other text, numbers, logos, watermarks or brand marks anywhere in the image.
- Size: 1536 by 1024 pixels, landscape.
- Making it: use an image generation tool if you have one, with the style above at the start of the prompt. Otherwise draw it as an SVG in that style. If you can do neither, leave a placeholder where it goes and put the prompt you would have used in your report.
- Placement: after the first paragraph of its section, never in a questions section.
- Alt text: one sentence under 125 characters saying what it shows, not starting "Image of".
- File name: what it shows, following the site's naming.

## 7. Keep what it ranks for

- Keep the `primary_keyword` phrase in the title, the first 100 words and one H2. Work in the other keywords only where they read naturally.
- Title under 60 characters.
- Meta description 120 to 160 characters that answers the search. Rewrite it if the opening changed.
- One H1 (the title), H2s for sections and H3s inside them.
- Never make any of the claims listed at the top of this message.

## When you're done

Give me the finished post as Markdown laid out like the file I attached (same front matter fields), with any new image files.

Then a short report:

- The main changes, in a few bullets.
- The internal links you added.
- The images: kept or replaced, and why.
- Anything you couldn't check or want me to decide.
- The address the post will live at.
