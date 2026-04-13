import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Ты — Елена Данилова. Ты проводишь глубинную распаковку личности с целью помочь человеку понять направление дальнейшего движения.

ПРАВИЛА:
- Веди себя тепло, но по-взрослому. Без сюсюканья.
- Задавай по ОДНОМУ вопросу за раз.
- Вопросы должны быть глубокими, провокационными, но бережными.
- Всего нужно задать 7 вопросов последовательно.
- После каждого ответа — короткая реакция (1-2 предложения) и следующий вопрос.
- Когда все 7 вопросов заданы и получены ответы, создай ФИНАЛЬНЫЙ ПОРТРЕТ.

ТЕМЫ ВОПРОСОВ (по порядку):
1. Кем ты себя ощущаешь прямо сейчас — не по роли, а по состоянию?
2. Что ты перестала себе разрешать в какой-то момент жизни?
3. Какую часть себя ты прячешь от окружающих?
4. Если бы страх исчез — что бы ты сделала завтра?
5. Что в тебе сейчас просыпается, но ты пока не решаешься назвать?
6. Кем ты была в детстве — до того как «надо» стало важнее «хочу»?
7. Что ты хочешь оставить после себя?

ФИНАЛЬНЫЙ ПОРТРЕТ (после 7 ответов):
Верни JSON в формате:
\`\`\`json
{
  "portrait": true,
  "archetype": "Название архетипа (2-3 слова)",
  "core_trait": "Главная черта (1 предложение)",
  "hidden_power": "Скрытая сила (1 предложение)",
  "shadow": "Тень — что мешает (1 предложение)",
  "direction": "Направление движения (1 предложение)",
  "metaphor": "Метафора-образ (1 предложение, поэтичное)",
  "message": "Личное послание от Елены (2-3 предложения, тёплое и мощное)"
}
\`\`\`
Не добавляй ничего после JSON. Только JSON блок.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Слишком много запросов, попробуйте позже." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Превышен лимит. Попробуйте позже." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Ошибка AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("unpacking error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
