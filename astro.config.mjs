// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

const base = "/links-hackathon-2026-guide";

// 原稿は GitHub 上でもそのまま読めるように「01-prepare.md」形式で相互リンクしている。
// サイトではそれを「/links-hackathon-2026-guide/01-prepare/」に書き換える。
function rewriteMdLinks() {
  /** @param {any} node */
  const walk = (node) => {
    if (node.type === "link" && typeof node.url === "string") {
      const m = node.url.match(/^(?:\.\/)?([\w-]+)\.md(#.*)?$/);
      if (m) {
        const slug = m[1] === "index" ? "" : `${m[1]}/`;
        node.url = `${base}/${slug}${m[2] ?? ""}`;
      }
    }
    node.children?.forEach(walk);
  };
  return walk;
}

export default defineConfig({
  site: "https://hisayan.github.io",
  base,
  markdown: { remarkPlugins: [() => rewriteMdLinks()] },
  integrations: [
    starlight({
      title: "LINKS 2026 ハッカソン ガイド",
      defaultLocale: "root",
      locales: { root: { label: "日本語", lang: "ja" } },
      social: [
        { icon: "github", label: "サンプル", href: "https://github.com/hisayan/links-hackathon-2026" },
      ],
      sidebar: [
        { label: "はじめに", link: "/" },
        {
          label: "本編",
          items: [
            "01-prepare",
            "02-get-sample",
            "03-credentials",
            "04-start-claude",
            "05-run-app",
            "06-customize",
            "07-deploy",
            "08-github",
          ],
        },
        { label: "付録", items: ["appendix-a-plateau", "appendix-b-navara", "appendix-c-cloud-pc"] },
        { label: "困ったとき", items: ["troubleshooting", "prompts"] },
      ],
    }),
  ],
});
