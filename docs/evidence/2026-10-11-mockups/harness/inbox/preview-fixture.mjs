// Local synthetic visual fixture. Never connects to a mail provider or sends mail.
import http from "node:http";
const RU = process.env.FIXTURE_LANG === "ru";
const accounts = [
  { id: "cloudflare:team@example.test", provider: "cloudflare", email: "team@example.test", name: RU ? "Команда" : "Team", status: "connected" },
  { id: "gmail:support-fixture", provider: "gmail", email: "support@example.test", name: RU ? "Поддержка" : "Support", status: "connected" },
  { id: "cloudflare:ops@example.test", provider: "cloudflare", email: "ops@example.test", name: RU ? "Операции" : "Ops", status: "connected" },
];
const rows = RU ? [
  ["Дана Парк <dana@example.test>", "Черновик заметок к релизу 2.4", "Посмотри, пожалуйста, до четверга: три исправления и одна новая настройка.", 0],
  ["support-triage-agent <support-triage-agent@example.test>", "Вопрос клиента: экспорт в CSV", "Клиент спрашивает, можно ли выгружать отчёты по расписанию. Черновик ответа готов.", 1],
  ["Лео Мартин <leo@example.test>", "Четверг в 11:00 подходит", "Давай встретимся утром и пройдёмся по плану на месяц.", 0],
  ["release-notes-agent <release-notes-agent@example.test>", "acme-site: заметки к релизу готовы к проверке", "Собрал заметки из пяти слитых пул-реквестов. Нужен ваш ответ до публикации.", 0],
  ["Бухгалтерия <billing@example.test>", "Счёт за сентябрь", "Счёт во вложении. Оплатить до 15 октября.", 2],
  ["ci-bot <ci@example.test>", "acme-site: сборка упала на шаге тестов", "Ветка main, тест checkout-flow. Последний коммит: «обновить форму оплаты».", 2],
  ["Нина Ким <nina@example.test>", "Спасибо за быстрый ответ", "Всё заработало, вопрос можно закрывать.", 1],
  ["docs-sync-agent <docs-sync-agent@example.test>", "Документация acme-mobile обновлена", "Три страницы приведены в соответствие с версией 1.8.", 2],
] : [
  ["Dana Park <dana@example.test>", "Release notes draft for 2.4", "Could you look before Thursday? Three fixes and one new setting.", 0],
  ["support-triage-agent <support-triage-agent@example.test>", "Customer question: CSV export", "A customer asks whether reports can be exported on a schedule. A draft reply is ready.", 1],
  ["Leo Martin <leo@example.test>", "Thursday at 11:00 works", "Let's meet in the morning and walk through the plan for the month.", 0],
  ["release-notes-agent <release-notes-agent@example.test>", "acme-site: release notes ready for review", "Drafted from five merged pull requests. Waiting for your answer before publishing.", 0],
  ["Billing <billing@example.test>", "Invoice for September", "The invoice is attached. Due by October 15.", 2],
  ["ci-bot <ci@example.test>", "acme-site: build failed at the test step", "Branch main, test checkout-flow. Last commit: \u201cupdate the payment form\u201d.", 2],
  ["Nina Kim <nina@example.test>", "Thanks for the quick reply", "Everything works now, the question can be closed.", 1],
  ["docs-sync-agent <docs-sync-agent@example.test>", "acme-mobile docs updated", "Three pages now match version 1.8.", 2],
];
let messages = rows.map(([sender, subject, snippet, a], i) => ({
  id: JSON.stringify([accounts[a].id, "message-" + i]),
  accountId: accounts[a].id,
  provider: accounts[a].provider,
  providerMessageId: "message-" + i,
  subject,
  sender: sender.includes("<") ? sender : sender + " <sender" + i + "@example.test>",
  recipient: accounts[a].email,
  date: new Date(Date.now() - i * 3600000).toISOString(),
  read: i > 1 && i < 6,
  starred: i === 0,
  snippet,
  folder: "inbox",
  threadId: "thread-" + i,
}));
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (!url.pathname.startsWith("/api/")) {
    const proxy = http.request(
      {
        hostname: "127.0.0.1",
        port: Number(process.env.PREVIEW_TARGET_PORT || 5174),
        path: req.url,
        method: req.method,
        headers: {
          ...req.headers,
          host: "127.0.0.1:" + (process.env.PREVIEW_TARGET_PORT || 5174),
        },
      },
      (r) => {
        res.writeHead(r.statusCode, r.headers);
        r.pipe(res);
      },
    );
    proxy.on("error", () => {
      res.writeHead(502);
      res.end("Start npm run dev -- --port 5174 first");
    });
    req.pipe(proxy);
    return;
  }
  res.setHeader("Content-Type", "application/json");
  const json = (v) => res.end(JSON.stringify(v));
  // Opt-in state changes stay in this process and never call a real provider.
  if (process.env.PREVIEW_ACTIONS === "1" && req.method !== "GET") {
    const parts = url.pathname.split("/").map(decodeURIComponent);
    const gmail = parts[2] === "accounts";
    const accountId = gmail ? "gmail:" + parts[3] : "cloudflare:" + parts[4];
    const messageId = gmail ? parts[5] : parts[6];
    const action = gmail ? parts[6] : parts[7];
    const message = messages.find(m => m.accountId === accountId && m.providerMessageId === messageId);
    let raw = "";
    for await (const chunk of req) raw += chunk;
    let body;
    try { body = JSON.parse(raw); } catch { body = null; }
    if (message && body && ((gmail && ["starred", "trashed", "read", "archive"].includes(action)) || (!gmail && (!action || action === "move")))) {
      if (typeof body.starred === "boolean") message.starred = body.starred;
      if (typeof body.read === "boolean") message.read = body.read;
      if (typeof body.trashed === "boolean") message.folder = body.trashed ? "trash" : "inbox";
      if (action === "archive") message.folder = "archive";
      if (action === "move" && ["inbox", "archive", "trash"].includes(body.folderId)) message.folder = body.folderId;
      json({ ...message, labels: [...(message.starred ? ["STARRED"] : []), ...(message.folder === "inbox" ? ["INBOX"] : [])], fixture: true });
      return;
    }
  }
  if (req.method !== "GET") {
    res.statusCode = 400;
    json({
      error:
        "Synthetic preview only. No mail was sent. Connect your own server for actions.",
      fixture: true,
    });
    return;
  }
  if (url.pathname === "/api/inbox") {
    let filtered = messages.filter(
      (m) =>
        (!url.searchParams.get("account") ||
          m.accountId === url.searchParams.get("account")) &&
        (url.searchParams.get("folder") === "starred"
          ? m.starred
          : m.folder === (url.searchParams.get("folder") || "inbox")) &&
        (url.searchParams.get("unread") !== "1" || !m.read) &&
        (m.subject + " " + m.snippet + " " + m.sender)
          .toLowerCase()
          .includes((url.searchParams.get("query") || "").toLowerCase()),
    );
    json({ accounts, messages: filtered, issues: [], hasMore: false });
    return;
  }
  const id = url.pathname.split("/").at(-1);
  const m = messages.find((m) => m.providerMessageId === id);
  if (m) {
    const text = RU
      ? `Привет!\n\n${m.snippet}\n\nЕсли что-то нужно поправить, ответь на это письмо — я внесу изменения сегодня.\n\n• Что изменилось: три исправления и одна новая настройка.\n• Что нужно от тебя: короткое «да» или замечания.\n\n${m.sender.split(" <")[0]}\n\nСинтетическое демо-письмо — не настоящая почта.`
      : `Hi Sam,\n\n${m.snippet}\n\nIf anything needs a change, reply to this message and I will update it today.\n\n• What changed: three fixes and one new setting.\n• What I need from you: a short yes, or your notes.\n\n${m.sender.split(" <")[0]}\n\nSynthetic preview message — not real mail.`;
    json(
      m.provider === "gmail"
        ? {
            ...m,
            from: m.sender,
            to: m.recipient,
            text,
            ...(process.env.PREVIEW_HTML === "1" ? {
              text: "",
              html: '<p>Synthetic HTML message for privacy checks. <a href="https://example.com/phish" target="_top">A link that asks for the top window</a></p><img src="https://example.com/fabric-inbox-synthetic-image.png" alt="Synthetic external image">',
            } : {}),
            labels: ["INBOX"],
            attachments: [],
          }
        : {
            ...m,
            body: "<p>" + text.replaceAll("\n", "</p><p>") + "</p>",
            attachments: [],
          },
    );
    return;
  }
  res.writeHead(404);
  json({ error: "fixture_route_not_found" });
});
server.listen(Number(process.env.FIXTURE_PORT || 5175), "127.0.0.1", () =>
  console.log(
    "Synthetic UI fixture on port " +
      (process.env.FIXTURE_PORT || 5175) +
      " (no real mail)",
  ),
);
